import dynamic from "next/dynamic";

const ChangePassword = dynamic(
  () => import("@/components/Auth-components/changePassword"),
  { ssr: false }
);

const Page = () => {
  return <ChangePassword />;
};

export default Page;
