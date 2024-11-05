// src/api/api.js

// Fetch rules with target=space_event 
export const fetchSpaceEventRules = async () => {
    const response = await fetch("/api/v1/rule?target=space_event", {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching rules");
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
