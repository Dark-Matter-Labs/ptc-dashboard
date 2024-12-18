import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/outline";
import PtCLogoImgSrc from "../../assets/image/ptc-logo.png";
import { LandingTheme } from "./LandingTheme";
import { LandingMap } from "./LandingMap";
import PropTypes from "prop-types";
import { handleLogin } from "../../lib/util";

const Landing = ({ permissionEngineAPI, currentLanguage }) => {
  const coverSectionRef = useRef(null);
  const themeSectionRef = useRef(null);
  const mapSectionRef = useRef(null);
  const slidesSectionRef = useRef(null);
  const [currentSection, setCurrentSection] = useState("cover");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [, setMe] = useState(null);

  const fetchMe = async () => {
    try {
      const result = await permissionEngineAPI.fetchMe();
      if (result) {
        setMe(result);
      } else {
        throw new Error(`Error fetching me`);
      }
    } catch (error) {
      console.error(error);
      handleLogin();
    }
  };

  useLayoutEffect(() => {
    const sections = [
      { id: "cover", ref: coverSectionRef },
      { id: "theme", ref: themeSectionRef },
      { id: "map", ref: mapSectionRef },
      { id: "slides", ref: slidesSectionRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.getAttribute("data-section"));
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    console.log("current section: ", currentSection);
  }, [currentSection]);

  return (
    <div className="font-sans bg-[#2F103A]">
      {/* Cover Section */}
      <section
        ref={coverSectionRef}
        data-section="cover"
        className="bg-[#F9F3F3] h-[100vh] md:h-[100vh] lg:h-[95vh] flex flex-col justify-start gap-20 md:justify-between items-center pb-4 lg:pb-8 mx-4 rounded-b-3xl relative overflow-hidden"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Decorative Lines */}
        <div
          className="absolute inset-0 z-0"
          style={{
            pointerEvents: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {/* streight line */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#D8BFD8"
              strokeWidth="0.1"
            />
            {/* lower-left line */}
            <line
              x1="-1.5%"
              y1="50%"
              x2="50%"
              y2="100%"
              stroke="#D8BFD8"
              strokeWidth="0.1"
            />
            {/* lower-right line */}
            <line
              x1="50%"
              y1="100%"
              x2="100%"
              y2="51.5%"
              stroke="#D8BFD8"
              strokeWidth="0.1"
            />
            {/* upper-right line */}
            <line
              x1="100%"
              y1="48.5%"
              x2="50%"
              y2="0"
              stroke="#D8BFD8"
              strokeWidth="0.1"
            />
            {/* upper-left line */}
            <line
              x1="50%"
              y1="0"
              x2="0"
              y2="48.5%"
              stroke="#D8BFD8"
              strokeWidth="0.1"
            />
          </svg>
        </div>
        {/* Caresoul questions */}
        <div className="mt-16 z-10 text-center px-20 md:px-40 lg:px-80">
          <div className=" text-4xl font-light text-[#2F103A]">
            우리 도시에서 꼭 해보고 싶은 멋진 아이디어가 있나요?
          </div>
          <div className=" text-2xl md:text-4xl  font-light mt-8 text-[#CDA5EF] uppercase ">
            What would you love to create in your neighbourhood?
          </div>
        </div>
        {/* Project logo, name and tagline */}
        <div className="absolute bottom-4 left-4 w-3/4 md:w-1/3 md:bottom-8 md:left-8">
          <img
            src={PtCLogoImgSrc}
            alt="ptc logo"
            className="w-16 h-16 md:w-24 md:h-24"
          />
          <div className="text-[#8F79A2] font-semibold text-xl md:text-2xl mt-4">
            Permissioning Engine
          </div>
          <div className="text-[#8F79A2] mt-4 text-base">
            Community-led Urban Governance Platform
          </div>
        </div>
        {/* Scroll button */}
        <button
          onClick={() => scrollToSection(themeSectionRef)} // Fixes immediate execution
          className="bg-[#2F103A] text-[#CDA5EF] rounded-full w-12 h-12 md:w-14 md:h-14 flex justify-center items-center hover:bg-[#4a195c] focus:outline-none z-10"
        >
          <ArrowDownIcon
            className="w-6 h-6"
            style={{
              strokeWidth: 1.5, // Custom stroke width for thinner arrow lines
            }}
          />
        </button>
      </section>

      {/* Theme Section */}
      <LandingTheme
        themeSectionRef={themeSectionRef}
        selectedThemes={selectedThemes}
        setSelectedThemes={setSelectedThemes}
        currentLanguage={currentLanguage}
      />

      {/* Map Section */}
      <LandingMap
        mapSectionRef={mapSectionRef}
        permissionEngineAPI={permissionEngineAPI}
        selectedThemes={selectedThemes}
        currentLanguage={currentLanguage}
      />

      {/* Slides Section*/}
      <section
        ref={slidesSectionRef}
        data-section="slides"
        className="bg-[#2F103A] h-screen flex justify-center items-center"
      >
        <h1 className="text-white text-3xl">Slides Section</h1>
      </section>

      {/* Rhombus Buttons */}
      <div className="fixed bottom-4 right-12 flex-col items-center z-20 hidden md:block ">
        {/* Button 1 */}
        <button
          onClick={() => scrollToSection(coverSectionRef)}
          className="w-32 h-32 bg-white text-gray-400 flex items-center justify-center -mt-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
            backgroundColor: currentSection === "cover" ? "#AF56EF" : "#fff",
            color: currentSection === "cover" ? "#FFFFFF" : "#333",
          }}
        >
          <span className="pb-16 uppercase">Intro</span>
        </button>

        {/* Button 2 */}
        <button
          onClick={() => scrollToSection(themeSectionRef)}
          className="w-32 h-32 bg-white text-gray-400  flex items-center justify-center -mt-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
            backgroundColor: currentSection === "theme" ? "#AF56EF" : "#fff",
            color: currentSection === "theme" ? "#FFFFFF" : "#333",
          }}
        >
          <span className="pb-16 uppercase">Theme</span>
        </button>

        {/* Button 3 */}
        <button
          onClick={() => scrollToSection(mapSectionRef)}
          className="w-32 h-32 bg-white text-gray-400  flex items-center justify-center -mt-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
            backgroundColor: currentSection === "map" ? "#AF56EF" : "#fff",
            color: currentSection === "map" ? "#FFFFFF" : "#333",
          }}
        >
          <span className="pb-16 uppercase">Map</span>
        </button>
      </div>
    </div>
  );
};

export default Landing;

Landing.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
