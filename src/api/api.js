// src/api/api.js

// Fetch all rules with target=space_event 
export const fetchAllSpaceEventRules = async () => {
    const response = await fetch("/api/v1/rule?target=space_event", {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching rules");
    }
    const data = await response.json();
    return data.data;
};


// Fetch topics by rule id
export const fetchTopicsByRuleId = async (ruleId) => {
    // console.log("Fetching topics: ", ruleId);
    const response = await fetch(`/api/v1/rule/${ruleId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching topics");
    }
    const data = await response.json();
    const topicNames = data.topics.map(t => t.name);
    return topicNames;
};

export const fetchSpaceRulesByRelevance = async (spaceId, selectedTopics) => {
    if (selectedTopics.length == 0) {
        console.log("No selected topics, return null");
        return null;
    }
    const topicIdsQuery = selectedTopics.map((id) => `topicIds=${id}`).join('&');;
    console.log(topicIdsQuery);
    const response = await fetch(`/api/v1/space/approved-rule?spaceId=${spaceId}&${topicIdsQuery}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching relevant rules");
    }
    const data = await response.json();
    return data.data;
}

export const fetchSpaceRules = async (spaceId) => {
    const response = await fetch(`/api/v1/space/approved-rule?spaceId=${spaceId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching space rules");
    }
    const data = await response.json();
    return data.data;
};

export const fetchSpaceRuleBlocksBySpaceRuleId = async (spaceRuleId) => {
    const response = await fetch(`/api/v1/rule/${spaceRuleId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching space ruleblocks");
    }
    const data = await response.json();
    return data.ruleBlocks;
};

export const fetchEventRuleBlocksByEventRuleId = async (eventRuleId) => {
    const response = await fetch(`/api/v1/rule/${eventRuleId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching space ruleblocks");
    }
    const data = await response.json();
    return data.ruleBlocks;
};

export const fetchSpaceRulesSortBy = async (spaceId, sortBy) => {
    const response = await fetch(`/api/v1/space/approved-rule?spaceId=${spaceId}&sortBy=${sortBy}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching space rules");
    }
    const data = await response.json();
    return data.data;
};

// Fetch topics
export const fetchTopics = async () => {
    const response = await fetch("/api/v1/topic", { credentials: "include" });
    if (!response.ok) {
        throw new Error("Error fetching topics");
    }
    const data = await response.json();
    return data.data;
};


// Fetch avaiabilities of a space

export const fetchAvailability = async (spaceId) => {

    const response = await fetch(`/api/v1/space/${spaceId}/availability`, { credentials: "include" });
    if (!response.ok) {
        throw new Error("Error fetching availability");
    }
    const data = await response.json();
    // console.log("fetch availability from api: ", data);
    return data.data;
}

// Fetch a space
export const fetchSpace = async () => {
    const response = await fetch("/api/v1/space", { credentials: "include" });
    if (!response.ok) {
        throw new Error("Error fetching spaces");
    }
    const data = await response.json();
    //returnt the first space
    return data[0];
}

// Fetch equipment of a space
export const fetchEquipment = async (spaceId) => {
    const response = await fetch(`/api/v1/space/equipment?spaceId=${spaceId}`, { credentials: "include" });
    if (!response.ok) {
        throw new Error("Error fetching equipment" + `/api/v1/space/equipment?spaceId=${spaceId}`);
    }
    const data = await response.json();
    return data.data;
}


