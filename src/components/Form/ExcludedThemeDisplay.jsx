import { useEffect, useState } from "react";
import { fetchTopics } from "../../api/api";

const excludedTheme = [{ id: "0", name: "Policital Campaigns", icon: "📢" }];
export const ExcludedThemeDisplay = () => {
  const [topics, setTopics] = useState([]);

  const loadTopics = async () => {
    try {
      const data = await fetchTopics();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    console.log("topics: ", topics);
  }, [topics]);
  return (
    <div className="text-left">
      <div htmlFor="themes" className="block mb-2 font-semibold">
        Excluded themes
      </div>
      <div className="py-1 flex flex-wrap gap-2">
        {excludedTheme?.map((theme) => (
          <div
            key={theme.id}
            className="flex items-center border cursor-pointer px-4 py-2 rounded-full text-sm font-medium text-gray-500"
          >
            <div className="size-4 mr-1">{theme.icon}</div>
            <span>{theme.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
