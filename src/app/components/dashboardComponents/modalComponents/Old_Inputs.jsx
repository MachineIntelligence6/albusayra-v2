"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { ChevronDown, Check, X, Box, UploadIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Upload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import { createCompany } from "@/redux/reducers/companies/companyThunk";
import Image from "next/image";

const defaultValues = {
  email: "",
  password: "",
  abbreviation: "",
  companyName: "",
  industry: "",
  website: "",
  phone: "",
  address: "",
  country: "",
  state: "",
  city: "",
};

// Define the Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  abbreviation: Yup.string().required("Company abbreviation is required"),
  companyName: Yup.string().required("Company name is required"),
  industry: Yup.string().required("Industry is required"),
  website: Yup.string().url("Invalid URL").optional(),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Business address is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State/Province is required"),
  city: Yup.string().required("City is required"),
});

function CompanyInfo({ setTabs, closeModal }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.companySlice);

  const onSubmit = (data) => {
    console.log(data);
    setTabs("contact");
    const raw = { ...data };
    const formData = new FormData();
    if (uploadedImage) {
      formData.append("Image", uploadedImage);
    }

    dispatch(createCompany({ raw, formData }));
  };

  useEffect(() => {
    if (success) {
      setTabs("contact");
      dispatch(updateSuccess());
    }
  }, [success, setTabs, dispatch]);

  return (
    <div className="max-h-[80vh] overflow-auto scrollbar " id="scrollbar2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start justify-start gap-5">
          <div className="bg-[#E9EAEC] cursor-pointer w-[100px] h-[100px] border-[#C9C8CC] border-[1px] flex flex-row items-center justify-center rounded-[10px]">
            <Image
              src="/camera.png"
              width={35}
              height={35}
              className="w-[35px] h-[35px]"
              alt=""
            />
          </div>
          <Button className="bg-[#104774] hover:bg-[#4080b4] text-white flex flex-row items-center gap-2">
            Upload Logo <Upload />{" "}
          </Button>
        </div>

        <div className="mt-[40px] flex flex-col gap-[20px]">
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Company abbreviation <span className="text-red-500"> *</span>
            </Label>
            <div>
              <Input
                className="border-[1px] border-[#2F2B3D40] rounded-[6px] max-w-[75px]"
                placeholder="Ab"
                {...register("abbreviation")}
              />
              {errors.abbreviation && (
                <p className="text-red-500">{errors.abbreviation.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Company Name <span className="text-red-500"> *</span>
            </Label>
            <div className="w-full">
              <Input
                className="border-[1px] border-[#2F2B3D40] rounded-[6px] w-full"
                placeholder="Al Busayra"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-red-500">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Industry <span className="text-red-500"> *</span>
            </Label>
            <div className="w-full">
              <Select {...register("industry")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500">{errors.industry.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Industry <span className="text-red-500"> *</span>
            </Label>
            <div className="w-full">
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && (
                <p className="text-red-500">{errors.industry.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Corporate Website{" "}
              <span className="text-gray-300">(Optional)</span>
            </Label>
            <div className="w-full">
              <Input
                className="border-[1px] border-[#2F2B3D40] rounded-[6px] w-full"
                placeholder="www.al-busayra.com"
                {...register("website")}
              />
              {errors.website && (
                <p className="text-red-500">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Company phone number <span className="text-red-500">*</span>
            </Label>
            <div className="w-full">
              <div className="border-[1px] flex flex-row items-center border-[#2F2B3D40] rounded-[6px] w-full">
                <div className="flex flex-row items-center gap-2 px-2">
                  +971 <ChevronDown className="text-[10px]" size={10} />
                </div>
                <div className="h-full w-[1px] bg-[#2F2B3D40]"></div>
                <Input
                  className="w-full p-2 !outline-white"
                  placeholder="123 456 7890"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Business Address <span className="text-red-500"> *</span>
            </Label>
            <div className="w-full">
              <Input
                className="border-[1px] border-[#2F2B3D40] rounded-[6px] w-full"
                placeholder="address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
          </div>
        </div>
        <Separator className="my-5 mt-10" />
        <div className="flex flex-row items-center justify-between mt-5">
          <Button
            variant="outlined"
            className="flex flex-row items-center border-[1px] border-[#FF4C51] text-[#FF4C51] "
            onClick={closeModal}
          >
            <div className="bg-[#FF4C51] p-[2px]  rounded-full">
              <X className="text-white" />
            </div>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            // onClick={() => {
            //   setTabs("contact");
            // }}
          >
            {loading ? "Next..." : "Next"}
            <Check className="text-white" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfo;
