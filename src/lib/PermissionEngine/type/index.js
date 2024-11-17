/**
 * @typedef {Object} EmailTemplate
 * @property {Language} language
 * @property {string} subject
 * @property {string} html
 * @property {string} text
 */
export var SesBounceType;
(function (SesBounceType) {
    SesBounceType["Undetermined"] = "Undetermined";
    SesBounceType["Permanent"] = "Permanent";
    SesBounceType["Transient"] = "Transient";
})(SesBounceType || (SesBounceType = {}));
export var SesBounceSubType;
(function (SesBounceSubType) {
    // Undetermined
    SesBounceSubType["Undetermined"] = "Undetermined";
    // Permanent & Transient
    SesBounceSubType["General"] = "General";
    // Permanent
    SesBounceSubType["NoEmail"] = "NoEmail";
    SesBounceSubType["Supressed"] = "Supressed";
    SesBounceSubType["OnAccountSuppressionList"] = "OnAccountSuppressionList";
    // Transient
    SesBounceSubType["MailboxFull"] = "MailboxFull";
    SesBounceSubType["MessageTooLarge"] = "MessageTooLarge";
    SesBounceSubType["ContentRejected"] = "ContentRejected";
    SesBounceSubType["AttachmentRejected"] = "AttachmentRejected";
})(SesBounceSubType || (SesBounceSubType = {}));
export var SesComplaintFeedbackType;
(function (SesComplaintFeedbackType) {
    SesComplaintFeedbackType["abuse"] = "abuse";
    SesComplaintFeedbackType["authFailure"] = "auth-failure";
    SesComplaintFeedbackType["fraud"] = "fraud";
    SesComplaintFeedbackType["notSpam"] = "not-spam";
    SesComplaintFeedbackType["other"] = "other";
    SesComplaintFeedbackType["virus"] = "virus";
})(SesComplaintFeedbackType || (SesComplaintFeedbackType = {}));
export var RuleTarget;
(function (RuleTarget) {
    RuleTarget["space"] = "space";
    RuleTarget["spaceEvent"] = "space_event";
})(RuleTarget || (RuleTarget = {}));
export var SpaceEventStatus;
(function (SpaceEventStatus) {
    SpaceEventStatus["pending"] = "pending";
    SpaceEventStatus["permissionRequested"] = "permission_requested";
    SpaceEventStatus["permissionRejected"] = "permission_rejected";
    SpaceEventStatus["permissionGranted"] = "permission_granted";
    SpaceEventStatus["cancelled"] = "cancelled";
    SpaceEventStatus["running"] = "running";
    SpaceEventStatus["closed"] = "closed";
    SpaceEventStatus["complete"] = "complete";
    SpaceEventStatus["completeWithIssue"] = "complete_with_issue";
    SpaceEventStatus["completeWithIssueResolved"] = "complete_with_issue_resolved";
})(SpaceEventStatus || (SpaceEventStatus = {}));
export var SpaceApprovedRuleSortBy;
(function (SpaceApprovedRuleSortBy) {
    SpaceApprovedRuleSortBy["popularity"] = "popularity";
    SpaceApprovedRuleSortBy["timeAsc"] = "time-asc";
    SpaceApprovedRuleSortBy["timeDesc"] = "time-desc";
})(SpaceApprovedRuleSortBy || (SpaceApprovedRuleSortBy = {}));
/**
 * <RuleBlock.content divider rules>
 * Array divider: ';'
 * Type divider: '^'
 * Time unit divider: '-'
 */
