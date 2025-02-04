"use client";
import React, { useEffect, useState } from "react";
import MasonryGrid from "@/components/shared-components/masonry-grid";
import BasicInfo from "@/components/employees/view-employee/BasicInfo";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ApplicantGetById } from "@/redux/reducers/applicants/applicantThunk";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

const ViewInCompleteEmployee = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [viewDetails, setViewDetails] = useState([]);
  const editMode = searchParams.get("id");
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(ApplicantGetById(param));
    }
  }, [editMode, dispatch]);
  const editData = useSelector(
    (state) => state?.applicantSlice?.proceedDetails
  );
  console.log("editData", editData);
  useEffect(() => {
    if (editData) {
      const transformedDetails = [
        {
          id: "001",
          title: "BASIC INFORMATION",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Full Name",
              value: editData?.fullName || "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Gender",
              value: editData?.gender?.genderName || "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Date of Birth",
              value: editData?.dob
                ? moment(editData?.dob).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "4",
              icon: <FemaleOutlinedIcon />,
              label: "Religion",
              value: editData?.religion || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Nationality",
              value: editData?.nationality || "N/A",
            },
            {
              id: "6",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Marital Status",
              value: editData?.maritalStatus || "N/A",
            },
            {
              id: "7",
              icon: <FemaleOutlinedIcon />,
              label: "Employment Type",
              value: editData?.employmentType || "N/A",
            },
            {
              id: "8",
              icon: <TwoWheelerOutlinedIcon />,
              label: "Picture",
              value: editData?.image?.split("/").pop() || "N/A",
            },
          ],
        },
        {
          id: "002",
          title: "Contact Residence",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Email Address",
              value: editData?.email || "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Contact No.",
              value: editData?.contactNumber || "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Emergency Contact Relation",
              value: editData?.emergencyRelation || "N/A",
            },
            {
              id: "4",
              icon: <FemaleOutlinedIcon />,
              label: "Emergency Contact No.",
              value: editData?.emergencyContactNumber || "N/A",
            },
            {
              id: "5",
              icon: <FemaleOutlinedIcon />,
              label: "Country",
              value: editData?.emergencyCountry?.countryName || "N/A",
            },
          ],
        },
        {
          id: "003",
          title: "Emirates ID",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Emirates ID No.",
              value: editData?.emiratesId || "N/A",
            },
            {
              id: "2",
              icon: <CalendarMonthOutlinedIcon />,
              label: "EID Issue Date",
              value: editData?.emiratesIdIssueDate
                ? moment(editData?.emiratesIdIssueDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "3",
              icon: <CalendarMonthOutlinedIcon />,
              label: "EID Expiry Date",
              value: editData?.emiratesIdExpiryDate
                ? moment(editData?.emiratesIdExpiryDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "4",
              icon: <Person3OutlinedIcon />,
              label: "EID Copy Front",
              value: editData?.emiratesIdImageFront?.split("/").pop() || "N/A",
            },
            {
              id: "5",
              icon: <Person3OutlinedIcon />,
              label: "EID Copy Back",
              value: editData?.emiratesIdImageBack?.split("/").pop() || "N/A",
            },
          ],
        },
        {
          id: "004",
          title: "Driving License",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "License No.",
              value: editData?.drivingLicenseNo || "N/A",
            },
            {
              id: "2",
              icon: <CalendarMonthOutlinedIcon />,
              label: "License Issue Date",
              value: editData?.licenseIssueDate
                ? moment(editData?.licenseIssueDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "3",
              icon: <CalendarMonthOutlinedIcon />,
              label: "License Expiry Date",
              value: editData?.licenseExpiryDate
                ? moment(editData?.licenseExpiryDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "4",
              icon: <CalendarMonthOutlinedIcon />,
              label: "License Copy Front",
              value: editData?.licenseImageFront?.split("/").pop() || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "License Copy Back",
              value: editData?.licenseImageBack?.split("/").pop() || "N/A",
            },
          ],
        },
        {
          id: "005",
          title: "Passport",
          data: [
            {
              id: "1",
              icon: <FemaleOutlinedIcon />,
              label: "Passport No.",
              value: editData?.passportNo || "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Passport Issue Date",
              value: editData?.licenseIssueDate
                ? moment(editData?.licenseIssueDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Passport Expiry Date",
              value: editData?.passportExpiryDate
                ? moment(editData?.passportExpiryDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "4",
              icon: <TwoWheelerOutlinedIcon />,
              label: "Picture",
              value: editData?.passportImage?.split("/").pop() || "N/A",
            },
          ],
        },
        {
          id: "006",
          title: "Visa",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "UAE Residency / Iqama No.",
              value: editData?.iqamaNo || "N/A",
            },
            {
              id: "2",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Visa Issue Date",
              value: editData?.visaIssueDate
                ? moment(editData?.visaIssueDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "3",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Visa Expiry Date",
              value: editData?.visaExpiryDate
                ? moment(editData?.visaExpiryDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "4",
              icon: <CalendarMonthOutlinedIcon />,
              label: "UAE Residency/Iqama",
              value: editData?.iqamaDocImage?.split("/").pop() || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Company Name",
              value: editData?.company?.companyName || "N/A",
            },
            {
              id: "6",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Company Location",
              value: editData?.companyLocation?.city?.cityName || "N/A",
            },
            {
              id: "7",
              icon: <CalendarMonthOutlinedIcon />,
              label: "VISA Type",
              value: editData?.visaType || "N/A",
            },
            {
              id: "8",
              icon: <CalendarMonthOutlinedIcon />,
              label: "VISA Applied Via",
              value: editData?.visaAppliedCompany?.companyName || "N/A",
            },
          ],
        },
        {
          id: "007",
          title: "Insurance",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Medical Insurance",
              value: editData?.medicalInsurance || "N/A",
            },
            {
              id: "2",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Medical Insurance Start Date",
              value: editData?.medicalStartDate
                ? moment(editData?.medicalStartDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "3",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Medical Insurance End Date",
              value: editData?.medicalEndDate
                ? moment(editData?.medicalEndDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "4",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Accidental Insurance",
              value: editData?.accidentalInsurance || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Accidental Insurance Start Date",
              value: editData?.accidentalStartDate
                ? moment(editData?.accidentalStartDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "6",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Accidental Insurance End  Date",
              value: editData?.accidentalEndDate
                ? moment(editData?.accidentalEndDate).format("DD/MM/YYYY")
                : "N/A",
            },
          ],
        },
        {
          id: "008",
          title: "Other Details",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Passport Handed Over To Representative",
              value: editData?.isPassportHandover ? "Yes" : "No" || "N/A",
            },
            {
              id: "2",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Name of Representative Passport Taken",
              value: editData?.handoverToName || "N/A",
            },
            {
              id: "3",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Add Picture of Passport",
              value: editData?.passportImage?.split("/").pop() || "N/A",
            },
            {
              id: "4",
              icon: <CalendarMonthOutlinedIcon />,
              label: "RTA Training",
              value: editData?.isRTATraining ? "Yes" : "No" || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "EMP Ownership",
              value: editData?.empOwnership || "N/A",
            },
            {
              id: "6",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Vendor",
              value: editData?.vendor?.vendorName || "N/A",
            },
          ],
        },
      ];
      setViewDetails(transformedDetails);
    }
  }, [editData]);

  const handleEditDetails = (details) => {
    if (details.id === "001") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=1`
      );
    }
    if (details.id === "002") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=2`
      );
    }
    if (details.id === "003") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=3`
      );
    }
    if (details.id === "004") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=4`
      );
    }
    if (details.id === "005") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=5`
      );
    }
    if (details.id === "006") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=6`
      );
    }
    if (details.id === "007") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=7`
      );
    }
    if (details.id === "008") {
      router.push(
        `/admin/employees/incomplete-profile/form?id=${editMode}&tab=8`
      );
    }
  };
  return (
    <>
      <MasonryGrid>
        {viewDetails?.map((details) => {
          return (
            <Box key={details.id} sx={{ width: "100%", m: 2 }}>
              <BasicInfo
                profile={details}
                onEdit={() => handleEditDetails(details)}
              />
            </Box>
          );
        })}
      </MasonryGrid>
    </>
  );
};

export default ViewInCompleteEmployee;
