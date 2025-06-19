import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; //shadcn sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetPage from "./pages/PasswordResetPage"; // Updated path if token is used
import UserDashboardPage from "./pages/UserDashboardPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Mock authentication check (replace with actual auth logic)
const isAuthenticated = () => {
  // For this example, we'll assume the user is not authenticated by default.
  // In a real app, check for a token in localStorage, context, etc.
  // For testing dashboard directly, you can temporarily set this to true.
  // Example: return localStorage.getItem('authToken') !== null;
  return false; 
};

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // For this example, we'll just redirect to /login without state.
    return <Navigate to="/login" replace />;
  }
  return element;
};


const App = () => {
  console.log('App.tsx loaded');
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* The :token part is optional, if your reset flow uses URL tokens */}
          <Route path="/reset-password/:token" element={<PasswordResetPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} /> 

          {/* User Dashboard (Protected or Public based on your app's needs) */}
          {/* For this example, making it directly accessible, 
              but typically you'd wrap it in a ProtectedRoute */}
          <Route path="/dashboard/*" element={<UserDashboardPage />} />
          {/* Example of a protected route setup (uncomment and adapt `isAuthenticated`)
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            } 
          />
          */}
          
          {/* Default route: Redirect to login or dashboard based on auth state */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
          />

          {/* Catch-all Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;