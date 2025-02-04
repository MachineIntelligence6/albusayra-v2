"use client";
import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { RegisterSchema } from "@/components/shared-components/Schemas/RegisterSchema";
import AppLogo from "@/components/shared-components/AppLogo";
import CustomButton from "@/components/shared-components/CustomButton";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Loader from "@/utils/reusable-functions/Loader";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCitiesByStatus,
  getCountriesByStatus,
  getIndustriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  getCampaignById,
  getCampaignListByStatus,
  registerEmployeeCampaign,
} from "@/redux/reducers/campaign/campaignThunk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown, Check, X, Upload, CircleX } from "lucide-react";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      license: "",
    },
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getCampaignId = searchParams.get("id");

  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [loadingCampaign, setLoadingCampaign] = useState(true);
  const { loading, editDetails, getCampaignDataById, submitSuccess } =
    useSelector((state) => state.campaignSlice);
  const {
    getIndustryByStatuses,
    getCountryByStatuses,
    getStateByStatuses,
    getCityByStatuses,
  } = useSelector((state) => state.dataBankSlice);

  // const getCampaignId = useMemo(() => searchParams.get("id"), [searchParams]);
  useEffect(() => {
    // console.log("getCampaignId:", getCampaignId); // Log to see changes
    if (getCampaignId) {
      dispatch(getCampaignById(getCampaignId));
    }
  }, [dispatch, getCampaignId]);

  const onCountryChange = (countryId) => {
    dispatch(getStatesByStatus({ statuses: 1, parentId: countryId }));
    setIsStateDisabled(false);
    setIsCityDisabled(true);
  };

  const onStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
    setIsCityDisabled(false);
  };

  useEffect(() => {
    dispatch(getIndustriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
    dispatch(getCountriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (getCampaignDataById && Object.keys(getCampaignDataById).length > 0) {
      const { startDateTime, endDateTime } = getCampaignDataById;
      const todaysDate = new Date();

      if (new Date(startDateTime) > todaysDate) {
        toast.error("Campaign has not started yet.");
        router.push("/admin/campaigns");
      } else if (new Date(endDateTime) < todaysDate) {
        toast.error("Campaign has already ended.");
        router.push("/admin/campaigns");
      } else {
        toast.success("Please Register Your Campaign.");
      }

      setLoadingCampaign(false);
    }
  }, [getCampaignDataById, router]);

  const onSubmit = (data) => {
    const params = {
      campaignId: getCampaignId,
      fullName: data?.fullName,
      email: data?.email,
      contactNumber: data?.phone,
      residentCountryId: data?.country,
      residentStateId: data?.state,
      residentCityId: data?.city,
      isValidDrivingLicense: data?.license === "yes" ? true : false,
      status: 5,
    };
    dispatch(registerEmployeeCampaign(params));
  };

  useEffect(() => {
    if (submitSuccess) {
      reset();
      dispatch(updateSuccess());
    }
  }, [submitSuccess]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        height: "100%",
        px: 4,
      }}
    >
      <Box>
        <AppLogo />
      </Box>
      <Box>
        <Typography
          sx={{ color: "#3D3A4B", fontSize: "18px", fontWeight: 500 }}
        >
          Registration Form
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#3D3A4B" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {loadingCampaign ? (
          <Loader size="small" />
        ) : (
          <>
            <div className="">
              <Label className="inline-block mb-3 mt-[20px]">
                Full Name<span className="text-red-500"> *</span>
              </Label>
              <Input
                {...register("fullName")}
                className=" border-[1px] border-[#2F2B3D40] rounded-[6px] w-full"
                placeholder="Al Busayra"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <div className="">
              <Label className="inline-block mb-3 mt-[20px]">
                Email Address<span className="text-red-500"> *</span>
              </Label>
              <Input
                {...register("email")}
                type="email"
                className={`border-[1px] ${
                  errors.email ? "border-red-500" : "border-[#2F2B3D40]"
                } rounded-[6px] w-full bg-[#FCFCFC]`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="">
              <Label className="inline-block mb-3 mt-[20px]">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col w-full">
                <div
                  className={`border-[1px] flex flex-row items-center rounded-[6px] w-full ${
                    errors.phone ? "border-red-500" : "border-[#2F2B3D40]"
                  }`}
                >
                  <div className="flex flex-row items-center gap-2 px-2 text-sm text-gray-500">
                    +971
                  </div>
                  <div className="h-full w-[1px] bg-[#2F2B3D40]"></div>
                  <Input
                    {...register("phone", {
                      onChange: (e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 9) value = value.slice(0, 9); // Limit to 9 digits

                        if (value.length >= 2) {
                          value = value.slice(0, 2) + " " + value.slice(2);
                        }
                        if (value.length >= 6) {
                          value = value.slice(0, 6) + " " + value.slice(6);
                        }
                        e.target.value = value;
                        return e;
                      },
                    })}
                    type="tel"
                    className="w-full border-none focus:outline-none"
                    placeholder="XX XXX XXXX"
                    maxLength={11} // 2 + 1 + 3 + 1 + 4 = 11 characters including spaces
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <Label className="inline-block mb-3 mt-[20px]">
                Resident Country <span className="text-red-500">*</span>
              </Label>
              <div className="w-full">
                <Controller
                  key={editDetails?.countryId}
                  name="country"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      onValueChange={(value) => {
                        onChange(value || editDetails?.countryId);
                        onCountryChange(value || editDetails?.countryId);
                      }}
                      value={value || ""}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.country
                            ? "border-red-500"
                            : "border-[#2F2B3D40]"
                        }`}
                      >
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCountryByStatuses.map((item, idx) => (
                          <SelectItem key={idx} value={item.id}>
                            {item.countryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <Label className="inline-block mb-3 mt-[20px]">
                Resident State/Province <span className="text-red-500">*</span>
              </Label>
              <div className="w-full">
                <Controller
                  key={editDetails?.stateId}
                  name="state"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      onValueChange={(value) => {
                        onStateChange(value || editDetails?.stateId);
                        onChange(value || editDetails?.stateId);
                      }}
                      value={value || ""}
                      onChange={onChange}
                      disabled={isStateDisabled}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.state ? "border-red-500" : "border-[#2F2B3D40]"
                        }`}
                      >
                        <SelectValue placeholder="Select State/Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {getStateByStatuses.map((item, idx) => (
                          <SelectItem key={idx} value={item.id}>
                            {item.stateName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <Label className="inline-block mb-3 mt-[20px]">
                Resident City <span className="text-red-500">*</span>
              </Label>
              <div className="w-full">
                <Controller
                  key={editDetails?.cityId}
                  name="city"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      onValueChange={onChange}
                      value={value || editDetails?.cityId}
                      onChange={onChange}
                      disabled={isCityDisabled}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.city ? "border-red-500" : "border-[#2F2B3D40]"
                        }`}
                      >
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCityByStatuses.map((item, idx) => (
                          <SelectItem key={idx} value={item.id.toString()}>
                            {item.cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Label className="inline-block mb-3 mt-[20px]">
                Do you have a valid driving License? *{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="w-full">
                <Controller
                  name="license"
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Select
                        value={value || ""}
                        onChange={onChange}
                        onValueChange={onChange}
                      >
                        <SelectTrigger
                          className={`w-full ${
                            errors.license
                              ? "border-red-500"
                              : "border-[#2F2B3D40]"
                          }`}
                        >
                          <SelectValue placeholder="Select license" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
                {errors.license && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.license.message}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        <Box sx={{ borderTop: "1px solid rgba(47, 43, 61, 0.25)" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Link href="/admin/campaigns">
              <CustomButton
                variant="outlined"
                bgColor="danger"
                startIcon={<CircleX size={16} />}
              >
                Cancel
              </CustomButton>
            </Link>
            {/* <Link href={"/admin/campaigns/campaign-users"}> */}
            <CustomButton
              variant="contained"
              type="submit"
              endIcon={<Check size={16} />}
              disabled={loading} // Disable button during loading
            >
              {loading ? (
                <>
                  Save <Loader size="small" />
                </>
              ) : (
                "Save"
              )}
            </CustomButton>
            {/* </Link> */}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Page;
