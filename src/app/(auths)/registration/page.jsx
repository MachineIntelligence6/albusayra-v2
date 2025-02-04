import dynamic from "next/dynamic";

const RegisterUser = dynamic(
  () => import("@/components/auth-components/registerUser"),
  { ssr: false }
);

const Page = () => {
  return <RegisterUser />;
};

export default Page;
