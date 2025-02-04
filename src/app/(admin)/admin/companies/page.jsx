"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import CustomBreadcrumb from "../../../components/sharedComponents/BreadCrum/page";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import {
  createCompany,
  getCompanyByStatus,
  updateCompany,
} from "@/redux/reducers/companies/companyThunk";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "@/configs/UseApi";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { updateSuccess } from "@/redux/reducers/companies/companySlice";
import Loader from "@/utils/reusable-functions/Loader";
import CustomBreadcrumb from "@/app/components/sharedComponents/BreadCrum/page";
import ContactInfo from "@/app/components/dashboardComponents/modalComponents/ContactInfo";
import Locations from "@/app/components/dashboardComponents/modalComponents/Locations";
import CompanyInfo from "@/app/components/dashboardComponents/modalComponents/CompanyInfo";
import Listings from "@/app/components/dashboardComponents/modalComponents/Listings";

export default function Page() {
  const [tabs, setTabs] = useState("company");
  const [OpenCompanyModal, setOpenCompanyModal] = useState(false);
  const [listing, setListing] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [formData, setFormData] = useState({
    companyInfo: null,
    contactInfo: null,
    locations: null,
  });

  const dispatch = useDispatch();
  const {
    loading,
    submitSuccess,
    statusChangeSuccess,
    deleteSuccess,
    getDataByStatuses,
    editDetails,
  } = useSelector((state) => state.companySlice);

  const handleCompanyInfoSubmit = (data) => {
    try {
      setFormData((prev) => {
        return { ...prev, companyInfo: data };
      });
      setCountryId(data?.country);
      setTabs("contact");
    } catch (error) {
      console.error("Error in handleCompanyInfoSubmit:", error);
    }
  };

  const handleContactInfoSubmit = (data) => {
    setFormData((prev) => ({ ...prev, contactInfo: data }));
    setTabs("locations");
  };

  const handleClose = () => {
    setOpenCompanyModal(false);
    dispatch(updateSuccess());
    setTabs("company");
  };

  const handleModalOpen = () => {
    setOpenCompanyModal(true);
  };

  const handleTabChange = async (newTab) => {
    // Allow backward navigation
    if (
      (tabs === "contact" && newTab === "company") ||
      (tabs === "locations" && (newTab === "company" || newTab === "contact"))
    ) {
      setTabs(newTab);
      return;
    }

    // Forward navigation validation
    if (tabs === "company" && !formData.companyInfo) {
      alert("Please fill and submit company information first");
      return;
    }
    if (tabs === "contact" && !formData.contactInfo) {
      alert("Please fill and submit contact information first");
      return;
    }

    setTabs(newTab);
  };

  // console.log("editDetails", editDetails);

  const handleFinalSubmit = async (finalLocations) => {
    const formDataSubmit = new FormData();

    // Append Company Info
    formDataSubmit.append("Image", formData?.companyInfo?.uploadedFile);
    formDataSubmit.append(
      "CompanyAbbreviation",
      formData?.companyInfo?.abbreviation
    );
    formDataSubmit.append("CompanyName", formData?.companyInfo?.companyName);
    formDataSubmit.append("IndustryId", formData?.companyInfo?.industry);
    formDataSubmit.append("Website", formData?.companyInfo?.website);
    formDataSubmit.append("ContactNumber", formData?.companyInfo?.phoneNumber);
    formDataSubmit.append("Address", formData?.companyInfo?.businessAddress);
    formDataSubmit.append("CountryId", formData?.companyInfo?.country);
    formDataSubmit.append("StateId", formData?.companyInfo?.state);
    formDataSubmit.append("CityId", formData?.companyInfo?.city);

    // Append Contact Fields
    formDataSubmit.append("EntityId", UserData?.EntityId);
    formDataSubmit.append(
      "CompanyContact.Salutation",
      formData?.contactInfo?.salutation
    );
    formDataSubmit.append(
      "CompanyContact.FullName",
      formData?.contactInfo?.fullName
    );
    formDataSubmit.append(
      "CompanyContact.JobTitle",
      formData?.contactInfo?.jobTitle
    );
    formDataSubmit.append("CompanyContact.Email", formData?.contactInfo?.email);
    formDataSubmit.append(
      "CompanyContact.ContactNumber",
      formData?.contactInfo?.phoneNumber
    );

    // // Append merged data to formData
    // finalLocations.forEach((location, idx) => {
    //   formDataSubmit.append(
    //     `ListCompanyLocation[${idx}].cityId`,
    //     location?.cityId
    //   );
    //   formDataSubmit.append(
    //     `ListCompanyLocation[${idx}].stateId`,
    //     location?.stateId
    //   );
    //   formDataSubmit.append(
    //     `ListCompanyLocation[${idx}].countryId`,
    //     location?.countryId
    //   );
    //   formDataSubmit.append(
    //     `ListCompanyLocation[${idx}].id`,
    //     location?.id || "" // Include old `id` if exists
    //   );
    //   formDataSubmit.append(
    //     `ListCompanyLocation[${idx}].companyId`,
    //     editDetails?.id || "" // Include old `companyId` if exists
    //   );
    // });

    // Append merged data to formData
    finalLocations.forEach((location, idx) => {
      if (location?.cityId !== undefined) {
        formDataSubmit.append(
          `ListCompanyLocation[${idx}].cityId`,
          location.cityId
        );
      }
      if (location?.stateId !== undefined) {
        formDataSubmit.append(
          `ListCompanyLocation[${idx}].stateId`,
          location.stateId
        );
      }
      if (location?.countryId !== undefined) {
        formDataSubmit.append(
          `ListCompanyLocation[${idx}].countryId`,
          location.countryId
        );
      }
      if (location?.id !== undefined) {
        formDataSubmit.append(
          `ListCompanyLocation[${idx}].id`,
          location.id || ""
        ); // Include old `id` if exists
      }
      if (editDetails?.id !== undefined) {
        formDataSubmit.append(
          `ListCompanyLocation[${idx}].companyId`,
          editDetails.id || ""
        ); // Include old `companyId` if exists
      }
    });

    // Append Generic Fields
    formDataSubmit.append("CreatedBy", UserData?.Id);
    formDataSubmit.append("Status", 1);

    // Update Payload
    if (editDetails !== null) {
      // Append Update-Specific Fields
      formDataSubmit.append("Id", editDetails?.id);
      formDataSubmit.append("UpdatedBy", UserData?.Id);
      formDataSubmit.append(
        "CompanyContact.Id",
        editDetails?.companyContact?.id
      );

      dispatch(updateCompany(formDataSubmit));
    } else {
      dispatch(createCompany(formDataSubmit));
    }
  };

  useEffect(() => {
    dispatch(getCompanyByStatus({ page: 1, pageLength: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (submitSuccess || statusChangeSuccess || deleteSuccess) {
      const params = { page: 1, pageLength: 1000 };
      dispatch(getCompanyByStatus(params));
      handleClose();
    }
  }, [dispatch, submitSuccess, statusChangeSuccess, deleteSuccess]);

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <CustomBreadcrumb name="Companies" />
        <Button
          type="button"
          onClick={handleModalOpen}
          className="bg-[#296291] hover:bg-[#4080b4]"
        >
          <Plus />
          Add Company
        </Button>
      </div>
      <div className="py-5">
        <Separator />
      </div>

      <AlertDialog open={OpenCompanyModal} onOpenChange={setOpenCompanyModal}>
        <AlertDialogContent className="max-w-[864px] ">
          <Tabs
            value={tabs}
            defaultValue="company"
            className="w-full flex flex-col gap-5"
          >
            <TabsList className="flex flex-row items-center justify-between">
              <TabsTrigger
                value="company"
                onClick={() => handleTabChange("company")}
                className="flex flex-row items-center gap-[12px]"
              >
                <div className="bg-[#104774] p-[8px] rounded-md">
                  <img
                    src="/companyinfo.png"
                    className="w-[22px] h-[22px]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <div className="text-[#2F2B3DE5] text-[15px] font-medium leading-[22px]">
                    Company Info
                  </div>
                  <div className="text-[13px] font-normal leading-[20px] text-[#2F2B3DB2]">
                    Enter your company details
                  </div>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="contact"
                onClick={() => handleTabChange("contact")}
                className="flex flex-row items-center gap-[12px]"
              >
                <div className="bg-[#104774] p-[8px] rounded-md">
                  <img
                    src="/contactInfo.png"
                    className="w-[22px] h-[22px]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <div className="text-[#2F2B3DE5] text-[15px] font-medium leading-[22px]">
                    Contact Info
                  </div>
                  <div className="text-[13px] font-normal leading-[20px] text-[#2F2B3DB2]">
                    Enter your contact info
                  </div>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="locations"
                onClick={() => handleTabChange("locations")}
                className="flex flex-row items-center gap-[12px]"
              >
                <div className="bg-[#104774] p-[8px] rounded-md">
                  <img
                    src="/location.png"
                    className="w-[22px] h-[22px]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <div className="text-[#2F2B3DE5] text-[15px] font-medium leading-[22px]">
                    Company Locations
                  </div>
                  <div className="text-[13px] font-normal leading-[20px] text-[#2F2B3DB2]">
                    Select your company locations
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="company">
              <CompanyInfo
                editDetails={editDetails}
                setTab={setTabs}
                onSubmit={handleCompanyInfoSubmit}
                onClose={handleClose}
              />
            </TabsContent>
            <TabsContent value="contact">
              <ContactInfo
                editDetails={editDetails}
                setTabs={setTabs}
                onSubmit={handleContactInfoSubmit}
                onClose={handleClose}
              />
            </TabsContent>
            <TabsContent value="locations">
              <Locations
                editDetails={editDetails}
                setTabs={setTabs}
                finalSubmit={handleFinalSubmit}
                onClose={handleClose}
                countryId={countryId}
                setCountryId={setCountryId}
              />
            </TabsContent>
          </Tabs>
        </AlertDialogContent>
      </AlertDialog>

      {loading ? (
        <Loader size="large" overlay />
      ) : Array.isArray(getDataByStatuses?.data) &&
        getDataByStatuses.data.length > 0 ? (
        <Listings
          setOpenCompanyModal={setOpenCompanyModal}
          cardData={getDataByStatuses.data}
        />
      ) : (
        <>
          <EmptyScreenView
            image="/objectsimage.png"
            altText="Companies"
            title="No Companies Registered"
            description="Please click the button below to add a new company."
            buttonText="Add Company"
            onButtonClick={handleModalOpen}
          />
        </>
      )}
    </div>
  );
}
