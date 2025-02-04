import dynamic from "next/dynamic";

const ChangePassword = dynamic(
  () => import("@/components/auth-components/changePassword"),
  { ssr: false }
);

const Page = () => {
  return <ChangePassword />;
};

export default Page;
