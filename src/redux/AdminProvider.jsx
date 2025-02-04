"use client";
import { Provider } from "react-redux";
import store from "./store";
import { AdminProtectedRoute } from "@/middleware/ProtectedRoute";

import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const handleSessionExpiry = (token, router) => {
  if (!token) return;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  const timeLeft = decodedToken.exp - currentTime;

  if (timeLeft > 0) {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error("Please login again, Your session has expired!");
      <Toaster position="top-right" />;
      router.push("/login");
    }, timeLeft * 1000); // Time left in milliseconds
  } else {
    // Token already expired
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.error("Please login again, Your session has expired!");
    <Toaster position="top-right" />;
    router.push("/login");
  }
};

const AdminProviders = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" && localStorage.getItem("token");
    if (token) {
      handleSessionExpiry(token, router);
    }
  }, [router]);

  return (
    <Provider store={store}>
      <AdminProtectedRoute>{children}</AdminProtectedRoute>
    </Provider>
  );
};

export default AdminProviders;
