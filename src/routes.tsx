import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ProtectedRoute from "@/components/shared/protected-route"
import PermissionRoute from "@/components/shared/permission-route"
import AppLayout from "@/components/shared/app-layout"
import RouteError from "@/components/shared/route-error"
import Dashboard from "@/pages/dashboard"
import Bookings from "@/pages/bookings"
import Booking from "@/pages/booking"
import NewBooking from "@/pages/new-booking"
import EditBooking from "@/pages/edit-booking"
import Checkin from "@/pages/checkin"
import Cabins from "@/pages/cabins"
import Cabin from "@/pages/cabin"
import NewCabin from "@/pages/new-cabin"
import EditCabin from "@/pages/edit-cabin"
import Guests from "@/pages/guests"
import Users from "@/pages/users"
import Settings from "@/pages/settings"
import Account from "@/pages/account"
import Login from "@/pages/login"
import PageNotFound from "@/pages/page-not-found"

const router = createBrowserRouter([
  {
    Component: ProtectedRoute,
    errorElement: <RouteError />,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            errorElement: <RouteError />,
            children: [
              {
                index: true,
                element: <Navigate replace to="/dashboard" />
              },
              {
                path: "/dashboard",
                Component: Dashboard
              },
              {
                path: "/bookings",
                Component: Bookings
              },
              {
                path: "/bookings/new",
                Component: NewBooking
              },
              {
                path: "/bookings/:bookingId",
                Component: Booking
              },
              {
                path: "/bookings/:bookingId/edit",
                Component: EditBooking
              },
              {
                path: "/checkin/:bookingId",
                Component: Checkin
              },
              {
                path: "/cabins",
                Component: Cabins
              },
              {
                path: "/cabins/:cabinId",
                Component: Cabin
              },
              {
                element: <PermissionRoute permission="cabins.manage" />,
                children: [
                  {
                    path: "/cabins/new",
                    Component: NewCabin
                  },
                  {
                    path: "/cabins/:cabinId/edit",
                    Component: EditCabin
                  }
                ]
              },
              {
                path: "/guests",
                Component: Guests
              },
              {
                element: <PermissionRoute permission="staff.view" />,
                children: [
                  {
                    path: "/users",
                    Component: Users
                  }
                ]
              },
              {
                path: "/settings",
                Component: Settings
              },
              {
                path: "/account",
                Component: Account
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    Component: Login,
    errorElement: <RouteError />
  },
  {
    path: "*",
    Component: PageNotFound
  }
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
