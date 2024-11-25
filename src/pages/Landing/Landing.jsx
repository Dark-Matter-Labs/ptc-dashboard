import { useRef } from "react";
import { ArrowDownIcon } from "@heroicons/react/solid";

const App = () => {
  const coverSectionRef = useRef(null);
  const themeSectionRef = useRef(null);
  const mapSectionRef = useRef(null);
  const slidesSectionRef = useRef(null);

  const scrollToCoverSection = () => {
    if (coverSectionRef.current) {
      coverSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToThemeSection = () => {
    if (themeSectionRef.current) {
      themeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMapSection = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const scrollToSlidesSection = () => {
  //   if (slidesSectionRef.current) {
  //     slidesSectionRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <div className="font-sans bg-[#2F103A]">
      {/* Cover Section */}
      <section
        ref={coverSectionRef}
        className="bg-[#F9F3F3] h-[45vh] md:h-[70vh] lg:h-[95vh] flex flex-col justify-end items-center pb-4 lg:pb-8 mx-4 rounded-b-3xl relative overflow-hidden"
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

        {/* Scroll Button */}
        <button
          onClick={scrollToThemeSection}
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
      <section
        ref={themeSectionRef}
        className="bg-[#2F103A] h-screen flex justify-center items-center"
      >
        <h1 className="text-white text-3xl">Theme Section</h1>
      </section>

      {/* Map Section */}
      <section
        ref={mapSectionRef}
        className="bg-[#F9F3F3] h-screen flex justify-center items-center"
      >
        <h1 className="text-purple-900 text-3xl">Map Section</h1>
      </section>

      {/* Section 3 */}
      <section
        ref={slidesSectionRef}
        className="bg-[#2F103A] h-screen flex justify-center items-center"
      >
        <h1 className="text-white text-3xl">Slides Section</h1>
      </section>

      {/* Rhombus Buttons */}
      <div className="fixed bottom-2 right-4 flex flex-col items-center z-20">
        {/* Button 1 */}
        <button
          onClick={scrollToCoverSection}
          className="w-32 h-32 bg-white text-gray-400 flex items-center justify-center -mt-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
          }}
        >
          <span className="pb-16">Introduction</span>
        </button>

        {/* Button 2 */}
        <button
          onClick={scrollToThemeSection}
          className="w-32 h-32 bg-white text-gray-400  flex items-center justify-center -mt-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
          }}
        >
          <span className="pb-16">Theme</span>
        </button>
        <button
          onClick={scrollToMapSection}
          className="w-32 h-32 bg-white text-gray-400  flex items-center justify-center -mt-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
          }}
        >
          <span className="pb-16">Map</span>
        </button>
      </div>
    </div>
  );
};

export default App;
