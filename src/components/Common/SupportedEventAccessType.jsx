import PropTypes from "prop-types";
import * as Type from "../../lib/PermissionEngine/type";
import PublicFreeImgSrc from "../../assets/image/public-free.jpg";
import PublicPaidImgSrc from "../../assets/image/public-paid.jpg";
import PrivateFreeImgSrc from "../../assets/image/private-free.jpg";
import PrivatePaidImgSrc from "../../assets/image/private-paid.jpg";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const SupportedEventAccessType = ({ accessType }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState(accessType);
  const [imgSrc, setImgSrc] = useState(PublicFreeImgSrc);
  const [title, setTitle] = useState(accessType);
  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Return the original string if it's empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setTitle(
      capitalizeFirstLetter(
        [
          ...accessType.split(Type.RuleBlockContentDivider.operator).map(item => t(item)),
          t("event"),
        ].join(" ")
      )
    );
    switch (accessType) {
      case Type.SpaceEventAccessType.publicFree:
        setDescription(t("space-allowed_event_access_type-public-free-description"));
        setImgSrc(PublicFreeImgSrc);
        break;
      case Type.SpaceEventAccessType.publicPaid:
        setDescription(t("space-allowed_event_access_type-public-paid-description"));
        setImgSrc(PublicPaidImgSrc);
        break;
      case Type.SpaceEventAccessType.privateFree:
        setDescription(t("space-allowed_event_access_type-private-free-description"));
        setImgSrc(PrivateFreeImgSrc);
        break;
      case Type.SpaceEventAccessType.privatePaid:
        setDescription(t("space-allowed_event_access_type-private-paid-description"));
        setImgSrc(PrivatePaidImgSrc);
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="w-full h-[72px] relative bg-[#92929d] rounded-3xl shadow-inner flex items-center">
      <div className="flex flex-col w-[286px] px-4">
        <span
          style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "Inter",
            lineHeight: "none",
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: "white",
            fontSize: "11px",
            fontWeight: "400",
            fontFamily: "Inter",
            lineHeight: "none",
          }}
        >
          {description}
        </span>
      </div>
      <img
        className="w-[86px] h-[72px] object-cover rounded-tr-3xl rounded-br-3xl"
        src={imgSrc}
      />
    </div>
  );
};

SupportedEventAccessType.propTypes = {
  accessType: PropTypes.string.isRequired,
};
