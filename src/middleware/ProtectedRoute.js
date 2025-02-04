import { useAuth, useAuthorization } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return null; // The useAuth hook will redirect to login
  }

  return children;
}

export const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // later will protect it based on userType

  if (!user) {
    return null; // The useAuth hook will redirect to login
  }

  return children;
};
