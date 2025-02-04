import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const InventoryDashboardGetBikeCounters = createAsyncThunk(
  "inventoryDashboard/InventoryDashboardGetBikeCounters",
  async ({
    page,
    pageLength,
    filter,
    filter2,
    filter3,
    desc,
    orderBy,
    statuses,
    parentId,
    SubParentId,
    SubParentId1,
    SubParentId2,
  }) => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.InventoryDashboardGetBikeCounters}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
      if (statuses && Array.isArray(statuses)) {
        statuses.forEach((status) => {
          url += `&statuses=${status}`;
        });
      }
      const res = await axios.get(url, Api.config());
      if (res.status === 200) {
        response = res.data?.result;
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
    return response;
  }
);
export const InventoryDashboardGetBikeByStatusVendorWise = createAsyncThunk(
  "inventoryDashboard/InventoryDashboardGetBikeByStatusVendorWise",
  async ({
    page,
    pageLength,
    filter,
    filter2,
    filter3,
    desc,
    orderBy,
    statuses,
    parentId,
    SubParentId,
    SubParentId1,
    SubParentId2,
  }) => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.InventoryDashboardGetBikeByStatusVendorWise}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
      if (statuses && Array.isArray(statuses)) {
        statuses.forEach((status) => {
          url += `&statuses=${status}`;
        });
      }
      const res = await axios.get(url, Api.config());
      if (res.status === 200) {
        response = res.data?.result;
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
    return response;
  }
);
export const InventoryDashboardGetBikeByStatusCompanyWise = createAsyncThunk(
  "inventoryDashboard/InventoryDashboardGetBikeByStatusCompanyWise",
  async ({
    page,
    pageLength,
    filter,
    filter2,
    filter3,
    desc,
    orderBy,
    statuses,
    parentId,
    SubParentId,
    SubParentId1,
    SubParentId2,
  }) => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.InventoryDashboardGetBikeByStatusCompanyWise}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
      if (statuses && Array.isArray(statuses)) {
        statuses.forEach((status) => {
          url += `&statuses=${status}`;
        });
      }
      const res = await axios.get(url, Api.config());
      if (res.status === 200) {
        response = res.data?.result;
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
    return response;
  }
);
