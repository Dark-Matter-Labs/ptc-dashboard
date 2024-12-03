import PropTypes from "prop-types";
import * as Type from "../../lib/PermissionEngine/type";

export const SpaceAvailabilityRuleBlockContent = ({ items }) => {
  return (
    <div className="w-full p-2 bg-[#f1f1f5] rounded-[10px] flex-col justify-center items-center gap-3 inline-flex">
      <div className="self-stretch flex-col justify-center items-start flex">
        <div className="self-stretch flex-col justify-center items-center gap-1.5 flex">
          <div className="w-[283px] py-0.5 justify-center items-center inline-flex">
            <div className="justify-center items-center gap-2 flex flex-col">
              {items.map((item, index) => (
                item && <div key={`space-availability-rule-block-content-${index}`} className="flex flex-row">
                  <div className="text-[#1e1e1e] text-[15px] font-medium font-['Inter']">
                    {item.split(Type.RuleBlockContentDivider.time)[0]}:
                  </div>
                  <div className="text-right text-[#1e1e1e] text-base font-medium font-['Inter']">
                    {`${item.split(Type.RuleBlockContentDivider.time)[1]}-${item.split(Type.RuleBlockContentDivider.time)[2]}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SpaceAvailabilityRuleBlockContent.propTypes = {
  items: PropTypes.array.isRequired,
};
