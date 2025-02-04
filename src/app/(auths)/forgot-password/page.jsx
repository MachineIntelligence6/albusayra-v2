import dynamic from "next/dynamic";

const ForgotPassword = dynamic(
  () => import("@/components/auth-components/ForgotPassword"),
  { ssr: false }
);

const Page = () => {
  return <ForgotPassword />;
};

export default Page;
