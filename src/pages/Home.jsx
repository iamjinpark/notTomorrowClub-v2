import flipCountDownImage from "@/assets/img/flipCountDown.svg";

import CherrUpMessage from "@/components/main/CherrUpMessage";

function Home() {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        {/* greeting */}
        <div className="w-full font-chakra font-semibold flex justify-between">
          <div className="flex flex-col justify-between">
            <h1 className=" text-title-lg">Hello, Stranger! Good Morning</h1>
            <div
              className="w-[6.563rem] h-[1.938rem] bg-lightgrey rounded-full flex
            flex-row items-center justify-center gap-2 mt-4"
            >
              <span className="inline-block w-[13px] h-[13px] bg-[#00F318] rounded-full" />
              <span className="font-roboto font-semibold">32 online</span>
            </div>
          </div>
          <div className="text-title-sm flex flex-col items-end pt-3">
            <p>2025/08/21</p>
            <p>South Korea</p>
            <p>Rain, 25℃, 0.1 m/s</p>
          </div>
        </div>
        {/* flip countdown */}
        <div className="w-full pt-[3.75rem] relative">
          <img src={flipCountDownImage} alt="" className="w-full" />
          {/* cheer message*/}
          <CherrUpMessage />
        </div>
        {/* start btn */}
        <div className="pt-[7.75rem] font-regular font-roboto text-title-sm">
          <button className="px-5 py-2 border rounded-full">
            To meet today's English
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
