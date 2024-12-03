import * as Type from "../type";
import { API } from "../api";
const { RuleBlockType } = Type;
const api = new API();

export class RuleBlock {
  name;
  type;
  content;
  details;
  files;

  constructor(option) {
    const { name, type, content, details, files } = option;

    if (typeof name !== "string") {
      throw new Error(`name must be string type`);
    }

    if (
      [
        RuleBlockType.spaceGeneral,
        RuleBlockType.spaceExcludedTopicspaceGeneral,
        RuleBlockType.spaceGuidespaceGeneral,
        RuleBlockType.spacePrivateGuidespaceGeneral,
        RuleBlockType.spaceConsentMethodspaceGeneral,
        RuleBlockType.spaceConsentTimeoutspaceGeneral,
        RuleBlockType.spacePostEventCheckspaceGeneral,
        RuleBlockType.spacePrePermissionCheckspaceGeneral,
        RuleBlockType.spaceAllowedEventAccessTypespaceGeneral,
        RuleBlockType.spaceMaxAttendeespaceGeneral,
        RuleBlockType.spaceMaxNoiseLevelspaceGeneral,
        RuleBlockType.spaceAvailabilityspaceGeneral,
        RuleBlockType.spaceAvailabilityBufferspaceGeneral,
        RuleBlockType.spaceAvailabilityUnitspaceGeneral,
        RuleBlockType.spaceMaxAvailabilityUnitCountspaceGeneral,
        RuleBlockType.spaceCancelDeadlinespaceGeneral,
        RuleBlockType.spaceEventGeneralspaceGeneral,
        RuleBlockType.spaceEventBenefitspaceGeneral,
        RuleBlockType.spaceEventRiskspaceGeneral,
        RuleBlockType.spaceEventSelfRiskAssesmentspaceGeneral,
        RuleBlockType.spaceEventExceptionspaceGeneral,
        RuleBlockType.spaceEventRequireEquipmentspaceGeneral,
        RuleBlockType.spaceEventInsurancespaceGeneral,
      ].includes(type) === false
    ) {
      throw new Error(`Invalid type`);
    }

    this.name = name;
    this.type = type;
    this.content = content;
    this.details = details;
    this.files = files;

    return this.build();
  }

  build() {
    return {
      name: this.name,
      type: this.type,
      content: this.content,
      details: this.details,
      files: this.files,
    };
  }

  async validate() {
    let result = true;

    try {
      switch (this.type) {
        case RuleBlockType.spaceGeneral:
        case RuleBlockType.spaceGuide:
        case RuleBlockType.spacePrivateGuide:
        case RuleBlockType.spacePostEventCheck:
        case RuleBlockType.spaceEventGeneral:
        case RuleBlockType.spaceEventBenefit:
        case RuleBlockType.spaceEventRisk:
        case RuleBlockType.spaceEventSelfRiskAssesment:
          break;
        case RuleBlockType.spaceExcludedTopic:
          await this.validateSpaceExcludedTopic(this.content);
          break;
        case RuleBlockType.spaceMaxNoiseLevel:
          this.validateNoiseLevel(this.content);
          break;
        case RuleBlockType.spaceConsentMethod:
          this.validateSpaceConsentMethod(this.content);
          break;
        case RuleBlockType.spaceConsentTimeout:
          this.validateSpaceConsentTimeout(this.content);
          break;
        case RuleBlockType.spaceCancelDeadline:
          this.validateSpaceCancelDeadline(this.content);
          break;
        case RuleBlockType.spaceAllowedEventAccessType:
          this.validateSpaceAllowedEventAccessType(this.content);
          break;
        case RuleBlockType.spaceMaxAttendee:
          this.validateSpaceMaxAttendee(this.content);
          break;
        case RuleBlockType.spaceAvailability:
          this.validateSpaceAvailability(this.content);
          break;
        case RuleBlockType.spaceAvailabilityUnit:
          this.validateSpaceAvailabilityUnit(this.content);
          break;
        case RuleBlockType.spaceMaxAvailabilityUnitCount:
          this.validateSpaceAvailabilityUnitCount(this.content);
          break;
        case RuleBlockType.spaceAvailabilityBuffer:
          this.validateSpaceAvailabilityBuffer(this.content);
          break;
        case RuleBlockType.spacePrePermissionCheck:
          this.validateSpacePrePermissionCheck(this.content);
          break;
        case RuleBlockType.spaceEventRequireEquipment:
          await this.validateSpaceEventRequireEquipment(this.content);
          break;
        case RuleBlockType.spaceEventException:
          await this.validateSpaceEventException(this.content);
          break;
        case RuleBlockType.spaceEventInsurance:
          this.validateSpaceEventInsurance(this.files);
          break;

        default:
          throw new Error(`Unsupported RuleBlockType: ${this.type}`);
      }
    } catch (error) {
      console.error(error);
      result = false;
    }

    return result;
  }

