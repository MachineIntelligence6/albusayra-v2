import React from "react";
import EmployeeClearanceEmptyScreen from "@/components/company-flow/employees/employee-clearance";

const page = ({ searchParams }) => {
  return (
    <div>
      <EmployeeClearanceEmptyScreen params={searchParams} />
    </div>
  );
};

export default page;