export var RuleBlockType;
(function (RuleBlockType) {
    /**
     * Space: rule blocks for space rules
     * [Required] required rule block type
     * [Optional] optional rule block type
     * [PrePermissionCheck] need to consent on this rule blocks for auto permission
     * [Private] only visible to space permissioners and approved event organizers & not going to be inherited to child rules
     * [PostEventCheck] check list for event completion
     */
    /**
     * [Optional] General descriptive rule block for space rule
     * content: string
     */
    RuleBlockType["spaceGeneral"] = "space:general";
    /**
     * [Optional] Excluded topics in the space
     * content: {topicId}
     */
    RuleBlockType["spaceExcludedTopic"] = "space:excluded_topic";
    /**
     * [Optional] Public guide: visible to everyone
     * content: string
     */
    RuleBlockType["spaceGuide"] = "space:guide";
    /**
     * [Private] [Optional] Private guide: only visible to space permissioners and approved event organizers
     * content: string
     */
    RuleBlockType["spacePrivateGuide"] = "space:private_guide";
    /**
     * [Required] Consent method for space permissioners
     * content: /^(under|over|is):(100|[1-9]?[0-9]):(yes|no)$/
     */
    RuleBlockType["spaceConsentMethod"] = "space:consent_method";
    /**
     * [Required] Consent timeout for space permissioners
     * content: {number}{d|h}
     */
    RuleBlockType["spaceConsentTimeout"] = "space:consent_timeout";
    /**
     * [PostEventCheck] [Optional] Post event boolean question for event organizers
     * content: string
     */
    RuleBlockType["spacePostEventCheck"] = "space:post_event_check";
    /**
     * [PrePermissionCheck] [Optional] Custom pre permission check rules made by space permissioners to ask boolean question: event organizers need to agree on this for auto permission
     * content: string
     */
    RuleBlockType["spacePrePermissionCheck"] = "space:pre_permission_check";
    /**
     * [PrePermissionCheck] [Required] Allowed event access types
     * content: array of {SpaceEventAccessType};{SpaceEventAccessType}; ...
     */
    RuleBlockType["spaceAllowedEventAccessType"] = "space:allowed_event_access_type";
    /**
     * [PrePermissionCheck] [Required] Max Attendee limit
     * content: number
     */
    RuleBlockType["spaceMaxAttendee"] = "space:max_attendee";
    /**
     * [PrePermissionCheck] [Required] Max noise level
     * content: {NoiseLevel}
     */
    RuleBlockType["spaceMaxNoiseLevel"] = "space:max_noise_level";
    /**
     * [PrePermissionCheck] [Required] Availability description
     * content: {mon|tue|wed|thu|fri|sat|sun}-{00:00}-{24:00};{mon|tue|wed|thu|fri|sat|sun}-{00:00}-{24:00}; ...
     */
    RuleBlockType["spaceAvailability"] = "space:availability";
    /**
     * [PrePermissionCheck] [Required] Availability buffer between events
     * content: {number}{d|h|m}
     */
    RuleBlockType["spaceAvailabilityBuffer"] = "space:availability_buffer";
    /**
     * [PrePermissionCheck] [Required] Availability unit
     * content: {number}{d|h|m}
     */
    RuleBlockType["spaceAvailabilityUnit"] = "space:availability_unit";
    /**
     * [PrePermissionCheck] [Required] Max allowed availability unit count
     * content: integer between 1 and 60
     */
    RuleBlockType["spaceMaxAvailabilityUnitCount"] = "space:max_availability_unit_count";
    /**
     * [PrePermissionCheck] [Required] Cancellation deadline for events
     * content: {number}{d|h|m}
     */
    RuleBlockType["spaceCancelDeadline"] = "space:cancel_deadline";
    /**
     * SpaceEvent: rule blocks for event rules
     * [Required] required rule block type
     * [Optional] optional rule block type
     * [Private] only visible to space permissioners and approved event organizers & not going to be inherited to child rules
     */
    /**
     * [Optional] General descriptive rule block for event rule
     * content: string
     */
    RuleBlockType["spaceEventGeneral"] = "space_event:general";
    /**
     * [Optional] Expected benefit
     * content: string
     */
    RuleBlockType["spaceEventBenefit"] = "space_event:benefit";
    /**
     * [Optional] Expected risk
     * content: string
     */
    RuleBlockType["spaceEventRisk"] = "space_event:risk";
    /**
     * [Optional] Description on self risk assesment
     * content: string
     */
    RuleBlockType["spaceEventSelfRiskAssesment"] = "space_event:self_risk_assesment";
    /**
     * [Optional] Exception against a space rule block
     * content: {spaceRuleBlockHash}^{desiredValue}^{reason}
     * [Policy] No exception === agree
     */
    RuleBlockType["spaceEventException"] = "space_event:exception";
    /**
     * [Optional] [Private] space equipment requirement for event
     * content: {spaceEquipmentId}^{quantity}
     */
    RuleBlockType["spaceEventRequireEquipment"] = "space_event:require_equipment";
    /**
     * [Optional] [Private] Insurance file for event
     * content: file download path: s3
     */
    RuleBlockType["spaceEventInsurance"] = "space_event:insurance";
})(RuleBlockType || (RuleBlockType = {}));
export var RuleBlockContentDivider;
(function (RuleBlockContentDivider) {
    RuleBlockContentDivider["array"] = ";";
    RuleBlockContentDivider["type"] = "^";
    RuleBlockContentDivider["time"] = "-";
    RuleBlockContentDivider["operator"] = ":";
})(RuleBlockContentDivider || (RuleBlockContentDivider = {}));
export var NoiseLevel;
(function (NoiseLevel) {
    NoiseLevel["high"] = "high";
    NoiseLevel["medium"] = "medium";
    NoiseLevel["low"] = "low";
})(NoiseLevel || (NoiseLevel = {}));
export var SpaceEventAccessType;
(function (SpaceEventAccessType) {
    SpaceEventAccessType["publicFree"] = "public:free";
    SpaceEventAccessType["publicPaid"] = "public:paid";
    SpaceEventAccessType["privateFree"] = "private:free";
    SpaceEventAccessType["privatePaid"] = "private:paid";
})(SpaceEventAccessType || (SpaceEventAccessType = {}));
export var SpaceEquipmentType;
(function (SpaceEquipmentType) {
    //Facilitiy
    SpaceEquipmentType["facility"] = "facility";
    //Non Facilitiy
    SpaceEquipmentType["general"] = "general";
    SpaceEquipmentType["audio"] = "audio";
    SpaceEquipmentType["video"] = "video";
    SpaceEquipmentType["lighting"] = "lighting";
    SpaceEquipmentType["stationery"] = "stationery";
    SpaceEquipmentType["furniture"] = "furniture";
    SpaceEquipmentType["sports"] = "sports";
    SpaceEquipmentType["kitchen"] = "kitchen";
    SpaceEquipmentType["craft"] = "craft";
    SpaceEquipmentType["safety"] = "safety";
    SpaceEquipmentType["computer"] = "computer";
})(SpaceEquipmentType || (SpaceEquipmentType = {}));
export var PermissionRequestStatus;
(function (PermissionRequestStatus) {
    // created
    PermissionRequestStatus["pending"] = "pending";
    // assign permissioners
    PermissionRequestStatus["assigned"] = "assigned";
    PermissionRequestStatus["assignFailed"] = "assign_failed";
    // permissioner action results
    PermissionRequestStatus["reviewApproved"] = "review_approved";
    PermissionRequestStatus["reviewApprovedWithCondition"] = "review_approved_with_condition";
    PermissionRequestStatus["reviewRejected"] = "review_rejected";
})(PermissionRequestStatus || (PermissionRequestStatus = {}));
export var PermissionRequestResolveStatus;
(function (PermissionRequestResolveStatus) {
    PermissionRequestResolveStatus["resolveRejected"] = "resolve_rejected";
    // resolved by event organizer
    PermissionRequestResolveStatus["resolveAccepted"] = "resolve_accepted";
    PermissionRequestResolveStatus["resolveDropped"] = "resolve_dropped";
    PermissionRequestResolveStatus["resolveCancelled"] = "resolve_cancelled";
})(PermissionRequestResolveStatus || (PermissionRequestResolveStatus = {}));
export var UserType;
(function (UserType) {
    UserType["individual"] = "individual";
    UserType["organization"] = "organization";
    UserType["government"] = "government";
})(UserType || (UserType = {}));
export var UserNotificationTarget;
(function (UserNotificationTarget) {
    UserNotificationTarget["spaceOwner"] = "space_owner";
    UserNotificationTarget["eventOrgnaizer"] = "event_orgnaizer";
    UserNotificationTarget["eventAttendee"] = "event_attendee";
    UserNotificationTarget["permissioner"] = "permissioner";
    UserNotificationTarget["topicFollower"] = "topic_follower";
    UserNotificationTarget["spaceFollower"] = "space_follower";
    UserNotificationTarget["ruleAuthor"] = "rule_author";
    UserNotificationTarget["general"] = "general";
})(UserNotificationTarget || (UserNotificationTarget = {}));
export var UserNotificationType;
(function (UserNotificationType) {
    UserNotificationType["internal"] = "internal";
    UserNotificationType["external"] = "external";
})(UserNotificationType || (UserNotificationType = {}));
export var UserNotificationStatus;
(function (UserNotificationStatus) {
    // notice created
    UserNotificationStatus["pending"] = "pending";
    // notice queued
    UserNotificationStatus["queued"] = "queued";
    // notice sent via email
    UserNotificationStatus["noticeSent"] = "notice_sent";
    // notice delivered via email
    UserNotificationStatus["noticeComplete"] = "notice_complete";
    // user marked as complete
    UserNotificationStatus["complete"] = "complete";
    // send notice failed
    UserNotificationStatus["noticeFailed"] = "notice_failed";
})(UserNotificationStatus || (UserNotificationStatus = {}));
export var UserNotificationTemplateName;
(function (UserNotificationTemplateName) {
    /**
     * <Welcome>
     * Greet a new user
     * Tell them who we are and what the Permissioning Engine is
     * Lead them to how-to guides
     */
    UserNotificationTemplateName["welcome"] = "welcome";
    /**
     * <Permission request for event created>
     * Inform the event organizer when permission request is created for the event
     * Provide a link to event dashboard
     */
    UserNotificationTemplateName["spaceEventPermissionRequestCreated"] = "space-event-permission-request-created";
    /**
     * <Permission for an event requested>
     * Inform the space permissioners when event permission request is created for the space
     * Provide a link to space permissioner dashboard that would show the form UI for making permission response
     */
    UserNotificationTemplateName["spaceEventPermissionRequested"] = "space-event-permission-requested";
    /**
     * <Permission for a space rule change request created>
     * Inform the permission requester when rule change permission request is created for the space
     */
    UserNotificationTemplateName["spaceRuleChangePermissionRequestCreated"] = "space-rule-change-permission-request-created";
    /**
     * <Permission for a space rule change requested>
     * Inform the space permissioners when rule change permission request is created for the space
     * Provide a link to space permissioner dashboard that would show the form UI for making permission response
     */
    UserNotificationTemplateName["spaceRuleChangePermissionRequested"] = "space-rule-change-permission-requested";
    /**
     * <Permission for a space rule change request Created>
     * Inform the permission requester when rule change permission request is created for the space
     */
    UserNotificationTemplateName["spaceEventRulePreApprovePermissionRequestCreated"] = "space-event-rule-pre-approve-permission-request-created";
    /**
     * <Permission for a space rule change requested>
     * Inform the space permissioners when rule change permission request is created for the space
     * Provide a link to space permissioner dashboard that would show the form UI for making permission response
     */
    UserNotificationTemplateName["spaceEventRulePreApprovePermissionRequested"] = "space-event-rule-pre-approve-permission-requested";
    /**
     * <Review for space event permission request is complete and approved>
     * Inform the permission requester(event organizer) when permission request review result is made and approved
     * Show permission response result summary
     * Tell the event organizer what to do
     * Provide a link to event dashboard for the event organizer to resolve the permission request
     */
    UserNotificationTemplateName["spaceEventPermissionRequestApproved"] = "space-event-permission-request-approved";
    /**
     * <Review for space event permission request is complete and rejected>
     * Inform the permission requester(event organizer) when permission request review result is made and rejected
     * Show permission response result summary
     * Tell the event organizer what to do
     * Provide a link to event dashboard for the event organizer to resolve the permission request
     */
    UserNotificationTemplateName["spaceEventPermissionRequestRejected"] = "space-event-permission-request-rejected";
    /**
     * <Review for space event permission request is complete>
     * Inform the space permissioners when permission request review result is made
     * Show permission response result summary
     */
    UserNotificationTemplateName["spaceEventPermissionRequestReviewCompleted"] = "space-event-permission-request-review-completed";
    /**
     * <Review for space rule change permission request is complete and approved>
     * Inform the permission requester(rule change proposer) when permission request review result is made and approved
     * Show permission response result summary
     * Tell the rule change proposer what to do
     */
    UserNotificationTemplateName["spaceRuleChangePermissionRequestApproved"] = "space-rule-change-permission-request-approved";
    /**
     * <Review for space rule change permission request is complete and rejected>
     * Inform the permission requester(rule change proposer) when permission request review result is made and rejected
     * Show permission response result summary
     * Tell the rule change proposer what to do
     */
    UserNotificationTemplateName["spaceRuleChangePermissionRequestRejected"] = "space-rule-change-permission-request-rejected";
    /**
     * <Review for space rule change permission request is complete>
     * Inform the space permissioners when permission request review result is made
     * Show permission response result summary
     */
    UserNotificationTemplateName["spaceRuleChangePermissionRequestReviewCompleted"] = "space-rule-change-permission-request-review-completed";
    /**
     * <Review for space event rule pre approval permission request is complete and approved>
     * Inform the permission requester(space event rule pre approval proposer) when permission request review result is made and approved
     * Show permission response result summary
     * Tell the space event rule pre approval proposer what to do
     */
    UserNotificationTemplateName["spaceEventPreApprovePermissionRequestApproved"] = "space-event-pre-approve-permission-request-approved";
    /**
     * <Review for space event rule pre approval permission request is complete and rejected>
     * Inform the permission requester(space event rule pre approval proposer) when permission request review result is made and rejected
     * Show permission response result summary
     * Tell the space event rule pre approval proposer what to do
     */
    UserNotificationTemplateName["spaceEventPreApprovePermissionRequestRejected"] = "space-event-pre-approve-permission-request-rejected";
    /**
     * <Review for space event rule pre approval permission request is complete>
     * Inform the space permissioners when permission request review result is made
     * Show permission response result summary
     */
    UserNotificationTemplateName["spaceEventPreApprovePermissionRequestReviewCompleted"] = "space-event-pre-approve-permission-request-review-completed";
    /**
     * <Permission request for space event is resolved to accepted>
     * Inform the permission requester(event organizer) and space permissioners when permission request is resolved by the event organizer to be accepted
     * Show resolve result summary
     * Provide the permission code for the event organizer <-> no permissio ncode for rule change proposer
     * Provide a link to external booking service that the event organizer can paste the permission code and proceed with booking
     */
    UserNotificationTemplateName["spaceEventPermissionRequestResolveAccepted"] = "space-event-permission-request-resolve-accepted";
    /**
     * <Permission request for space event is resolved to dropped>
     * Inform the permission requester(event organizer) and space permissioners when permission request is resolved by the event organizer to be dropped
     * Show resolve result summary
     * Provide the permission code for the event organizer <-> no permissio ncode for rule change proposer
     * Provide a link to external booking service that the event organizer can paste the permission code and proceed with booking
     */
    UserNotificationTemplateName["spaceEventPermissionRequestResolveDropped"] = "space-event-permission-request-resolve-dropped";
    /**
     * <Permission request for space event is resolved to cancelled>
     * Inform the permission requester(event organizer) and space permissioners when permission request is resolved by the event organizer to be cancelled
     * Show resolve result summary
     * Provide the permission code for the event organizer <-> no permissio ncode for rule change proposer
     * Provide a link to external booking service that the event organizer can paste the permission code and proceed with booking
     */
    UserNotificationTemplateName["spaceEventPermissionRequestResolveCancelled"] = "space-event-permission-request-resolve-cancelled";
    /**
     * <Space is created>
     * Inform the space owner when space is created
     * Tell them what to do next: invite space permissioners
     * Provide a link to space dashboard that the space owner can invite other space permissioners
     */
    UserNotificationTemplateName["spaceCreated"] = "space-created";
    /**
     * <Space is updated>
     * Inform the space permissioners when space data is updated
     * Show resolve result summary
     * Provide a link to external booking service that the event organizer can paste the permission code and proceed with booking
     */
    UserNotificationTemplateName["spaceUpdated"] = "space-updated";
    /**
     * <Event is created>
     * Inform the event organizer when event is created
     * Tell them what to do next: request for permission
     * Provide a link to event dashboard to proceed
     */
    UserNotificationTemplateName["spaceEventCreated"] = "space-event-created";
    /**
     * <Event is started>
     * Inform the event organizer and space permissioners when the event is started
     * Tell them what to do next: event complete process
     * Provide a link to space/event dashboard to proceed
     */
    UserNotificationTemplateName["spaceEventStarted"] = "space-event-started";
    /**
     * <Event is closed>
     * Inform the event organizer when the event is closed
     *  Tell them what to do next: event complete process
     * Provide a link to space/event dashboard
     */
    UserNotificationTemplateName["spaceEventClosed"] = "space-event-closed";
    /**
     * <Event is completed>
     * Inform the event organizer and space permissioners when the event is completed
     * Show event completion result
     * Provide a link to space/event dashboard
     */
    UserNotificationTemplateName["spaceEventCompleted"] = "space-event-completed";
    /**
     * <Event is completed>
     * Inform the event organizer and space permissioners when the event is completed with issue
     * Show event completion result
     * Tell them what to do next: resolve the issue
     * Provide a link to space/event dashboard to proceed
     */
    UserNotificationTemplateName["spaceEventCompletedWithIssue"] = "space-event-completed-with-issue";
    /**
     * <Event issue is resolved>
     * Inform the event organizer and space permissioners when the issue raised by the event is resolved
     * Show issue resolve result
     * Provide a link to space/event dashboard to proceed
     */
    UserNotificationTemplateName["spaceEventIssueResolved"] = "space-event-issue-resolved";
    /**
     * <Space issue is raised>
     * Inform the space permissioners when the issue raised on the space
     * Tell them what to do next: resolve the issue
     * Show issue details
     * Provide a link to space dashboard to proceed
     */
    UserNotificationTemplateName["spaceIssueRaised"] = "space-issue-raised";
    /**
     * <Space issue is resolved>
     * Inform the space permissioners when the issue raised on the space is resolved
     * Show resolve details
     * Provide a link to space dashboard
     */
    UserNotificationTemplateName["spaceIssueResolved"] = "space-issue-resolved";
    /**
     * <Rule is created>
     * Inform the rule author when the rule is created
     * Show rule details
     * Provide a link to rule dashboard
     */
    UserNotificationTemplateName["ruleCreated"] = "rule-created";
    /**
     * <Rule is created>
     * Inform the rule author when the rule is assigned to space or event
     * Show space/event details
     * Provide a link to rule dashboard
     */
    UserNotificationTemplateName["ruleAssigned"] = "rule-assigned";
})(UserNotificationTemplateName || (UserNotificationTemplateName = {}));
export var RuleType;
(function (RuleType) {
    RuleType["space"] = "space";
    RuleType["spaceEvent"] = "space_event";
})(RuleType || (RuleType = {}));
export var PermissionResponseStatus;
(function (PermissionResponseStatus) {
    PermissionResponseStatus["pending"] = "pending";
    PermissionResponseStatus["approved"] = "approved";
    PermissionResponseStatus["approvedWithCondition"] = "approved_with_condition";
    PermissionResponseStatus["rejected"] = "rejected";
    PermissionResponseStatus["abstention"] = "abstention";
    PermissionResponseStatus["timeout"] = "timeout";
})(PermissionResponseStatus || (PermissionResponseStatus = {}));
export var Language;
(function (Language) {
    Language["en"] = "en";
    Language["ko"] = "ko";
})(Language || (Language = {}));
export var PermissionRequestTarget;
(function (PermissionRequestTarget) {
    PermissionRequestTarget["spaceEvent"] = "space-event";
    PermissionRequestTarget["spaceRule"] = "space-rule";
    PermissionRequestTarget["spaceEventRulePreApprove"] = "space-event-rule-pre-approve";
})(PermissionRequestTarget || (PermissionRequestTarget = {}));
export var PermissionProcessType;
(function (PermissionProcessType) {
    PermissionProcessType["spaceEventPermissionRequestCreated"] = "space-event-permission-request-created";
    PermissionProcessType["spaceRuleChangePermissionRequestCreated"] = "space-rule-change-permission-request-created";
    PermissionProcessType["spaceEventRulePreApprovePermissionRequestCreated"] = "space-event-rule-pre-approve-permission-request-created";
    PermissionProcessType["permissionResponseReviewed"] = "permission-response-reviewed";
    PermissionProcessType["permissionResponseReviewCompleted"] = "permission-response-review-completed";
    PermissionProcessType["permissionRequestResolved"] = "permission-request-resolved";
})(PermissionProcessType || (PermissionProcessType = {}));
export var SpaceEventReportQuestion;
(function (SpaceEventReportQuestion) {
    SpaceEventReportQuestion["spaceSuitability"] = "On a scale of 1-10, how would you rate the space in terms of suitability for your event? (e.g., layout, facilities, accessibility)";
    SpaceEventReportQuestion["spaceSatisfaction"] = "On a scale of 1-10, how satisfied were you with the overall experience of organizing your event in this space?";
    SpaceEventReportQuestion["eventGoal"] = "What were the key goals or objectives of your event? Were they achieved?";
    SpaceEventReportQuestion["spaceIssue"] = "Were there any issues with the space that needed fixing before or during the event? How were these resolved?";
    SpaceEventReportQuestion["spaceSuggestions"] = "Do you have any suggestions or recommendations to improve the space or the event proposal process?";
})(SpaceEventReportQuestion || (SpaceEventReportQuestion = {}));
export var SpaceHistoryType;
(function (SpaceHistoryType) {
    SpaceHistoryType["create"] = "create";
    SpaceHistoryType["update"] = "update";
    SpaceHistoryType["permissionerJoin"] = "permissioner_join";
    SpaceHistoryType["permissionerLeave"] = "permissioner_leave";
    SpaceHistoryType["permissionRequest"] = "permission_request";
    SpaceHistoryType["permissionRequestResolve"] = "permission_request_resolve";
    SpaceHistoryType["spaceEventStart"] = "space_event_start";
    SpaceHistoryType["spaceEventClose"] = "space_event_close";
    SpaceHistoryType["spaceEventComplete"] = "space_event_complete";
    SpaceHistoryType["spaceEventCompleteWithIssue"] = "space_event_complete_with_issue";
    SpaceHistoryType["spaceEventCompleteWithIssueResolve"] = "space_event_complete_with_issue_resolve";
    SpaceHistoryType["spaceIssue"] = "space_issue";
    SpaceHistoryType["spaceIssueResolve"] = "space_issue_resolve";
})(SpaceHistoryType || (SpaceHistoryType = {}));
export var SpaceImageType;
(function (SpaceImageType) {
    SpaceImageType["list"] = "list";
    SpaceImageType["thumbnail"] = "thumbnail";
    SpaceImageType["cover"] = "cover";
})(SpaceImageType || (SpaceImageType = {}));
export var SpaceEventImageType;
(function (SpaceEventImageType) {
    SpaceEventImageType["list"] = "list";
    SpaceEventImageType["thumbnail"] = "thumbnail";
    SpaceEventImageType["cover"] = "cover";
})(SpaceEventImageType || (SpaceEventImageType = {}));
/**
 * @typedef {Object} SesMail
 * @property {string} timestamp
 * @property {string} messageId
 * @property {string} source
 * @property {string} sourceArn
 * @property {string} sourceIp
 * @property {string} sendingAccountId
 * @property {string} callerIdentity
 * @property {string[]} destination
 * @property {boolean} headersTruncated
 * @property {SesMailHeader[]} headers
 * @property {SesMailCommonHeaders} commonHeaders
 */
