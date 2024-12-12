import { useState, useRef, useEffect } from "react";
import { Textarea } from "@headlessui/react";
import "../../assets/css/Drawer.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function BottomDrawerReview({
  isAddCustomRuleBlockOpen,
  setIsDrawerOpen,
  decision,
  excitements,
  worries,
  setDecision,
  setExcitements,
  setWorries,
  proceedToStep,
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(excitements);
  const [content, setContent] = useState(worries);

  const [position, setPosition] = useState(0); // Tracks vertical position
  const [isDragging, setIsDragging] = useState(false); // Tracks if dragging
  const [isOpening, setIsOpening] = useState(false); // Tracks if dragging
  const [isClosing, setIsClosing] = useState(false); // Tracks if dragging
  const startYRef = useRef(0); // Initial Y position during drag

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (title && title !== "" && content && content !== "") {
      // save
      setExcitements(title);
      setWorries(content);
      setDecision(decision);
    } else {
      alert(
        "please fill in the reasons (exiciments and worries) to have this decision saved."
      );
      setDecision("");
    }
    setIsClosing(true);
    setIsDrawerOpen(false);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (title == "" && content == "") {
      setDecision("");
    }
    if (excitements == "" && worries == "") {
      setDecision("");
    }
    setIsClosing(true);
    setIsDrawerOpen(false);
    proceedToStep(3);
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
      setDecision("");
      setIsDrawerOpen(false);
    } else {
      setPosition(0); // Snap to top
    }
  };

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 700);
    setIsDrawerOpen(true);
  }, []);

  // Effect to prevent background scroll when the drawer is open
  useEffect(() => {
    if (isAddCustomRuleBlockOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Cleanup on component unmount or when drawer is closed
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddCustomRuleBlockOpen]);

  return (
    <div
      style={{
        transform: `translateY(${position}px)`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`${isOpening ? "rise-up" : ""} ${isClosing ? "sink-down" : ""} bottom-drawer fixed bottom-0 left-0 w-full max-h-[90vh] p-6 bg-white rounded-t-[20px] shadow border border-white flex flex-col gap-4 z-30 overflow-y-auto`}
    >
      {/* Drawer Handle */}
      <div className="absolute top-[6px] left-0 w-full flex justify-center items-center">
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

      {/* Content */}
      <div className="flex-grow flex flex-col gap-6 mt-8">
        {/* Header */}
        <div className="text-[#1e1e1e] text-2xl font-semibold">
          {t("review-event.cast-decision")}
        </div>

        {/* Decision Section */}
        <div className="w-full">
          {decision === "agree" && (
            <div className="px-6 py-2 bg-[#35AD66] text-white rounded-full w-full text-center">
              {t("review-event.review-agree")}
            </div>
          )}
          {decision === "disagree" && (
            <div className="px-6 py-2 bg-[#F47051] text-white rounded-full w-full text-center">
              {t("review-event.review-disagree")}
            </div>
          )}
          {decision === "abstention" && (
            <div className="px-6 py-2 bg-[#92929D] text-white rounded-full w-full text-center">
              {t("review-event.review-abstention")}
            </div>
          )}
        </div>

        {/* Excitements Section */}
        <div className="flex flex-col gap-2.5 w-full">
          <div className="text-[#1e1e1e] text-lg font-semibold">
            {t("review-event.excitements")}
          </div>
          <Textarea
            id="add-custom-rule-block-name"
            value={title}
            onChange={handleTitleChange}
            placeholder={t("review-event.excitements-textarea-placeholder")}
            className="w-full h-[91px] px-3.5 py-3.5 bg-[#fafafb] rounded-xl border border-[#d8d8dd] text-[#979797] text-sm"
          />
        </div>

        {/* Worries Section */}
        <div className="flex flex-col gap-2.5 w-full">
          <div className="text-[#1e1e1e] text-lg font-semibold">
            {t("review-event.worries")}
          </div>
          <Textarea
            id="add-custom-rule-block-content"
            value={content}
            onChange={handleContentChange}
            placeholder={t("review-event.worries-textarea-placeholder")}
            className="w-full h-[91px] px-3.5 py-3.5 bg-[#fafafb] rounded-xl border border-[#d8d8dd] text-[#979797] text-sm"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="py-4">
        <button
          onClick={handleBackClick}
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Back
        </button>
        <button
          onClick={handleSaveClick}
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
        >
          {t("navigation.save-button")}
        </button>
      </div>
    </div>
  );
}

BottomDrawerReview.propTypes = {
  isAddCustomRuleBlockOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
  decision: PropTypes.string,
  proceedToStep: PropTypes.func,
  setDecision: PropTypes.func,
  setExcitements: PropTypes.func,
  setWorries: PropTypes.func,
  excitements: PropTypes.string,
  worries: PropTypes.string,
};
