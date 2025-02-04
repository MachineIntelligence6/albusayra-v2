"use client";
import { useEffect, useState } from "react";
import GenericModal from "@/components/applicants/GenericModel";
import ChallansTableWrapper from "@/components/challans/ChallansTableWrapper";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import { usePathname } from "next/navigation";
import { UploadIcon } from "lucide-react";
import ChallansForm from "@/components/challans/ChallansForm";

const Page = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const [isBtnShow, setIsBtnShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/admin/challans")) {
      setIsBtnShow(true);
    }
  }, [pathname]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb
          btnName="Upload"
          isBtnShow={isBtnShow}
          icon={<UploadIcon className="w-4 h-4" />}
          onClick={handleOpenModal}
        />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box component="div">
        <GenericModal
          open={isModalOpen}
          onClose={handleCloseModal}
          title="Applicants Modal"
        >
          <ChallansForm handleCloseModal={handleCloseModal} />
        </GenericModal>
        <ChallansTableWrapper
          handleOpenModal={handleOpenModal}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      </Box>
    </>
  );
};

export default Page;
