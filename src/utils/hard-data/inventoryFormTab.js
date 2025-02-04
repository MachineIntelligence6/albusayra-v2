"use client"
import { custom } from "@/app/theme";
import {
    CircleEllipsis,
    CreditCard,
    Files,
    FileText,
    Info,
    ReceiptText,
    ShieldHalf,
} from "lucide-react";

export const inventoryFormTab = [
    {
        id: "1",
        text: "Bike Info",
        isActive: true,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <Info
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <Info
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
    {
        id: "2",
        text: "Bike Mulikya",
        isActive: false,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <FileText
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <FileText
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
    {
        id: "3",
        text: "Bike Insurance",
        isActive: false,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <ShieldHalf
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <ShieldHalf
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
    {
        id: "4",
        text: "Bike Contract",
        isActive: false,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <Files
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <Files
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
    {
        id: "5",
        text: "Bike Food Permit",
        isActive: false,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <ReceiptText
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <ReceiptText
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
    {
        id: "6",
        text: "Other Details",
        isActive: false,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <CircleEllipsis
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <CircleEllipsis
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
];


export const addEmployeeFormTabs = [
    {
        id: "1",
        text: "Add Employee",
        isActive: true,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <Info
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <Info
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
    {
        id: "2",
        text: "C3 Card",
        isActive: false,
        getIcon: (isActive) => (
            <>
                {isActive ? (
                    <CreditCard
                        color="white"
                        style={{ background: custom.deepBlue, padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                ) : (
                    <CreditCard
                        color={custom.deepBlue}
                        style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
                        size={40}
                    />
                )}
            </>
        ),
    },
]