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
        <div className="w-full pt-[3.75rem] relative">
          {/* <img src={flipCountDownImage} alt="" className="w-full" /> */}
          <FlipTimer initialSeconds={99} onDone={() => console.log("끝!")} />
          {/* cheer message*/}
          <div className="absolute">
            <CherrUpMessage />
          </div>
        </div>
        {/* start btn */}
        <div className="pt-[7.75rem] font-regular font-roboto text-title-sm">
          <BorderBtn
            text="To meet today's English"
            px="px-5"
            py="py-2"
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
