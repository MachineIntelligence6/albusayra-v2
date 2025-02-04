import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { modalTableFiltersData, TableFiltersData } from '@/app/constants/loan';

export const useLoan = () => {
  const router = useRouter();
  const [modalFilterData, setModalFilterData] = useState(modalTableFiltersData);
  const [filters, setFilters] = useState(TableFiltersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(10);
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const [selectedRequest, setSelectedRequest] = useState("request loan");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleRowSelect = (selectedRowIds) => console.log("Selected Row IDs:", selectedRowIds);
  const handleMenuClick = (menuItem) => setSelectedRequest(menuItem.action);
  const handleFilterClick = (field) => console.log(`Filter clicked for: ${field}`);
  const onSearchChange = (value) => setHeaderSearchValue(value);
  const handleTotalEntriesChange = (value) => setTotalEntries(value);
console.log(selectedRequest,"selectedRequest");

  return {
    filters,
    modalFilterData,
    isModalOpen,
    setIsModalOpen,
    currentPage,
    totalEntries,
    headerSearchValue,
    handleOpenModal,
    handleCloseModal,
    handleRowSelect,
    handleMenuClick,
    handleFilterClick,
    onSearchChange,
    handleTotalEntriesChange,
    setCurrentPage,
    selectedRequest
  };
};

