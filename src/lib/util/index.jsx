import { SupportedEventAccessType } from "../../components/Common/SupportedEventAccessType";
import { KeyValueRuleBlockContent } from "../../components/Common/KeyValueRuleBlockContent";
import { SpaceAvailabilityRuleBlockContent } from "../../components/Common/SpaceAvailabilityRuleBlockContent";
import * as Type from "../PermissionEngine/type";

export const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Return the original string if it's empty
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseRuleBlockContent = async (permissionEngineAPI, ruleBlock) => {
  const { type, content } = ruleBlock;
  let parsedContent = content;

  switch (type) {
    case Type.RuleBlockType.spaceExcludedTopic: {
      const topic = await permissionEngineAPI.fetchTopicById(content);
      parsedContent = (
        <div className="h-[79px] w-full px-[15px] py-[13px] bg-[#fafafb] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="h-[53px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-[#44444f] text-xs font-semibold font-['Inter'] capitalize">
              Excluded theme
            </div>
            <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
              <div className="px-3.5 py-1.5 rounded-[60px] border border-[#bcbcc8] justify-center items-center gap-[5px] flex">
                <div className="text-[#92929d] text-sm font-normal font-['Roboto'] leading-[18.20px]">
                  {topic?.name ?? content}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    }
    case Type.RuleBlockType.spaceAllowedEventAccessType: {
      const supportedAccessTypes = content.split(
        Type.RuleBlockContentDivider.array
      );
      parsedContent = (
        <div className="w-full flex flex-col mt-8 mb-4 gap-4">
          {supportedAccessTypes.map(
            (accessType, index) =>
              accessType && (
                <SupportedEventAccessType
                  key={`supported-event-access-type-${index}`}
                  accessType={accessType}
                />
              )
          )}
        </div>
      );
      break;
    }
    case Type.RuleBlockType.spaceMaxAttendee:
      parsedContent = (
        <KeyValueRuleBlockContent
          keyString="Maximum capacity"
          valueString={content}
        />
      );
      break;
    case Type.RuleBlockType.spaceMaxNoiseLevel:
      parsedContent = (
        <div className="h-[86px] p-3 bg-[#92929d] rounded-[20px] justify-start items-start gap-[8.69px] inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
            <div className="text-center text-white text-s font-semibold font-['Inter']">
              {capitalizeFirstLetter(content)}
            </div>
            <div className="self-stretch text-center text-white text-[11px] font-normal font-['Inter']">
              {content === "high"
                ? "Loud noise such as amplified music, large concerts, or events with powerful sound systems and speakers is allowed."
                : content === "medium"
                  ? "Moderate noise such as background music, live speaking, or performances with microphones."
                  : content === "low"
                    ? "Minimal noise such as soft background music, quiet conversations, or activities that maintain a peaceful environment is required."
                    : ""}
            </div>
          </div>
        </div>
      );
      break;
    case Type.RuleBlockType.spaceAvailability:
      parsedContent = (
        <SpaceAvailabilityRuleBlockContent
          items={content.split(Type.RuleBlockContentDivider.array)}
        />
      );
      break;
    case Type.RuleBlockType.spaceAvailabilityBuffer:
      break;
    case Type.RuleBlockType.spaceAvailabilityUnit:
      break;
    case Type.RuleBlockType.spaceMaxAvailabilityUnitCount:
      break;
    case Type.RuleBlockType.spaceCancelDeadline: {
      let valueString = content;
      const timeAmount = parseInt(content.slice(0, -1), 10); // Extract the number (30, 1, etc.)
      const timeType = content.slice(-1); // Extract the unit type ('m', 'h', 'd')

      switch (timeType) {
        case "m": // minutes
          valueString =
            timeAmount === 1 ? timeAmount + "minute" : timeAmount + "minutes";
          break;
        case "h": // hours
          valueString =
            timeAmount === 1 ? timeAmount + "hour" : timeAmount + "hours";
          break;
        case "d": // days
          valueString =
            timeAmount === 1 ? timeAmount + "day" : timeAmount + "days";
          break;
        default:
          throw new Error('Invalid unit type. Use "m", "h", or "d".');
      }

      parsedContent = (
        <KeyValueRuleBlockContent
          keyString="Cancellation deadline"
          valueString={valueString}
        />
      );
      break;
    }
    case Type.RuleBlockType.spaceEventException:
      parsedContent = (
        <KeyValueRuleBlockContent
          keyString="Reason"
          valueString={content.split(Type.RuleBlockContentDivider.type)[2]}
        />
      );
      break;
    case Type.RuleBlockType.spaceConsentMethod: {
      const [operator, percent, flag] = content.split(
        Type.RuleBlockContentDivider.operator
      );
      parsedContent = (
        <KeyValueRuleBlockContent
          keyString="Consent"
          valueString={`${operator} ${percent}% ${flag}`}
        />
      );
      break;
    }
    case Type.RuleBlockType.spaceEventBenefit:
    case Type.RuleBlockType.spaceEventRisk:
    case Type.RuleBlockType.spaceGeneral:
    case Type.RuleBlockType.spaceEventGeneral:
    case Type.RuleBlockType.spacePrePermissionCheck:
    case Type.RuleBlockType.spaceGuide:
    default:
      break;
  }

  return parsedContent;
};

export const handleLogin = () => {
  window.location.href = "/api/v1/auth/google";
};
