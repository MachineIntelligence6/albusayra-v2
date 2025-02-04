"use client";
import { useEffect, useState } from 'react';
import GenericModal from '@/components/applicants/GenericModel';
import ChallansTableWrapper from '@/components/challans/ChallansTableWrapper';
import DynamicBreadcrumb from '@/components/shared-components/BreadCrumb';
import { Box, Divider } from '@mui/material';
import { UploadIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import ChallansForm from '@/components/challans/ChallansForm';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isBtnShow, setIsBtnShow] = useState(false);
  const [isChallan, setIsChallan] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/challans/traffic")) {
      setIsBtnShow(true);
      setIsChallan(true);
    }
  }, [pathname])

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("cl");
  }

  const onChange = (e) => {
    setSelectedValue(e.target.value);
    console.log("cl");
  }

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb btnName="Upload" isBtnShow={isBtnShow} icon={<UploadIcon className="w-4 h-4" />} isChallan={isChallan} onClick={handleOpenModal} />
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
        <ChallansTableWrapper handleOpenModal={handleOpenModal} rowsPerPage={rowsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} selectedValue={selectedValue}
          onChange={onChange} />
      </Box>
    </>
  )
}

export default Page
