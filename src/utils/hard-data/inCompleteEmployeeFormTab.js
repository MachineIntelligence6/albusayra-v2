"use client";
import { custom } from "@/app/theme";
import {
  CircleEllipsis,
  CreditCard,
  Files,
  FileText,
  Info,
  ReceiptText,
  ShieldHalf,
  Stamp,
} from "lucide-react";
import {
  Info as InfoIcon,
  Call as CallIcon,
  Dvr as DvrIcon,
  ReceiptLongOutlined as ReceiptLongOutlinedIcon,
  ArticleOutlined as ArticleOutlinedIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  HealthAndSafetyOutlined as HealthAndSafetyOutlinedIcon,
  PendingOutlined as PendingOutlinedIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

export const inCompleteEmployeeFormTab = [
  {
    id: "1",
    text: "Basic Info",
    isActive: true,
    icon1: <InfoIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <Info
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "2",
    text: "Contact Residence",
    isActive: false,
    icon1: <CallIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <FileText
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "3",
    text: "Emirates ID",
    isActive: false,
    icon1: <DvrIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <ShieldHalf
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "4",
    text: "Driving License",
    isActive: false,
    icon1: <ReceiptLongOutlinedIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <Files
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "5",
    text: "Passport",
    isActive: false,
    icon1: <ArticleOutlinedIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <ReceiptText
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "6",
    text: "Visa",
    isActive: false,
    icon1: <Stamp fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <CircleEllipsis
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "7",
    text: "Insurance",
    isActive: false,
    icon1: <HealthAndSafetyOutlinedIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <CircleEllipsis
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
  {
    id: "8",
    text: "Other Details",
    isActive: false,
    icon1: <PendingOutlinedIcon fontSize="small" />,
    icon: <ChevronRightIcon fontSize="small" />,
    getIcon: (isActive) => (
      <CircleEllipsis
        color={isActive ? "white" : custom.deepBlue}
        size={40}
        style={{
          background: isActive ? custom.deepBlue : "#1047741A",
          padding: 10,
          borderRadius: 6,
        }}
      />
    ),
  },
];
