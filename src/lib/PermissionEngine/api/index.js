export class API {
  constructor(baseURL = "/api/v1/") {
    this.baseURL = baseURL;
  }

  /**
   * @typedef {Object} PaginationOption
   * @property {number} page - Page of the list.
   * @property {number} limit - Length limit of the list.
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

  fetchSpaceApprovedRulesByRelevance = async (spaceId, selectedTopics) => {
    if (!selectedTopics || selectedTopics.length === 0) {
      console.log("No selected topics, return empty array");
      return [];
    }

    const response = await this.get(
      "space/approved-rule",
      {},
      {
        spaceId,
        topicIds: selectedTopics.map((item) => item.id).join(","),
      }
    );

    return response?.data ?? [];
  };

  fetchSpaceApprovedRules = async (spaceId) => {
    const response = await this.get("space/approved-rule", {}, { spaceId });

    return response?.data ?? [];
  };

  fetchSpaceRuleBlocksBySpaceRuleId = async (spaceRuleId) => {
    const response = await this.get("rule/:spaceRuleId", { spaceRuleId });

    return response?.data?.ruleBlocks ?? [];
  };

  fetchEventRuleBlocksByEventRuleId = async (eventRuleId) => {
    const response = await this.get("rule/:eventRuleId", { eventRuleId });

    return response?.data?.ruleBlocks ?? [];
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

  fetchTopicById = async (topicId) => {
    const response = await this.get("topic/:topicId", { topicId });

    return response;
  };

  // Fetch avaiabilities of a space
  fetchAvailability = async (spaceId) => {
    const response = await this.get("space/:spaceId/availability", {
      spaceId,
    });

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

    return response ?? [];
  };

  fetchSpaceRule = async (spaceId) => {
    const response = await this.get("space/:spaceId", {
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

  fetchPublicUserData = async (userId) => {
    const response = await this.get("user/:userId", {
      userId,
    });

    return response;
  };
}
