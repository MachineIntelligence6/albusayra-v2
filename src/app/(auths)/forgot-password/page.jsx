import dynamic from "next/dynamic";

const ForgotPassword = dynamic(
  () => import("@/components/Auth-components/ForgotPassword"),
  { ssr: false }
);

const Page = () => {
  return <ForgotPassword />;
};

export default Page;
