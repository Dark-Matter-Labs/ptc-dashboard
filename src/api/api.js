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


// Fetch avaiabilities of a space

export const fetchAvailability = async (spaceId) => {

    const response = await fetch(`/api/v1/space/${spaceId}/availability`, { credentials: "include" });
    if (!response.ok) {
        throw new Error("Error fetching availability");
    }
    const data = await response.json();
    console.log("fetch availability from api: ", data);
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