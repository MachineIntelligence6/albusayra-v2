"use client";
import Link from "next/link";
import HeadingWrapper from "./HeadingWrapper";
import CustomButton from "@/components/shared-components/CustomButton";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "@/redux/reducers/auth/loginThunk";
import CustomInput from "../shared-components/CustomInput";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { updateSuccess } from "@/redux/reducers/auth/loginSlice";
import authConfigs from "@/configs/authConfigs";

function ChangePassword() {
  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch, // Watch form values for dynamic validation
  } = useForm({
    defaultValues,
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, resetSuccess } = useSelector((state) => state.authReducer);

  const [ID, setID] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get(authConfigs?.userToken);

  // console.log("token", token);

  // Extract and decode the token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode once
        setDecodedToken(decoded);
        setID(decoded?.UserId);
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }
  }, [token]);

  // Get the form values for dynamic validation
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isPasswordValid = confirmPassword !== "" && password !== "";

  // Handle form submission
  const onSubmit = (data) => {
    if (!ID) {
      return;
    }
    const formData = new FormData();
    formData.append("Id", ID);
    formData.append("CurrentPassword", data?.password);
    formData.append("NewPassword", data?.confirmPassword);
    dispatch(setNewPassword(formData));
  };

  const UserData = decodedToken ? JSON.parse(decodedToken?.JsonString) : "";
  const userType = UserData?.UserType?.UserType;

  useEffect(() => {
    if (resetSuccess) {
      if (userType) {
        const targetRoute =
          userType === 1 ? "/admin/companies" : "/admin/campaigns";
        router.push(targetRoute);

        localStorage.setItem(authConfigs?.userToken, token);
        localStorage.setItem(
          authConfigs?.userData,
          JSON.stringify(decodedToken)
        );

        // Check if localStorage is available
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("userType", userType);
        }
      }
      dispatch(updateSuccess());
    }
  }, [resetSuccess, token, decodedToken, router, dispatch, userType]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-[350px] flex flex-col">
        <Box sx={{ my: 1 }}>
          <HeadingWrapper
            heading="Change Password"
            subHeading="Enter your email and we will send you instructions to reset your password"
          />
        </Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
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
          <FormControl fullWidth>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                // validate: (value) =>
                //   value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <CustomInput
                  labelText="Confirm Password"
                  placeholder="********"
                  type="password"
                  register={register}
                  name="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...field}
                />
              )}
            />
          </FormControl>
          <Box component="div" mt={2} width="100%">
            <CustomButton
              fullWidth
              type="submit"
              disabled={!isPasswordValid || loading} // Disable if passwords don't match
            >
              {loading ? "Changing..." : "Change Password"}
            </CustomButton>
          </Box>
        </form>

        <div className="text-[#20A4D5] text-[13px] leading-[22px] w-full text-start mt-[10px]">
          <Link href="/forgot-password">Back to Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