/**
 * @typedef {Object} SesMailHeader
 * @property {string} name
 * @property {string} value
 */
/**
 * @typedef {Object} SesMailCommonHeaders
 * @property {string[]} from
 * @property {string} date
 * @property {string[]} to
 * @property {string} messageId
 * @property {string} subject
 */
/**
 * @typedef {Object} SesBounce
 * @property {SesBounceType} bounceType
 * @property {SesBounceSubType} bounceSubType
 * @property {SesBounceRecipient[]} bounceRecipients
 * @property {string} timestamp
 * @property {string} feedbackId
 * @property {string} [remoteMtaIp]
 * @property {string} [reportingMTA]
 */
/**
 * @typedef {Object} SesBounceRecipient
 * @property {string} [status]
 * @property {string} [action]
 * @property {string} [diagnosticCode]
 * @property {string} emailAddress
 */
/**
 * @typedef {Object} SesComplaint
 * @property {SesComplainedRecipients[]} complainedRecipients
 * @property {string} timestamp
 * @property {string} feedbackId
 * @property {string} complaintSubType
 * @property {string} [userAgent]
 * @property {SesComplaintFeedbackType} [complaintFeedbackType]
 * @property {string} [arrivalDate]
 */
/**
 * @typedef {Object} SesComplainedRecipients
 * @property {string} emailAddress
 */
