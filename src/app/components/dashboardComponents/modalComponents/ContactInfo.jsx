"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ChevronDown, Check, X, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactInfoSchema } from "@/utils/schemas/dashboardSchema";
import { getByHeaderAndSectionAndKey } from "@/redux/reducers/dataBank/dataBankThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ContactInfo({ editDetails, setTabs, onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(contactInfoSchema),
    defaultValues: {
      salutation: "",
      fullName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const { getGenericDropdowns } = useSelector((state) => state.dataBankSlice);

  const onSubmitForm = (data) => {
    if (typeof onSubmit === "function") {
      onSubmit(data);
      setTabs("locations");
    }
  };

  useEffect(() => {
    const params = {
      sectionName: "Salutation",
      sectionValue: "Salutation",
    };
    dispatch(getByHeaderAndSectionAndKey(params));
  }, [dispatch]);

  // Update Data
  useEffect(() => {
    if (editDetails !== null) {
      setValue("salutation", editDetails?.companyContact?.salutation);
      setValue("fullName", editDetails?.companyContact?.fullName);
      setValue("jobTitle", editDetails?.companyContact?.jobTitle);
      setValue("email", editDetails?.companyContact?.email);
      setValue("phoneNumber", editDetails?.companyContact?.contactNumber);
    }
  }, [setValue, editDetails]);

  return (
    <div className="max-h-[80vh] overflow-auto scrollbar" id="scrollbar2">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mt-[40px] flex flex-col gap-[20px]">
          {/* Salutation */}
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Salutation <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
              <Controller
                key={editDetails?.companyContact?.salutation}
                name="salutation"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Select
                      value={value || editDetails?.companyContact?.salutation}
                      onChange={onChange}
                      onValueChange={onChange}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.salutation
                            ? "border-red-500"
                            : "border-[#2F2B3D40]"
                        }`}
                      >
                        <SelectValue placeholder="Select salutation" />
                      </SelectTrigger>
                      <SelectContent>
                        {getGenericDropdowns?.length > 0 &&
                          getGenericDropdowns.map((item, idx) => (
                            <SelectItem key={idx} value={item?.value}>
                              {item?.value}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              {/* <Controller
                name="salutation"
                control={control}
                key={editDetails?.companyContact?.salutation}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${
                        errors.salutation
                          ? "border-red-500"
                          : "border-[#2F2B3D40]"
                      }`}
                    >
                      <SelectValue placeholder="Select salutation" />
                    </SelectTrigger>
                    <SelectContent>
                      {getGenericDropdowns?.length > 0 &&
                        getGenericDropdowns.map((item, idx) => (
                          <SelectItem key={idx} value={item?.value}>
                            {item?.value}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              /> */}
              {errors.salutation && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.salutation.message}
                </span>
              )}
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
              <Input
                {...register("fullName")}
                className={`border-[1px] ${
                  errors.fullName ? "border-red-500" : "border-[#2F2B3D40]"
                } rounded-[6px] w-full bg-[#FCFCFC]`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </span>
              )}
            </div>
          </div>

          {/* Job Title */}
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
              <Input
                {...register("jobTitle")}
                className={`border-[1px] ${
                  errors.jobTitle ? "border-red-500" : "border-[#2F2B3D40]"
                } rounded-[6px] w-full bg-[#FCFCFC]`}
                placeholder="Enter your job title"
              />
              {errors.jobTitle && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.jobTitle.message}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col w-full">
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
          </div>

          {/* Phone Number */}
          <div className="flex flex-row items-center gap-[70px]">
            <Label className="min-w-[220px]">
              Phone number <span className="text-red-500">*</span>
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
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 9) value = value.slice(0, 9);

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
                  maxLength={11}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
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
          <div className="flex flex-row items-center gap-5">
            <Button
              type="button"
              onClick={() => setTabs("company")}
              className="bg-[#104774]"
            >
              <ArrowLeft className="mr-2" />
              Back
            </Button>
            <Button type="submit" className="bg-[#104774]">
              Next
              <Check className="ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactInfo;