  static validateSpaceConsentMethod(content) {
    const testRegex = /^(under|over|is):(100|[1-9]?[0-9]):(yes|no)$/;
    const [operator, percent] = content.split(":");

    if (
      !testRegex.test(content) ||
      (operator === "under" && parseInt(percent) === 0) ||
      (operator === "over" && parseInt(percent) === 100) ||
      parseInt(percent) > 100 ||
      parseInt(percent) < 0
    ) {
      throw new Error(
        "Consent condition must be in format: {under|over|is}:{percent}:{yes|no}"
      );
    }
  }

  static validateSpaceConsentTimeout(content) {
    const testRegex = /^\d+[dh]$/;

    if (!testRegex.test(content)) {
      throw new Error("Space consent timeout must be in format: {number}{d|h}");
    }
  }

  static validateSpaceAllowedEventAccessType(content) {
    const accessTypes = content.split(",");
    accessTypes.forEach((item) => {
      this.validateSpaceEventAccess(item);
    });
  }

  static validateSpaceMaxAttendee(content) {
    if (isNaN(content) || content !== parseInt(content).toString()) {
      throw new Error("Content must be an integer");
    }
  }

  static validateSpaceAvailability(content) {
    const availableDays = content
      .toLowerCase()
      .split(",")
      .filter((item) => item != null && item !== "");

    const openingDates = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };

