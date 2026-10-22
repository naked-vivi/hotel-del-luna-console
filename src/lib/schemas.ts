import { z } from "zod";
import { BOOKING_WINDOW_LIMITS, CABIN_PHOTO_LIMIT, EMAIL_PATTERN, PASSWORD_MIN_LENGTH, TIME_PATTERN } from "@/lib/constants";
import { nightsBetween, overlapsBooked } from "@/lib/helpers";

const cabinPhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
  file: z.instanceof(File).optional(),
});

export const cabinSchema = z
  .object({
    name: z.string().trim().min(1, "Cabin name is required").max(40, "Use 40 characters or fewer"),
    maxCapacity: z.coerce.number({ invalid_type_error: "Enter how many guests it sleeps" }).int("Capacity must be a whole number").min(1, "Capacity must be at least 1 guest"),
    regularPrice: z.coerce.number({ invalid_type_error: "Enter the nightly rate" }).min(1, "Regular price must be at least 1"),
    discount: z.coerce.number({ invalid_type_error: "Enter 0 for no discount" }).min(0, "Discount cannot be negative"),
    bedType: z.string().min(1, "Choose a bed type"),
    size: z.coerce.number({ invalid_type_error: "Enter the size in square metres" }).int("Use a whole number").min(10, "Rooms start at 10 m²").max(1000, "That seems too large"),
    amenities: z.array(z.string()),
    photos: z.array(cabinPhotoSchema).min(1, "Add at least one photo").max(CABIN_PHOTO_LIMIT, `Use ${CABIN_PHOTO_LIMIT} photos or fewer`),
    description: z.string().trim().min(1, "Description is required"),
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "Discount should be less than or equal to regular price",
    path: ["discount"],
  });

export const settingsSchema = z
  .object({
    minBookingLength: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of nights").min(1, "Minimum stay must be at least 1 night"),
    maxBookingLength: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of nights").min(1, "Maximum stay must be at least 1 night"),
    maxGuestsPerBooking: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of guests").min(1, "Allow at least 1 guest"),
    breakfastPrice: z.coerce.number({ invalid_type_error: "Enter a breakfast price, such as 10 or 0 for free" }).finite().min(0, "Breakfast price cannot be negative"),
    checkInTime: z.string().regex(TIME_PATTERN, "Choose a check-in time"),
    checkOutTime: z.string().regex(TIME_PATTERN, "Choose a check-out time"),
    acceptOnlineBookings: z.boolean(),
    bookingWindowDays: z.coerce
      .number({ invalid_type_error: "Enter a number of days" })
      .int("Enter a whole number of days")
      .min(BOOKING_WINDOW_LIMITS.min, `Open bookings at least ${BOOKING_WINDOW_LIMITS.min} days ahead`)
      .max(BOOKING_WINDOW_LIMITS.max, `Use ${BOOKING_WINDOW_LIMITS.max} days or fewer`),
  })
  .refine((values) => values.maxBookingLength >= values.minBookingLength, {
    message: "Maximum stay must be at least as long as the minimum stay",
    path: ["maxBookingLength"],
  })
  .refine((values) => values.checkOutTime < values.checkInTime, {
    message: "Check-in has to be later than check-out, so rooms can be made up",
    path: ["checkInTime"],
  });

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
    password: z.string().min(PASSWORD_MIN_LENGTH, `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`),
    passwordConfirm: z.string().min(1, "Please repeat the password"),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export function createBookingSchema({ minNights, maxNights, maxGuests, booked }: BookingRules) {
  return z
    .object({
      guestMode: z.enum(["existing", "new"]),
      guestId: z.coerce.number().optional(),
      guestName: z.string().trim().max(120, "Use 120 characters or fewer").optional(),
      guestEmail: z.string().trim().optional(),
      guestCountry: z.string().optional(),
      guestNationalId: z.string().trim().max(40, "Use 40 characters or fewer").optional(),
      cabinId: z.coerce.number({ invalid_type_error: "Choose a cabin" }).int().positive("Choose a cabin"),
      startDate: z.string().min(1, "Choose an arrival date"),
      endDate: z.string().min(1, "Choose a departure date"),
      numGuests: z.coerce.number({ invalid_type_error: "Enter the number of guests" }).int("Use a whole number").min(1, "At least 1 guest"),
      hasBreakfast: z.boolean(),
      isPaid: z.boolean(),
      observations: z.string().trim().max(500, "Use 500 characters or fewer").optional(),
    })
    .superRefine((values, ctx) => {
      if (values.guestMode === "existing" && !values.guestId) {
        ctx.addIssue({ code: "custom", path: ["guestId"], message: "Choose a guest" });
      }
      if (values.guestMode === "new") {
        if (!values.guestName) ctx.addIssue({ code: "custom", path: ["guestName"], message: "Enter the guest's full name" });
        if (!values.guestEmail || !EMAIL_PATTERN.test(values.guestEmail)) ctx.addIssue({ code: "custom", path: ["guestEmail"], message: "Enter a valid email, such as name@example.com" });
        if (!values.guestCountry) ctx.addIssue({ code: "custom", path: ["guestCountry"], message: "Choose a country" });
      }

      if (!values.startDate || !values.endDate) return;
      const nights = nightsBetween(values.startDate, values.endDate);
      if (nights < 1) ctx.addIssue({ code: "custom", path: ["endDate"], message: "Departure must be after arrival" });
      else if (nights < minNights || nights > maxNights) ctx.addIssue({ code: "custom", path: ["endDate"], message: `Stays must be between ${minNights} and ${maxNights} nights` });

      if (values.numGuests > maxGuests) ctx.addIssue({ code: "custom", path: ["numGuests"], message: `This cabin sleeps up to ${maxGuests}` });

      if (nights >= 1 && overlapsBooked(booked, values.startDate, values.endDate)) {
        ctx.addIssue({ code: "custom", path: ["startDate"], message: "Some of these nights are already booked" });
      }
    });
}