/**
 * @typedef {Object} SesDelivery
 * @property {string} timestamp
 * @property {number} processingTimeMillis
 * @property {string[]} recipients
 * @property {string} smtpResponse
 * @property {string} reportingMTA
 * @property {string} remoteMtaIp
 */
/**
 * @typedef {Object} NotificationHandlerJobData
 * @property {string} userNotificationId
 * @property {string} to
 * @property {EmailTemplate} email
 */
/**
 * @typedef {Object} PermissionHandlerJobData
 * @property {PermissionProcessType} permissionProcessType
 * @property {string} [permissionRequestId]
 * @property {string} [permissionResponseId]
 */
/**
 * @typedef {Object} SpaceAvailability
 * @property {Date} startTime
 * @property {Date} endTime
 */
/**
 * @typedef {Object} IpLocationInfo
 * @property {string} status
 * @property {string} country
 * @property {string} countryCode
 * @property {string} region
 * @property {string} regionName
 * @property {string} city
 * @property {string} zip
 * @property {number} lat
 * @property {number} lon
 * @property {string} timezone
 * @property {string} isp
 * @property {string} org
 * @property {string} as
 * @property {string} query
 */
/**
 * @typedef {Object} SpaceEventReport
 * @property {number} spaceSuitability
 * @property {number} spaceSatisfaction
 * @property {string} eventGoal
 * @property {string} spaceIssue
 * @property {string} spaceSuggestions
 */
