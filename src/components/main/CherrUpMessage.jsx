import messageDelete from "@/assets/img/delete_sm.svg";
import loading from "@/assets/img/loading.svg";

import { cheerUpMessages } from "@/api/dummyData";

function CherrUpMessage() {
  const getRandomBg = () =>
    Math.random() > 0.5 ? "bg-yellow" : "bg-lightgrey";

  return (
    <div className="absolute top-full mt-[4.875rem]">
      {/* message */}
      <div className="h-[12.313rem] overflow-hidden">
        <div className="flex flex-col items-start gap-3">
          {cheerUpMessages.map((message) => (
            <div
              key={message.id}
              className={`inline-flex max-w-[16.25rem] min-h-[3.125rem] px-[0.625rem] py-2 text-xs font-roboto ${getRandomBg()}`}
            >
              <p className="inline-block max-w-[11rem] leading-4 break-all">
                {message.text}
              </p>

              <div className="flex flex-col items-end justify-between ml-3">
                <button className="w-[0.563rem] h-[0.563rem]">
                  <img src={messageDelete} alt="delete message" />
                </button>
                <span className="text-charcoal/50">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        {/* <img src={loading} alt="loading" /> */}
      </div>

      {/* input */}
      <div className="flex flex-col items-start gap-[1.313rem] ">
        <div className="flex flex-row gap-2">
          <button className="w-[2.313rem] h-[2rem] bg-lightgrey" />
          <div className="h-[2rem] px-[0.5rem] py-[0.313rem] bg-lightgrey flex ">
            <label htmlFor="cheerUp"></label>
            <input
              id="cheerUp"
              type="text"
              maxLength={40}
              placeholder="40 characters or fewer"
              className="w-[11.063rem] h-full bg-white text-xs px-[0.313rem] outline-none"
            />
            <button className="text-xs pl-[0.563rem] h-full">send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CherrUpMessage;
