// import flipCountDownImage from "@/assets/img/flipCountDown.svg";
import Greeting from "@/components/main/Greeting";
import CherrUpMessage from "@/components/main/CherrUpMessage";
import BorderBtn from "@/components/common/BorderBtn";

import { useNavigate } from "react-router-dom";
import FlipTimer from "@/components/main/FlipTimer";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        {/* greeting */}
        <Greeting />
        {/* flip countdown */}
        <section className="w-full pt-[3.75rem]">
          {/* <img src={flipCountDownImage} alt="" className="w-full" /> */}
          <FlipTimer initialSeconds={99} onDone={() => console.log("끝!")} />
        </section>
        {/* cheer up message + learning button */}
        <div className="flex flex-row font-regular font-roboto text-title-sm">
          <CherrUpMessage />
          <BorderBtn
            text="To meet today's English"
            px="px-[1.625rem]"
            py="py-[0.813rem]"
            onClick={() => {
              navigate("/learning");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
