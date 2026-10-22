import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Dashboard from "./pages/dashboard"
import Bookings from "./pages/bookings"
import Booking from "./pages/booking"
import Cabins from "./pages/cabins"
import Users from "./pages/users"
import Settings from "./pages/settings"
import Account from "./pages/account"
import Login from "./pages/login"
import PageNotFound from "./pages/page-not-found"
import AppLayout from "./shared/app-layout"
import { Toaster } from "./components/ui/toast"
import Checkin from "./pages/checkin"
import ProtectedRoute from "./shared/protected-route"
import { ThemeProvider } from "./shared/theme-provider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>

            <Route element={<ProtectedRoute> <AppLayout /> </ProtectedRoute>}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<Booking />} />
              <Route path="/checkin/:bookingId" element={<Checkin />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App