    availableDays.forEach((availability) => {
      this.validateSpaceAvailabilityItem(availability);

      const [day, startTime, endTime] = availability.split("-");
      const [startHour, startMinute] = startTime.split(":");
      const [endHour, endMinute] = endTime.split(":");

      const invalidOpeningDateTime = openingDates[day].find((item) => {
        return (
          parseInt(item[0]) <= parseInt(`${endHour}${endMinute}`) ||
          parseInt(item[1]) >= parseInt(`${startHour}${startMinute}`)
        );
      });

      if (invalidOpeningDateTime) {
        throw new Error(
          `Invalid availability value: ${JSON.stringify(invalidOpeningDateTime)}`
        );
      } else {
        openingDates[day].push([
          `${startHour}${startMinute}`,
          `${endHour}${endMinute}`,
        ]);
      }
    });
  }

  static validateSpaceAvailabilityItem(content) {
    const testRegex = /^(mon|tue|wed|thu|fri|sat|sun)-\d{2}:\d{2}-\d{2}:\d{2}$/;
    // eslint-disable-next-line no-unused-vars
    const [day, startTime, endTime] = content.split("-");
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    if (!testRegex.test(content)) {
      throw new Error("Availability does not match format.");
    }

    if (
      parseInt(`${startHour}${startMinute}`) >=
      parseInt(`${endHour}${endMinute}`)
    ) {
      throw new Error("Cannot start after end time");
    }
  }

  static validateSpaceAvailabilityUnit(content) {
    const testRegex = /^\d+[dhm]$/;
    if (!testRegex.test(content)) {
      throw new Error(
        "Space availability unit must be in format: {number}{d|h|m}"
      );
    }
  }

  static validateSpaceCancelDeadline(content) {
    const testRegex = /^\d+[dhm]$/;
    if (!testRegex.test(content)) {
      throw new Error(
        "Space cancel deadline must be in format: {number}{d|h|m}"
      );
    }
  }

  static validateSpaceAvailabilityUnitCount(content) {
    const value = parseInt(content);
    if (isNaN(value) || value < 1 || value > 60) {
      throw new Error(
        "Space max availability unit count must be an integer between 1 and 60"
      );
    }
  }

  static validateSpaceAvailabilityBuffer(content) {
    const testRegex = /^\d+[dwMyhms]$/;
    if (!testRegex.test(content)) {
      throw new Error(
        "Space availability buffer must be in format: {number}{d|w|M|y|h|m|s}"
      );
    }
  }

  static validateSpacePrePermissionCheck(content) {
    // eslint-disable-next-line no-unused-vars
    const [question, answer] = content.split(":");

    if (!["true", "false"].includes(answer) || content.split(":").length > 2) {
      throw new Error(
        "Space pre permission check must be in format: {boolean question}:{default answer in boolean}"
      );
    }
  }

  static validateSpaceEventAccess(content) {
    const allowedAccessTypes = [
      "publicFree",
      "publicPaid",
      "privateFree",
      "privatePaid",
    ];

    if (!allowedAccessTypes.includes(content)) {
      throw new Error(
        "SpaceEvent access type must be one of: {publicFree|publicPaid|privateFree|privatePaid}"
      );
    }
  }

  static async validateSpaceEventRequireEquipment(content) {
    const [spaceEquipmentId, quantity] = content.split(":");
    const spaceEquipment = await api.fetchEquipmentById(spaceEquipmentId);

    if (!spaceEquipment) {
      throw new Error(
        `There is no spaceEquipment with id: ${spaceEquipmentId}`
      );
    }

    if (parseInt(quantity) > spaceEquipment.quantity) {
      throw new Error("The given quantity exceeds the spaceEquipment quantity");
    }
  }

  static async validateSpaceExcludedTopic(content) {
    const topic = await api.fetchTopicById(content);

    if (!topic) {
      throw new Error(`There is no topic with id: ${content}`);
    }
  }

  static async validateSpaceEventException(content) {
    // eslint-disable-next-line no-unused-vars
    const [spaceRuleBlockHash, desiredValue, reason] = content.split(":");
    const spaceRuleBlock = await api.fetchRuleBlockByHash(spaceRuleBlockHash);

    if (!spaceRuleBlock) {
      throw new Error(
        `There is no space ruleBlock with hash: ${spaceRuleBlockHash}`
      );
    }

    // eslint-disable-next-line no-unused-vars
    const { type, content: ruleContent } = spaceRuleBlock;
    switch (type) {
      case "spaceAllowedEventAccessType":
        this.validateSpaceAllowedEventAccessType(desiredValue);
        break;
      case "spaceMaxAttendee":
        this.validateSpaceMaxAttendee(desiredValue);
        break;
      case "spaceAvailability":
        this.validateSpaceAvailability(desiredValue);
        break;
      case "spaceAvailabilityUnit":
        this.validateSpaceAvailabilityUnit(desiredValue);
        break;
      case "spaceAvailabilityBuffer":
        this.validateSpaceAvailabilityBuffer(desiredValue);
        break;
      case "spacePrePermissionCheck":
        if (desiredValue !== "false") {
          throw new Error("desiredValue must be false");
        }
        break;
      default:
        throw new Error(`Unsupported exception target type: ${type}`);
    }
  }

  static validateSpaceEventInsurance(files) {
    if (files.length === 0) {
      throw new Error("Should provide file for insurance");
    }
  }

  static validateNoiseLevel(content) {
    const allowedNoiseLevels = ["high", "medium", "low"];

    if (!allowedNoiseLevels.includes(content)) {
      throw new Error("Noise level must be one of: high | medium | low");
    }
  }
}
