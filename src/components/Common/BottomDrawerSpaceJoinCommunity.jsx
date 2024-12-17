import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@headlessui/react";
import "../../assets/css/Drawer.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ApiClient, SpacePermissionerAPI } from "@dark-matter-labs/ptc-sdk";
import { navigateTo } from "../../lib/util";

export default function BottomDrawerSpaceJoinCommunity({
  space,
  isJoinCommunityDrawerOpen,
  setIsJoinCommunityDrawerOpen,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = new ApiClient();
  const spacePermissionerAPI = new SpacePermissionerAPI(apiClient);
  const [position, setPosition] = useState(0); // Tracks vertical position
  const [isDragging, setIsDragging] = useState(false); // Tracks if dragging
  const [isOpening, setIsOpening] = useState(false); // Tracks if dragging
  const [isClosing, setIsClosing] = useState(false); // Tracks if dragging
  const startYRef = useRef(0); // Initial Y position during drag
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsJoinCommunityDrawerOpen(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (content && content.trim() !== "") {
        await spacePermissionerAPI.join(space.id, {
          message: content.trim(),
        });

        alert("Joined the community!");

        setIsClosing(true);
        setIsJoinCommunityDrawerOpen(false);
        navigateTo({ navigate, pathname: `/space/${space.id}` });
      } else {
        alert("Please provide message content");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to join community");
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY - position;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const newPosition = e.touches[0].clientY - startYRef.current;
    setPosition(Math.max(0, Math.min(newPosition, window.innerHeight - 100))); // Clamp position
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (position > window.innerHeight / 3) {
      setPosition(window.innerHeight - 100); // Snap to bottom
      setIsJoinCommunityDrawerOpen(false);
    } else {
      setPosition(0); // Snap to top
    }
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 1000);
    setIsJoinCommunityDrawerOpen(true);
  }, []);

  // Effect to prevent background scroll when the drawer is open
  useEffect(() => {
    if (isJoinCommunityDrawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Cleanup on component unmount or when drawer is closed
    return () => {
      document.body.style.overflow = "";
    };
  }, [isJoinCommunityDrawerOpen]);

  return (
    <div
      style={{
        transform: `translateY(${position}px)`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`${isOpening ? "rise-up" : ""} ${isClosing ? "sink-down" : ""} bottom-drawer fixed bottom-0 left-0 w-full h-[460px] pl-8 pr-8 pt-6 pb-24 bg-white rounded-tl-[20px] rounded-tr-[20px] shadow border border-white flex-col justify-start items-center gap-4 z-30`}
    >
      <div className="absolute w-full left-0 flex justify-center items-center top-[6px]">
        <svg
          width="48"
          height="3"
          viewBox="0 0 48 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.51172 1.91992L46.6797 1.91992"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="self-stretch h-[356px] flex-col justify-start items-start gap-1 inline-flex">
        <div className="text-[#1e1e1e] text-2xl font-semibold font-['Inter'] leading-[31.20px]">
          {t("space-join-community.drawer-title", {
            spaceName: space.name,
          })}
        </div>
        <div className="self-stretch h-[219px] flex-col justify-start items-end gap-[30px] flex">
          <div className="self-stretch h-[219px] flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch h-[100px] flex-col justify-center items-start gap-[25px] flex">
              <div className="self-stretch h-[100px] flex-col justify-start items-start gap-2.5 flex">
                {t("space-join-community.drawer-description")}
              </div>
            </div>
            <div className="self-stretch h-[160px] flex-col justify-center items-start gap-2.5 flex">
              <div className="self-stretch h-[160px] flex-col justify-start items-start gap-2.5 flex">
                <div className="w-[329px] justify-start items-start gap-[5.26px] inline-flex">
                  <div className="grow shrink basis-0 h-[91px] px-3.5 py-3.5 bg-[#fafafb] rounded-xl border border-[#d8d8dd] flex-col justify-start items-start gap-[8.77px] inline-flex">
                    <div className="self-stretch grow shrink basis-0 justify-start items-start gap-3.5 inline-flex">
                      <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-[7.02px] inline-flex">
                        <Textarea
                          id="write-message-placeholder"
                          value={content}
                          onChange={handleContentChange}
                          placeholder={t(
                            "space-join-community.write-message-placeholder"
                          )}
                          className="self-stretch h-full text-[#979797] text-sm font-normal font-['Inter'] bg-[#fafafb]"
                        ></Textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-9 flex-col justify-start items-start gap-[8.69px] flex">
          <div className="self-stretch h-[46px] py-[5px] flex-col justify-start items-center gap-[15px] flex">
            <button
              onClick={handleBackButtonClick}
              className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
            >
              Back
            </button>
            <button
              className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
              onClick={handleSaveClick}
            >
              {t("space-join-community.join-button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

BottomDrawerSpaceJoinCommunity.propTypes = {
  space: PropTypes.object,
  isJoinCommunityDrawerOpen: PropTypes.bool,
  setIsJoinCommunityDrawerOpen: PropTypes.func,
  currentLanguage: PropTypes.string,
};
