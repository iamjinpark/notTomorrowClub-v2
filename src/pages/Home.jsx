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
        <Greeting />

        <section className="w-full pt-14.5">
          {/* <img src={flipCountDownImage} alt="" className="w-full" /> */}
          <FlipTimer initialSeconds={99} onDone={() => console.log("끝!")} />
        </section>

        <section className="w-full flex items-center justify-start gap-[10.5rem] py-[2.6875rem]">
          <CherrUpMessage />
          <BorderBtn
            text="To meet today's English"
            px="px-[1.875rem]"
            py="py-[0.8125rem]"
            className="font-regular font-roboto en-button-1 leading-[1.25rem]"
            onClick={() => navigate("/learning")}
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
