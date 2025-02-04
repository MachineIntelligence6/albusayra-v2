import CustomBreadcrumb from "@/app/Components/sharedComponents/BreadCrum/page";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Check } from "lucide-react";
import CampaignsWrapper from "@/components/Campaigns";

function View() {
  const userData = {
    Name: "Zaheer Abbas",
    Email_Address: "zaheer@albusayradelivery.com",
    Website: "www.al-busayra.com",
    Phone_Number: "+971 123 456 7890",
    Industry: "Delivery Services",
    Country: "United Arab Emirates",
    "State/Province": "Dubai",
    City: "Dubari",
    Locations: "Dubai, Sharjah, Ajman",
    Business_Address:
      "Office no N12, first floor  G9, building al majaz sharjha",
    Status: "Active",
  };
  const d = [
    {
      img: "",
      name: "Total Users",
      count: 50,
      color: "#01AB9C",
    },
    {
      img: "",
      name: "Active Users",
      count: 50,
      color: "#CA4F8E",
    },
    {
      img: "",
      name: "Inactive Users",
      count: 50,
      color: "#FFAC30",
    },
  ];
  return (
    <div className="">
      <CustomBreadcrumb name="View Company" />
      <Separator className="mt-5" />
      <div className="grid grid-cols-[390px_1fr] gap-4 mt-5 h-full">
        <div className="bg-[#062A47] rounded-[25px] h-full">
          <div className="flex flex-col gap-2 p-[25px]">
            <div className="w-[66px] h-[66px] rounded-full">
              <img src="/icon1.png" alt="" />
            </div>
            <div className="text-[16px] font-semibold leading-[22px] text-white">
              AL-BUSAYRA
            </div>
          </div>

          <div className="border-y-[1px] ">
            {Object.entries(userData).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-row w-full justify-between border-b"
              >
                <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
                  {key}
                </div>
                <div
                  className={` py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] ${
                    key === ""
                  } `}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" px-[20px] flex flex-col gap-[20px]  h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
            {d?.map((element, idx) => {
              return (
                <div
                  className="max-w-[380px] flex flex-col w-full bg-[#01AB9C] rounded-[25px] py-[20px] px-[30px]"
                  key={idx}
                  style={{ backgroundColor: element?.color }}
                >
                  <div className="flex flex-col">
                    <div className="bg-[#FFFFFF] rounded-[6px] w-[40px] h-[40px] flex items-center justify-center">
                      <div className="rounded-full border-[1px] border-[#01AB9C] flex justify-center items-center  w-[21px] h-[21px]">
                        <Check className="text-[#01AB9C] w-[10px] h-[10px]" />
                      </div>
                    </div>
                    <div className="text-white">{element?.name}</div>
                  </div>
                  <div className="font-bold text-[35px] leading-[41px] text-end w-full text-white">
                    {element.count}{" "}
                  </div>
                </div>
              );
            })}
          </div>

          <CampaignsWrapper />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default View;
