import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

function CustomBreadcrumb({ name }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-[#4B465C] text-[18px] font-medium leading-[28px]"
          >
            {" "}
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator /> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default CustomBreadcrumb;
