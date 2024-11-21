import PropTypes from "prop-types";

export const KeyValueRuleBlockContent = ({ keyString, valueString }) => {
  return (
    <div className="w-full h-[45px] p-2 bg-[#f1f1f5] rounded-[10px] flex-col justify-center items-center gap-3 inline-flex">
      <div className="self-stretch h-[22px] flex-col justify-center items-start flex">
        <div className="self-stretch h-[22px] flex-col justify-center items-center gap-1.5 flex">
          <div className="w-[283px] py-0.5 justify-center items-center inline-flex">
            <div className="h-[19px] justify-center items-center gap-2 flex">
              <div className="text-[#1e1e1e] text-[15px] font-medium font-['Inter']">
                {keyString}:
              </div>
              <div className="text-right text-[#1e1e1e] text-base font-medium font-['Inter']">
                {valueString}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

KeyValueRuleBlockContent.propTypes = {
  keyString: PropTypes.string.isRequired,
  valueString: PropTypes.string.isRequired,
};
