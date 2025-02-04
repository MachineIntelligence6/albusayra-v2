"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomInput from "../shared-components/CustomInput";
import HeadingWrapper from "./HeadingWrapper";
import { Box, Checkbox, Typography } from "@mui/material";
import CustomButton from "@/components/shared-components/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import OTp from "./otp-component";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/reducers/auth/loginThunk";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/navigation";
import authConfigs from "@/configs/authConfigs";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch, // Watch form values for dynamic validation
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const { loading, loginSuccess } = useSelector((state) => state.authReducer);

  // Handle form submission
  const onSubmit = (data) => {
    const params = {
      email: data?.email,
      password: data?.password,
    };

    dispatch(loginUser(params));
  };

  // Disable login button if the form is not valid
  const isFormValid =
    watch("email")?.trim() !== "" && watch("password")?.trim() !== "";

  // Get the token from localStorage
  // const token =
  //   typeof localStorage !== "undefined" &&
  //   localStorage.getItem(authConfigs?.userToken);

  // useEffect(() => {
  //   if (token) {
  //     const hasRedirected = localStorage.getItem("hasRedirected");
  //     if (!hasRedirected) {
  //       typeof localStorage !== "undefined" &&
  //         localStorage.setItem("hasRedirected", "true");
  //       if (typeof window !== "undefined" && window.history.length > 1) {
  //         history.back(); // Go to the previous page
  //       } else {
  //         router.push("/admin/campaigns"); // Default to companies page
  //       }
  //     }
  //   }
  // }, [token, router]);

  return (
    <>
      {!loginSuccess ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center max-w-[366px] w-full">
            <HeadingWrapper
              heading="Welcome to AL-BUSAYRA!"
              subHeading="Please sign-in to your account and start your journey"
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full"
            >
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <CustomInput
                      labelText="Email"
                      placeholder="Enter your email address"
                      register={register}
                      name="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <CustomInput
                      labelText="Password"
                      placeholder="********"
                      type="password"
                      register={register}
                      name="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>

              <div className="flex flex-row items-center w-full justify-between mt-[10px]">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <Checkbox
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      id="remember-me"
                      size="small"
                      style={{ paddingLeft: "0" }}
                    />
                    <Typography
                      component="label"
                      sx={{ fontSize: 14 }}
                      htmlFor="remember-me"
                    >
                      Remember Me
                    </Typography>
                  </div>

                  <Typography
                    variant="body1"
                    sx={{ fontSize: 12, color: "#20A4D5" }}
                  >
                    <Link href="/forgot-password"> Forgot Password ?</Link>
                  </Typography>
                </div>
              </div>

              <Box component="div" mt={2} width="100%">
                <CustomButton
                  fullWidth
                  type="submit"
                  disabled={!isFormValid || loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </CustomButton>
              </Box>
            </form>
          </div>
        </div>
      ) : (
        <OTp />
      )}
    </>
  );
};

export default Login;
