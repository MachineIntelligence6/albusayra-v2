import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TableFiltersData,modalTableFiltersData } from '@/app/constants/assetClearance';

export const useAssetClearance = () => {
  const router = useRouter();
  const [modalFilterData, setModalFilterData] = useState(modalTableFiltersData);
  const [filters, setFilters] = useState(TableFiltersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(10);
  const [headerSearchValue, setHeaderSearchValue] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleRowSelect = (selectedRowIds) => console.log("Selected Row IDs:", selectedRowIds);
  const handleMenuClick = (menuItem) => router.push(menuItem.route);
  const handleFilterClick = (field) => console.log(`Filter clicked for: ${field}`);
  const onSearchChange = (value) => setHeaderSearchValue(value);
  const handleTotalEntriesChange = (value) => setTotalEntries(value);

  return {
    filters,
    modalFilterData,
    isModalOpen,
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
  };
};

