import BorderBtn from "@/components/common/BorderBtn";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-[4.563rem] pt-[6.813rem]">
      <div className="text-title-lg font-semibold font-chakra text-center">
        <p>Start your day with 5 sentences.</p>
        <p>Small. Light. Daily</p>
      </div>
      <BorderBtn text="Login" bg="bg-yellow" />
    </div>
  );
}

export default Login;
