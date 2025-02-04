"use client";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import OTPInput from "./OTPInput";
import CustomButton from "@/components/shared-components/CustomButton";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtpAgainRequest,
  verifyOtp,
} from "@/redux/reducers/auth/loginThunk";
import authConfigs from "@/configs/authConfigs";

const OTp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState(true);

  const { loading, otpSuccess, user, token } = useSelector(
    (state) => state.authReducer
  );

  const handleContinue = () => {
    const otpString = otp.join("");
    const params = {
      code: otpString,
      identityName: user?.email,
      type: "OTP",
      status: 1,
    };
    dispatch(verifyOtp(params));
  };

  useEffect(() => {
    if (otpSuccess) {
      if (token) {
        localStorage.setItem(authConfigs?.userToken, token);
        localStorage.setItem(authConfigs?.userData, JSON.stringify(user));
      }

      const userType =
        typeof localStorage !== "undefined" && localStorage.getItem("userType");
      if (userType) {
        const targetRoute =
          userType === "1" ? "/admin/companies" : "/admin/campaigns";
        if (typeof window !== "undefined") {
          window.location.href = targetRoute;
          // router.push(targetRoute);
        }
      }
    }
  }, [otpSuccess, user, token, router, dispatch]);

  // Resend OTP
  const sendOtpAgain = () => {
    if (!isDisabled) {
      const OtpParams = {
        email: user?.email,
      };
      dispatch(sendOtpAgainRequest(OtpParams));
      setIsDisabled(true);

      setTimeout(() => {
        setIsDisabled(false);
      }, 300000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 300000); // 5 minutes (300,000 milliseconds)

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center max-w-[366px] w-full">
        <img src="/logo.png" alt="Logo" />
        <img src="/group.png" alt="Group" className="mt-[15px]" />

        <div>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "25px",
              lineHeight: "38px",
              color: "#2F2B3D",
              mt: 5,
            }}
          >
            Just one more step
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#2F2B3DB2",
              textAlign: "center",
            }}
          >
            We’ve sent a code to your email <strong>{user?.email}</strong>
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "22px",
              color: "#2F2B3DB2",
              textAlign: "center",
            }}
          >
            Please check your inbox and insert the code below to sign in.
          </Typography>
        </div>

        <OTPInput otp={otp} setOtp={setOtp} />
        <Box component="div" mt={2} width="100%">
          <CustomButton
            fullWidth
            type="submit"
            sx={{ display: "flex", gap: 1 }}
            onClick={handleContinue}
          >
            {loading ? "Verifying..." : "Continue"}{" "}
            <FaArrowRight className="text-white" />
          </CustomButton>
        </Box>
      </div>

      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 1.5,
        }}
      >
        <Typography sx={{ fontSize: 12, color: "#0F132499" }}>
          Didn’t receive the email?
        </Typography>

        <Link href="#" onClick={isDisabled ? undefined : sendOtpAgain}>
          <Typography
            sx={{
              fontSize: 12,
              color: isDisabled ? "#B0BEC5" : "#06A1D1",
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            Send again
          </Typography>
        </Link>
      </Box>
    </div>
  );
};

export default OTp;
