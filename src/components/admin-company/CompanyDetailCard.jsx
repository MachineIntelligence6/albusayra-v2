import React from "react";

const CompanyDetailCard = ({ getDataById }) => {
  return (
    <div class="bg-[#062A47] rounded-[25px] h-full w-full">
      <div className="flex flex-col gap-2 p-[25px]">
        <div className="w-[66px] h-[66px] mb-2">
          <img
            className="rounded-full"
            src={getDataById?.image ? getDataById?.image : "/icon1.png"}
            alt=""
          />
        </div>
        <div className="text-[16px] font-semibold leading-[22px] text-white">
          {getDataById?.companyName}
        </div>
      </div>

      <div className="border-y-[1px] Harris">
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Name
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.companyContact?.fullName}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Email Address
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.companyContact?.email}
          </div>
        </div>
        {getDataById?.website === "null" ? (
          ""
        ) : (
          <div className="flex flex-row w-full justify-between border-b">
            <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
              Website
            </div>
            <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
              {getDataById?.website}
            </div>
          </div>
        )}
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Phone Number
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.contactNumber}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Industry
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.industry?.industryName}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Country
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.country?.countryName}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            State
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.state?.stateName}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            City
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.city?.cityName}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Locations
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.listCompanyLocation
              ?.map((location) => location.city.cityName)
              .join(", ") || "N/A"}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Business Address
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.address}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between border-b">
          <div className=" py-[21px] px-[24px] text-[#FFFFFFB2] text-[13px] font-medium leading-[18px]">
            Status
          </div>
          <div className="py-[21px] px-[24px] text-[#FFFFFFE5] text-[13px] font-medium leading-[18px] text-right">
            {getDataById?.status === 1 ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      {/* <div className="border-y-[1px] ">
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
      </div> */}
    </div>
  );
};

export default CompanyDetailCard;
