import { useState, useRef, useEffect } from "react";
import { Button, Textarea, Input } from "@headlessui/react";
import "../../assets/css/Drawer.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { CameraIcon } from "@heroicons/react/solid";
import { ApiClient, SpaceAPI } from "@dark-matter-labs/ptc-sdk";

export default function BottomDrawerSpaceIssueReport({
  space,
  isIssueReportBottonDrawerOpen,
  setIsIssueReportBottonDrawerOpen,
}) {
  const { t } = useTranslation();
  const apiClient = new ApiClient();
  const spaceAPI = new SpaceAPI(apiClient);
  const [position, setPosition] = useState(0); // Tracks vertical position
  const [isDragging, setIsDragging] = useState(false); // Tracks if dragging
  const [isOpening, setIsOpening] = useState(false); // Tracks if dragging
  const [isClosing, setIsClosing] = useState(false); // Tracks if dragging
  const startYRef = useRef(0); // Initial Y position during drag
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(new Set(files));

      if (fileArray.length > 5) {
        alert(`Up to 5 images are allowed`);
        return;
      }

      setImages(fileArray);
    }
  };

  const handleCameraClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (title && title.trim() !== "" && content && content.trim() !== "") {
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("details", content.trim());
        formData.append("isPublic", true);

        if (images.length > 0) {
          images.forEach((image) => {
            formData.append("images", image);
          });
        }

        await spaceAPI.reportIssue(space.id, formData);
        alert("Issue submitted");

        setIsClosing(true);
        setIsIssueReportBottonDrawerOpen(false);
      } else if (!title || title.trim() === "") {
        alert("Please provide title");
      } else if (!content || content.trim() === "") {
        alert("Please provide content");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit issue report");
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
      setIsIssueReportBottonDrawerOpen(false);
    } else {
      setPosition(0); // Snap to top
    }
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 1000);
    setIsIssueReportBottonDrawerOpen(true);
  }, []);

  // Effect to prevent background scroll when the drawer is open
  useEffect(() => {
    if (isIssueReportBottonDrawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Cleanup on component unmount or when drawer is closed
    return () => {
      document.body.style.overflow = "";
    };
  }, [isIssueReportBottonDrawerOpen]);

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
      <div className="self-stretch h-[356px] flex-col justify-start items-start gap-[35px] inline-flex">
        <div className="self-stretch h-[31px] flex-col justify-start items-center gap-8 flex">
          <div className="self-stretch h-[31px] flex-col justify-start items-start gap-[11px] flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="text-[#1e1e1e] text-2xl font-semibold font-['Inter'] leading-[31.20px]">
                {t("space.add-issue-report")}
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[219px] flex-col justify-start items-end gap-[30px] flex">
          <div className="self-stretch h-[219px] flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch h-[75px] flex-col justify-center items-start gap-[25px] flex">
              <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch text-[#1e1e1e] text-lg font-semibold font-['Inter'] leading-normal">
                  {t("space.add-issue-report-title")}
                </div>
                <div className="self-stretch px-4 py-3 bg-[#fafafb] rounded-xl border border-[#d8d8dd] justify-start items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 h-[18px] justify-start items-center gap-[7.06px] flex">
                    <div className="grow shrink basis-0 h-[18px] justify-start items-center gap-[5.65px] flex">
                      <Input
                        id="add-custom-rule-block-name"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder={t(
                          "space.add-issue-report-title-placeholder"
                        )}
                        className="grow shrink basis-0 text-[#979797] font-normal font-['Roboto'] leading-[18.35px] bg-[#fafafb]"
                      ></Input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[160px] flex-col justify-center items-start gap-2.5 flex">
              <div className="self-stretch h-[160px] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch text-[#1e1e1e] text-lg font-semibold font-['Inter'] leading-normal">
                  {t("space.add-issue-report-description")}
                </div>
                <div className="w-[329px] justify-start items-start gap-[5.26px] inline-flex">
                  <div className="grow shrink basis-0 h-[91px] px-3.5 py-3.5 bg-[#fafafb] rounded-xl border border-[#d8d8dd] flex-col justify-start items-start gap-[8.77px] inline-flex">
                    <div className="self-stretch grow shrink basis-0 justify-start items-start gap-3.5 inline-flex">
                      <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-[7.02px] inline-flex">
                        <Textarea
                          id="add-custom-rule-block-content"
                          value={content}
                          onChange={handleContentChange}
                          placeholder={t(
                            "space.add-issue-report-description-placeholder"
                          )}
                          className="self-stretch h-full text-[#979797] text-sm font-normal font-['Inter'] bg-[#fafafb]"
                        ></Textarea>
                        <div className="h-0 w-full top-0 flex flex-col items-end">
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            multiple
                            accept=".jpg,.jpeg,.png,.webp,.heic"
                          />
                          <CameraIcon
                            className="p-2 size-10 fixed left-80 bottom-36"
                            onClick={handleCameraClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full text-xs flex items-end justify-end">
                  {images.length > 0
                    ? (
                      <div>{images.length} images attached</div>
                    )
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-9 flex-col justify-start items-start gap-[8.69px] flex">
          <div className="self-stretch h-[46px] py-[5px] flex-col justify-start items-center gap-[15px] flex">
            <div className="w-[137px] py-[9px] bg-[#3b3a43] rounded-[67.04px] justify-center items-center inline-flex">
              <Button
                onClick={handleSaveClick}
                className="text-center text-white text-xs font-normal font-['Roboto'] leading-[18px]"
              >
                {t("navigation.save-button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BottomDrawerSpaceIssueReport.propTypes = {
  space: PropTypes.object,
  isIssueReportBottonDrawerOpen: PropTypes.bool,
  setIsIssueReportBottonDrawerOpen: PropTypes.func,
};
