import PropTypes from "prop-types";
export const LandingMap = ({ mapSectionRef }) => {
  return (
    <section
      ref={mapSectionRef}
      data-section="map"
      className="bg-[#F9F3F3] h-screen "
    >
      <div className="flex flex-col justify-between items-center p-8">
        <div className="text-[#AF56EF] text-base uppercase mt-2">
          Explore spaces
        </div>
        <div className="text-[#431F51] text-3xl mt-1">
          다양한 공간을 둘러보세요.
        </div>
        <div className="text-[#918C96] font-semibold mt-4">
          선택한 키워드입니다.
        </div>
      </div>
    </section>
  );
};

LandingMap.propTypes = {
  mapSectionRef: PropTypes.object,
};
