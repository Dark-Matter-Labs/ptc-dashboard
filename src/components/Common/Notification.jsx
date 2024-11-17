import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import "../../assets/css/Notification.css";
import GroupPPIcon from "../../assets/image/group-pp.svg";

export function Notification({ subject, html, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const id = uuid();

  const handleOnClick = (e) => {
    e.preventDefault();
    navigate("/profile/notification");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, [isVisible]);

  return (
    <div
      id={id}
      className={`${
        isVisible ? "fade-in" : ""
      } notification opacity-0 bg-[#2a2929] h-[120px] w-[338px] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] p-4 flex flex-row justify-start items-start gap-2 absolute top-5`}
      onClick={handleOnClick}
    >
      <div className="self-start left-1 top-1 absolute w-6 h-6">
        <img
          className="h-6 w-6 p-0 border-0 outline-none absolute left-4 top-4"
          src={GroupPPIcon}
        ></img>
      </div>
      <div className="h-[78px] w-[272px] self-start left-[50px] top-4 absolute p-0 flex flex-col gap-2">
        <div className="notification-subject overflow-hidden text-white text-left align-text-top text-[16px] font-['Inter'] leading-auto border-none outline-none w-[272px]">
          <div className="w-[101%] line-clamp-1">{subject}</div>
        </div>
        <div className="notification-content overflow-hidden space-y-0 text-white text-left align-text-top text-[13px] top-[27px] w-[272px] h-[72px] absolute border-none outline-none">
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: html ?? text }}
          ></div>
        </div>
      </div>
    </div>
  );
}

Notification.propTypes = {
  subject: PropTypes.string,
  html: PropTypes.string,
  text: PropTypes.string,
};
