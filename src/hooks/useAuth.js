"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const loggedInUser =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/login");
    }
  }, [loggedInUser, router]);

  return { user: loggedInUser };
}

// export function useAuth() {
//   const router = useRouter();
//   const loggedInUser =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     if (!loggedInUser) {
//       console.log("object", loggedInUser);
//       router.push("/login");
//     } else {
//       console.log("object", loggedInUser);
//       if (typeof window !== "undefined" && window.history.length > 1) {
//         history.back();
//       } else {
//         router.push("/companies");
//       }
//     }
//   }, [loggedInUser, router]);

//   return { user: loggedInUser };
// }

export function useAuthorization() {
  const router = useRouter();
  const loggedInUser =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // This user role will come from token
  const loggedInUserRole =
    typeof window !== "undefined" ? localStorage.getItem("userType") : "";

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/login");
    }
    if (loggedInUserRole !== "Super Admin") {
      router.push("/login");
    }
  }, [loggedInUserRole, loggedInUser, router]);

  return { user: loggedInUser, userRole: loggedInUserRole };
}
