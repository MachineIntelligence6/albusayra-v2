"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const AdminDashboard = () => {
  useEffect(() => {
    redirect("/login");
  }, []);
  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;
