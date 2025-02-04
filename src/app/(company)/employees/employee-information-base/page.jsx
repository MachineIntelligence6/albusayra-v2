import React from "react";
import EmployeeInformationBase from "@/components/company-flow/employee-information-components";

const Page = ({ searchParams }) => {
  return <EmployeeInformationBase params={searchParams} />;
};

export default Page;
