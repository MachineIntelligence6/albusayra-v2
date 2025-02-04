"use client";

import React, { useMemo, useRef } from "react";
import { Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "@/components/shared-components/Schemas/Schema";
import CustomButton from "@/components/shared-components/CustomButton";

import { demoAsyncOperation } from "@/utils/cmmon";
import { changeUserStatus } from "@/redux/reducers/campaign/campaignThunk";
import { UserData } from "@/configs/UseApi";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { UpdateStatusMultiple } from "@/redux/reducers/dataBank/dataBankThunk";
import Loader from "@/utils/reusable-functions/Loader";

const BulkActionChangeStatus = ({ onClose, bulkRowIds }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(Schema()),
    defaultValues: {
      status: "",
      remarks: "",
    },
    mode: "onTouched",
  });

  const pathname = usePathname();
  const PopUpRef = useRef(null);
  const dispatch = useDispatch();
  const { loadingFields } = useSelector((state) => state.dataBankSlice);

  const statusOptions = [
    { label: "On Hold", value: 6 },
    { label: "Shortlist", value: 7 },
    { label: "Call Back", value: 8 },
    { label: "Not Qualified", value: 9 },
    { label: "FinalReview", value: 10 },
    { label: "Proceed", value: 11 },
    { label: "Delete", value: 3 },
    { label: "Not Qualified", value: 15 },
  ];

  // Dynamically filter statusOptions based on the current path
  const filteredStatusOptions = useMemo(() => {
    if (pathname.includes("shortlisted-applicants")) {
      return statusOptions.filter(
        (status) => status.value === 6 || status.value === 9
      );
    } else if (pathname.includes("final-review")) {
      return statusOptions.filter(
        (status) =>
          status.value === 6 || status.value === 11 || status.value === 9
      );
    } else if (pathname.includes("/admin/campaigns/campaign-users")) {
      return statusOptions.filter(
        (status) =>
          // status.value === 6 ||
          status.value === 7 ||
          // status.value === 8 ||
          status.value === 15
      );
    } else if (pathname.includes("hold")) {
      return statusOptions.filter((status) => status.value !== 6); // Remove "On Hold"
    } else if (pathname.includes("not-qualified")) {
      return statusOptions.filter((status) => status.value !== 9); // Remove "Not Qualified"
    }
    return statusOptions; // Return full list for default path
  }, [pathname]);

  const closePopUp = (e) => {
    if (PopUpRef.current === e.target) {
      onClose();
    }
  };

  console.log("res_loadingFields", loadingFields);

  const onSubmit = (values) => {
    const params = {
      id: bulkRowIds,
      updatedBy: UserData?.Id,
      status: values?.status,
    };
    dispatch(UpdateStatusMultiple(params)).then(() => {
      onClose();
      reset();
    });
  };

  const handleClick = () => {
    onClose();
  };

  return (
    <div
      ref={PopUpRef}
      onClick={closePopUp}
      className="fixed inset-0 bg-[rgba(17,17,17,0.80)] flex justify-center items-center z-50"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 bg-white p-10 rounded-[10px] min-w-[865px]"
      >
        <div className="flex gap-6 items-center">
          {filteredStatusOptions.map((option) => (
            <div className="flex gap-1" key={option.value}>
              <input
                type="radio"
                id={option.value}
                {...register("status")}
                value={option.value}
              />
              <label htmlFor={option.value} className="text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {touchedFields.status && errors.status && (
          <Typography color="error" variant="body2">
            {errors.status.message}
          </Typography>
        )}

        <div>
          <h1 className="text-[#104774] text-md font-medium">
            Add your remarks <span className=" text-[#E6483D]">*</span>
          </h1>
          <textarea
            {...register("remarks")}
            id="remarks"
            rows={5}
            className={`w-full resize-none mt-2 rounded-[6px] border ${
              errors.remarks ? "border-red-500" : "border-[rgba(47,43,61,0.25)]"
            } bg-[#FCFCFC] p-2 focus:outline-none`}
          ></textarea>
          {touchedFields.remarks && errors.remarks && (
            <Typography color="error" variant="body2">
              {errors.remarks.message}
            </Typography>
          )}
        </div>
        <div className="border-t-2 w-full border-[rgba(47,43,61,0.25)]"></div>
        <div className="flex justify-between items-center">
          <CustomButton
            variant="outlined"
            bgColor="danger"
            startIcon={<HighlightOffIcon />}
            onClick={handleClick}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="contained"
            className="LoaderColor"
            endIcon={<DoneIcon />}
            type="submit"
            disabled={!isValid || loadingFields}
          >
            {loadingFields ? (
              <>
                Saving.. <Loader size="small" />
              </>
            ) : (
              "Save"
            )}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default BulkActionChangeStatus;
