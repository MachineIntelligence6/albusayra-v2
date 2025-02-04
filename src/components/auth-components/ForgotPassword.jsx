"use client";
import Link from "next/link";
import HeadingWrapper from "./HeadingWrapper";
import CustomInput from "../shared-components/CustomInput";
import CustomButton from "@/components/shared-components/CustomButton";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormControl, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/redux/reducers/auth/loginThunk";
import { updateSuccess } from "@/redux/reducers/auth/loginSlice";
import { useEffect } from "react";

function ForgotPassword() {
  const defaultValues = {
    email: "",
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

  // Handle form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Email", data?.email);
    dispatch(forgotPassword(formData));
  };

  // Disable login button if the form is not valid
  const isFormValid = watch("email")?.trim() !== "";

  useEffect(() => {
    if (resetSuccess) {
      router.push("/login");
      dispatch(updateSuccess());
    }
  }, [resetSuccess, router, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-full  ">
      <div className="max-w-[350px] flex flex-col ">
        <Box sx={{ my: 1 }}>
          <HeadingWrapper
            heading="Forgot Password"
            subHeading="Enter your email and we will send you instructions to reset your password"
          />
        </Box>
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

        <div className="text-[#20A4D5] text-[13px] leading-[22px] w-full text-start mt-[10px]">
          <Link href="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
