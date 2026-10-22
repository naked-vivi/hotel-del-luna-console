import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export const cabinSchema = z
  .object({
    name: z.string().trim().min(1, "Cabin name is required"),
    maxCapacity: z.coerce.number().int("Capacity must be a whole number").min(1, "Capacity must be at least 1 guest"),
    regularPrice: z.coerce.number().min(1, "Regular price must be at least 1"),
    discount: z.coerce.number().min(0, "Discount cannot be negative"),
    description: z.string().trim().min(1, "Description is required"),
    image: z.any().refine(
      (value) => (typeof value === "string" && value.length > 0) || (value instanceof File && value.type.startsWith("image/")),
      "Choose an image for this cabin",
    ),
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
  })
  .refine((values) => values.maxBookingLength >= values.minBookingLength, {
    message: "Maximum stay must be at least as long as the minimum stay",
    path: ["maxBookingLength"],
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
