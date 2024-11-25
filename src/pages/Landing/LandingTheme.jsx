import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
export const LandingTheme = ({ themeSectionRef }) => {
  const { t } = useTranslation();

  return (
    <section
      ref={themeSectionRef}
      data-section="theme"
      className="bg-[#2F103A] h-screen flex flex-col justify-start items-center p-2"
    >
      <div className="mt-8 text-white text-3xl">Theme Section</div>
      <div className="mt-4 text-white border border-1px border-white overflow-auto">
        {Array.from({ length: 100 }).map((theme, index) => (
          <span className="text-white ml-2" key={index}>
            {t(`landing-theme.theme-${index + 1}`)} {theme}{" "}
          </span>
        ))}
      </div>
    </section>
  );
};

LandingTheme.propTypes = {
  themeSectionRef: PropTypes.object,
};
