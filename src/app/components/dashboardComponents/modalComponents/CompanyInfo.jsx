"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { ChevronDown, Check, X, Upload } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyInfoSchema } from "@/utils/schemas/dashboardSchema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesByStatus,
  getCountriesByStatus,
  getIndustriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";

const CompanyInfo = ({ editDetails, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(companyInfoSchema),
    defaultValues: {
      abbreviation: "",
      companyName: "",
      industry: "",
      website: "",
      phoneNumber: "",
      businessAddress: "",
      country: "",
      state: "",
      city: "",
    },
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Store the actual file

  // Cascade DropDpwn
  const {
    getIndustryByStatuses,
    getCountryByStatuses,
    getStateByStatuses,
    getCityByStatuses,
  } = useSelector((state) => state.dataBankSlice);

  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

  const onCountryChange = (countryId) => {
    dispatch(getStatesByStatus({ statuses: 1, parentId: countryId }));
    setIsStateDisabled(false);
    setIsCityDisabled(true); // Disable city dropdown
  };

  const onStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
    setIsCityDisabled(false);
  };

  useEffect(() => {
    dispatch(getIndustriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
    dispatch(getCountriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
  }, [dispatch]);
  // Cascade END

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setUploadedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleButtonClick = () => {
    document.getElementById("logoUploader").click();
  };

  const onSubmitForm = async (data) => {
    if (data) {
      onSubmit({ ...data, uploadedFile });
    }
  };

  // Update Data
  useEffect(() => {
    if (editDetails !== null) {
      console.log(editDetails);
      setUploadedImage(editDetails?.image);
      setValue("abbreviation", editDetails?.companyAbbreviation || "");
      setValue("companyName", editDetails?.companyName || "");
      setValue("industry", editDetails?.industryId || "");
      setValue(
        "website",
        editDetails?.website === "null" ? "" : editDetails?.website
      );
      setValue("phoneNumber", editDetails?.contactNumber || "");
      setValue("businessAddress", editDetails?.address || "");
      setValue("country", editDetails?.countryId || "");
      setValue("state", editDetails?.stateId || "");
      setValue("city", editDetails?.cityId || "");
    }
  }, [setValue, editDetails]);

  return (
    <div className="max-h-[80vh] overflow-auto scrollbar" id="scrollbar2">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col items-start justify-start gap-5">
          <div className="relative w-[100px] h-[100px] border-[#C9C8CC] border-[1px] flex items-center justify-center rounded-[10px] bg-[#E9EAEC]">
            {uploadedImage ? (
              <>
                <Image
                  src={uploadedImage}
                  alt="Uploaded logo"
                  className="w-[35px] h-[35px] w-full h-full object-cover rounded-[10px]"
                  width={35}
                  height={35}
                />
                <button
                  type="button"
                  className="absolute top-[-1px] right-[-8px] bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center Harris"
                  onClick={handleRemoveImage}
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <Image
                src="/camera.png"
                width={35}
                height={35}
                className="w-[35px] h-[35px]"
                alt=""
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="logoUploader"
            onChange={handleImageUpload}
          />
          <label htmlFor="logoUploader">
            <Button
              type="button"
              className="bg-[#104774] hover:bg-[#4080b4] text-white flex items-center gap-2"
              onClick={handleButtonClick}
            >
              {uploadedImage ? "Change Logo" : "Upload Logo"} <Upload />
            </Button>
          </label>
        </div>

        <div className="mt-[40px] flex flex-col gap-[20px]">
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Company Abbreviation <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
              <Input
                {...register("abbreviation")}
                className={`border-[1px] ${
                  errors.abbreviation ? "border-red-500" : "border-[#2F2B3D40]"
                } rounded-[6px] max-w-[75px]`}
                placeholder="Ab"
              />
              {errors.abbreviation && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.abbreviation.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Company Name <span className="text-red-500"> *</span>
            </Label>
            <div>
              <Input
                {...register("companyName")}
                className=" border-[1px] border-[#2F2B3D40] rounded-[6px] w-full"
                placeholder="Enter Company Name"
              />
              {errors.companyName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Industry <span className="text-red-500">*</span>
            </Label>
            <div className="w-full">
              <Controller
                key={editDetails?.industryId}
                name="industry"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Select
                      value={value || editDetails?.industryId}
                      onChange={onChange}
                      onValueChange={onChange}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.industry
                            ? "border-red-500"
                            : "border-[#2F2B3D40]"
                        }`}
                      >
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {getIndustryByStatuses?.length > 0 &&
                          getIndustryByStatuses.map((item, idx) => (
                            <SelectItem key={idx} value={item?.id}>
                              {item?.industryName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors.industry && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.industry.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px] ">
              Corporate Website{" "}
              <span className="text-gray-300">(Optional)</span>
            </Label>
            <div className="flex flex-col w-full">
              <Input
                {...register("website")}
                className=" border-[1px] border-[#2F2B3D40] rounded-[6px] w-full"
                placeholder="https://domain.com"
              />
              {errors.website && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.website.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Company Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
              <div
                className={`border-[1px] flex flex-row items-center rounded-[6px] w-full ${
                  errors.phoneNumber ? "border-red-500" : "border-[#2F2B3D40]"
                }`}
              >
                <div className="flex flex-row items-center gap-2 px-2 text-sm text-gray-500">
                  +971
                </div>
                <div className="h-full w-[1px] bg-[#2F2B3D40]"></div>
                <Input
                  {...register("phoneNumber", {
                    onChange: (e) => {
                      // Format the phone number as they type
                      let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                      if (value.length > 9) value = value.slice(0, 9); // Limit to 9 digits

                      // Format as XX XXX XXXX
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + " " + value.slice(2);
                      }
                      if (value.length >= 6) {
                        value = value.slice(0, 6) + " " + value.slice(6);
                      }

                      // Update the input value
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
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Business Address <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
              <Input
                {...register("businessAddress")}
                className={`border-[1px] ${
                  errors.businessAddress
                    ? "border-red-500"
                    : "border-[#2F2B3D40]"
                } rounded-[6px] w-full`}
                placeholder="Office no N12, first floor khansaheb G9, building al majaz sharjha"
              />
              {errors.businessAddress && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.businessAddress.message}
                </span>
              )}
            </div>
          </div>

          {/* <RenderSelectField
            name="country"
            label="Country"
            control={control}
            errors={errors}
          />
          <RenderSelectField
            name="state"
            label="State"
            control={control}
            errors={errors}
          />
          <RenderSelectField
            name="city"
            label="City"
            control={control}
            errors={errors}
          /> */}

          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Country <span className="text-red-500">*</span>
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
                    disabled={editDetails !== null} // Disable country if editing
                  >
                    <SelectTrigger
                      className={`w-full ${
                        errors.country ? "border-red-500" : "border-[#2F2B3D40]"
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
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              State/Province <span className="text-red-500">*</span>
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
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              City <span className="text-red-500">*</span>
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
        </div>
        <Separator className="my-5 mt-10" />
        <div className="flex flex-row items-center justify-between mt-5">
          <Button
            type="button"
            variant="outlined"
            className="flex flex-row items-center border-[1px] border-[#FF4C51] text-[#FF4C51]"
            onClick={onClose}
          >
            <div className="bg-[#FF4C51] p-[2px] rounded-full">
              <X className="text-white" />
            </div>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#104774]">
            Next
            <Check className="text-white" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInfo;
