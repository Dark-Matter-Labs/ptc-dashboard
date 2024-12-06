import PropTypes from "prop-types";

export const KeyValueRuleBlockContent = ({ keyString, valueString }) => {
  return (
    <div className="w-full h-auto p-2 text-white bg-[#857692] rounded-[10px] flex-col justify-center items-center gap-3 inline-flex">
      <div className="self-stretch h-auto flex-col justify-center items-start flex">
        <div className="self-stretch h-auto flex-col justify-center items-center gap-1.5 flex">
          <div className="w-[283px] py-0.5 justify-center items-center inline-flex ">
            <div className="h-auto justify-center items-start gap-2 flex-col w-full">
              <div>{keyString}</div>
              <div>{valueString}</div>
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
