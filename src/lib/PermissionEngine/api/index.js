export class API {
  constructor(baseURL = "/api/v1/") {
    if (API.instance) {
      return API.instance;
    } else {
      this.baseURL = baseURL;
      API.instance = this;
    }
  }

  static getInstance() {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  }

  /**
   * @typedef {Object} PaginationOption
   * @property {number} page - Page of the list.
   * @property {number} limit - Length limit of the list.
   */

  /**
   * @typedef {Object} CreateRuleBlockBody
   * @property {string} name - RuleBlock name.
   * @property {string} type - RuleBlock type.
   * @property {string} content - RuleBlock content.
   * @property {string?} details - RuleBlock details.
   * @property {string?} file - RuleBlock file.
   */

  /**
   * @typedef {Object} CreateRuleBody
   * @property {string} name - Rule name.
   * @property {string?} parentRuleId - Rule parentRuleId.
   * @property {string} target - Rule target.
   * @property {string[]} ruleBlockIds - Rule ruleBlockIds.
   * @property {string[]?} topicIds - Rule topicIds.
   */

  /**
   * @typedef {Object} CreateSpaceEventBody
   * @property {string} name - Event name.
   * @property {string?} spaceId - Event spaceId.
   * @property {string?} ruleId - Event ruleId.
   * @property {string?} externalServiceId - Event externalServiceId.
   * @property {string?} details - Event details.
   * @property {string?} link - Event link.
   * @property {string?} callbackLink - Event callbackLink.
   * @property {string} duration - Event duration.
   * @property {string} startsAt - Event startsAt.
   * @property {string[]?} images - Event images.
   * @property {string[]?} topicIds - Event topicIds.
   */

  /**
   * @typedef {Object} CreateEventPermissionRequestBody
   * @property {string} spaceEventId - PermissionRequest spaceEventId.
   */

  /**
   * Constructs a query string from an object.
   * @param {Object} params - The query parameters as key-value pairs.
   * @returns {string} The query string.
   */
  buildQueryString(params = {}) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
    return queryString ? `?${queryString}` : "";
  }

  /**
   * GET request with dynamic path and query parameters.
   * @param {string} pathTemplate - The path template with placeholders for dynamic params, e.g., '/users/:id'.
   * @param {Object} pathParams - An object containing the dynamic path parameters, e.g., { id: 123 }.
   * @param {Object} queryParams - An object containing the query parameters, e.g., { sort: 'asc', page: 2 }.
   * @returns {Promise} The response from the API.
   */
  async get(pathTemplate, pathParams = {}, queryParams = {}) {
    // Replace placeholders in the path template with actual values
    const path = pathTemplate.replace(/:([a-zA-Z]+)/g, (_, key) =>
      encodeURIComponent(pathParams[key])
    );

    // Build the query string
    const queryString = this.buildQueryString(queryParams);

    // Construct the full URL
    const url = `${this.baseURL}${path}${queryString}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("GET request failed", error);
      throw error;
    }
  }

  /**
   * non-GET request that can handle both JSON and FormData.
   * @param {string} method - non-GET Http request method, e.g., 'POST', 'PUT'.
   * @param {string} pathTemplate - The path template with placeholders for dynamic params, e.g., '/users/:id'.
   * @param {Object} pathParams - An object containing the dynamic path parameters, e.g., { id: 123 }.
   * @param {Object|FormData} body - The request body, either a JSON object or FormData.
   * @param {Object} [queryParams] - An object containing optional query parameters, e.g., { sort: 'asc' }.
   * @returns {Promise} The response from the API.
   */
  async _nonGet(
    method = "POST",
    pathTemplate,
    pathParams = {},
    body = {},
    queryParams = {}
  ) {
    const path = pathTemplate.replace(/:([a-zA-Z]+)/g, (_, key) =>
      encodeURIComponent(pathParams[key])
    );
    const queryString = this.buildQueryString(queryParams);
    const url = `${this.baseURL}${path}${queryString}`;

    const isFormData = body instanceof FormData;

    try {
      const response = await fetch(url, {
        method: method,
        headers: isFormData
          ? {} // Let the browser set the Content-Type for FormData
          : { "Content-Type": "application/json" },
        body: isFormData ? body : JSON.stringify(body), // Send FormData directly or JSON string
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("POST request failed", error);
      throw error;
    }
  }

  /**
   * POST request that can handle both JSON and FormData.
   * @param {string} pathTemplate - The path template with placeholders for dynamic params, e.g., '/users/:id'.
   * @param {Object} pathParams - An object containing the dynamic path parameters, e.g., { id: 123 }.
   * @param {Object|FormData} body - The request body, either a JSON object or FormData.
   * @param {Object} [queryParams] - An object containing optional query parameters, e.g., { sort: 'asc' }.
   * @returns {Promise} The response from the API.
   */
  async post(pathTemplate, pathParams = {}, body = {}, queryParams = {}) {
    return await this._nonGet(
      "POST",
      pathTemplate,
      pathParams,
      body,
      queryParams
    );
  }

  /**
   * PUT request that can handle both JSON and FormData.
   * @param {string} pathTemplate - The path template with placeholders for dynamic params, e.g., '/users/:id'.
   * @param {Object} pathParams - An object containing the dynamic path parameters, e.g., { id: 123 }.
   * @param {Object|FormData} body - The request body, either a JSON object or FormData.
   * @param {Object} [queryParams] - An object containing optional query parameters, e.g., { sort: 'asc' }.
   * @returns {Promise} The response from the API.
   */
  async put(pathTemplate, pathParams = {}, body = {}, queryParams = {}) {
    return await this._nonGet(
      "PUT",
      pathTemplate,
      pathParams,
      body,
      queryParams
    );
  }

  // GET requests
  /**
   *
   * @param {PaginationOption} option
   * @returns Rule[]
   */
  fetchAllSpaceEventRules = async (option = { page: 1, limit: 10 }) => {
    const response = await this.get(
      "rule",
      {},
      { ...option, target: "space_event" }
    );

    return response?.data ?? [];
  };

  // Fetch topics by rule id
  fetchTopicsByRuleId = async (ruleId) => {
    const response = await this.get("topic/rule/:ruleId", { ruleId });

    return response?.data ?? [];
  };

  fetchSpaceApprovedRulesByRelevance = async (spaceId, topicIds) => {
    if (!topicIds || topicIds.length === 0) {
      console.log("No selected topics, return empty array");
      return [];
    }

    const response = await this.get(
      "space/approved-rule",
      {},
      {
        spaceId,
        topicIds: topicIds.join(","),
      }
    );

    return response?.data ?? [];
  };

  fetchSpaceApprovedRules = async (spaceId) => {
    const response = await this.get("space/approved-rule", {}, { spaceId });

    return response?.data ?? [];
  };

  fetchRuleBlocksByRuleId = async (ruleId) => {
    const response = await this.get("rule/block/:ruleId", { ruleId });

    return response?.ruleBlocks ?? [];
  };

  fetchRuleByRuleId = async (ruleId) => {
    const response = await this.get("rule/:ruleId", { ruleId });

    return response ?? [];
  };

  fetchSpaceApprovedRulesSortBy = async (spaceId, sortBy) => {
    const response = await this.get(
      "space/approved-rule",
      {},
      { spaceId, sortBy }
    );

    return response?.data ?? [];
  };

  /**
   *
   * @param {PaginationOption} option
   * @returns Topic[]
   */
  fetchTopics = async (option = { page: 1, limit: 10 }) => {
    const response = await this.get("topic", {}, option);

    return response?.data ?? [];
  };

  fetchSpaceAssignedTopics = async (option = { page: 1, limit: 10 }) => {
    const response = await this.get("topic/space", {}, option);

    return response?.data ?? [];
  };

  fetchTopicById = async (topicId) => {
    const response = await this.get("topic/:topicId", { topicId });

    return response;
  };

  // Fetch avaiabilities of a space
  fetchAvailability = async (spaceId, startDate = null, endDate = null) => {
    const response = await this.get(
      "space/:spaceId/availability",
      {
        spaceId,
      },
      {
        startDate,
        endDate,
      }
    );

    return response?.data ?? [];
  };

  // Fetch a space
  fetchSpace = async (spaceId) => {
    const response = await this.get("space/:spaceId", {
      spaceId,
    });

    return response;
  };

  fetchSpaces = async (option = { page: 1, limit: 10 }) => {
    const response = await this.get(
      "space",
      {},
      {
        ...option,
      }
    );

    return response?.data ?? [];
  };

  filterSpaceByTopics = async (topics) => {
    const topicIdsString = topics.map((topic) => `&topicIds=${topic}`).join("");
    console.log("topicIdsString: ", topicIdsString);
    const response = await this.get(`space/${topicIdsString}`);
    console.log("response filterSpaceByTopics(): ", response);
    return response;
  };

  fetchSpaceRule = async (spaceId) => {
    const response = await this.get("rule/space/:spaceId", {
      spaceId,
    });

    return response;
  };

  fetchRuleBlockByHash = async (hash) => {
    const response = await this.get("rule/block/hash/:hash", {
      hash,
    });

    return response;
  };

  /**
   *
   * @param {PaginationOption} option
   * @returns SpaceEquipment[]
   */
  fetchEquipment = async (spaceId, option = { page: 1, limit: 10 }) => {
    const response = await this.get(
      "space/equipment",
      {},
      {
        spaceId,
        ...option,
      }
    );

    return response?.data ?? [];
  };

  fetchEquipmentById = async (spaceEquipmentId) => {
    const response = await this.get("space/equipment/:spaceEquipmentId", {
      spaceEquipmentId,
    });

    return response;
  };

  fetchEvents = async (option = { page: 1, limit: 10 }) => {
    const response = await this.get("event", {}, option);

    return response?.data ?? [];
  };

  fetchEventById = async (eventId) => {
    const response = await this.get("event/:eventId", {
      eventId,
    });

    return response;
  };

  fetchAssignedEvent = async (spaceId) => {
    const response = await this.get(
      `permission/request?spaceId=${spaceId}&statuses=assigned`
    );
    return response?.data ?? [];
  };

  fetchPublicUserData = async (userId) => {
    const response = await this.get("user/:userId", {
      userId,
    });

    return response;
  };

  fetchMe = async () => {
    const response = await this.get("user/me");

    return response;
  };

  fetchNotification = async (option = { page: 1, limit: 10 }) => {
    const response = await this.get("user/notification", {}, option);

    return response?.data ?? [];
  };

  fetchAllSpaceIssue = async (spaceId, option = { page: 1, limit: 10 }) => {
    const response = await this.get(
      "space/history/issue",
      {},
      {
        spaceId,
        ...option,
      }
    );

    return response?.data ?? [];
  };

  fetchUnresolvedSpaceIssue = async (
    spaceId,
    option = { page: 1, limit: 10 }
  ) => {
    const response = await this.get(
      "space/history/issue/unresolved",
      {},
      {
        spaceId,
        ...option,
      }
    );

    return response?.data ?? [];
  };

  // POST requests
  updateNotificationToComplete = async (userNotificationId) => {
    const response = await this.put("user/notification/:userNotificationId", {
      userNotificationId,
    });

    return response;
  };

  /**
   *
   * @param {CreateRuleBlockBody} body
   * @returns RuleBlock
   */
  createRuleBlock = async (body) => {
    const { name, type, content, details, file } = body;
    const formData = new FormData();

    if (type) {
      formData.append("type", type);
    }

    if (name) {
      formData.append("name", name);
    }

    if (content) {
      formData.append("content", content);
    }

    if (details) {
      formData.append("details", details);
    }

    if (file) {
      formData.append("files", [file]);
    }

    const response = await this.post("rule/block", {}, formData);

    return response;
  };

  /**
   *
   * @param {CreateRuleBody} body
   * @returns
   */
  createRule = async (body) => {
    const response = await this.post("rule", {}, body);

    return response;
  };

  /**
   *
   * @param {CreateSpaceEventBody} body
   * @returns
   */
  createSpaceEvent = async (body) => {
    const {
      name,
      spaceId,
      ruleId,
      externalServiceId,
      details,
      link,
      callbackLink,
      duration,
      startsAt,
      images,
      topicIds,
    } = body;
    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }

    if (spaceId) {
      formData.append("spaceId", spaceId);
    }

    if (ruleId) {
      formData.append("ruleId", ruleId);
    }

    if (externalServiceId) {
      formData.append("externalServiceId", externalServiceId);
    }

    if (details) {
      formData.append("details", details);
    }

    if (link) {
      formData.append("link", link);
    }

    if (callbackLink) {
      formData.append("callbackLink", callbackLink);
    }

    if (duration) {
      formData.append("duration", duration);
    }

    if (startsAt) {
      formData.append("startsAt", startsAt);
    }

    if (images) {
      formData.append("images", images);
    }

    if (topicIds) {
      formData.append("topicIds", topicIds);
    }

    const response = await this.post("event", {}, body);

    return response;
  };

  /**
   *
   * @param {CreateEventPermissionRequestBody} body
   * @returns
   */
  createEventPermissionRequest = async (body) => {
    const response = await this.post("permission/request/event", {}, body);

    return response?.data?.permissionRequest;
  };
}
