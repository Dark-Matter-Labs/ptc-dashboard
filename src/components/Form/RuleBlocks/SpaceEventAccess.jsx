import { useState } from "react";
const eventTypes = [
  {
    title: "Public Free Event",
    description: "Free and open to everyone",
    imageUrl:
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Public Paid Event",
    description: "Anyone can buy tickets",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664298449164-c5355bd3b328?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Private Free Event",
    description: "Invitation only.",
    imageUrl:
      "https://images.unsplash.com/photo-1621857093087-7daa85ab14a6?q=80&w=2390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Private Paid Event",
    description: "Only invited can buy tickets.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const SpaceEventAccess = () => {
  const [selectedEventType, setSelectedEventType] = useState(null);

  return (
    <div className="text-left">
      <hr className="my-6" />
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Event type</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((eventType, index) => (
            <div
              key={index}
              className={`flex border rounded-lg cursor-pointer transition duration-200 hover:shadow-lg ${
                selectedEventType === index
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedEventType(index)}
            >
              <img
                src={eventType.imageUrl}
                alt={eventType.title}
                className="w-1/3 h-auto object-cover rounded-l-lg"
              />
              <div className="w-2/3 p-4">
                <h3 className="text-lg font-bold">{eventType.title}</h3>
                <p className="text-gray-600">{eventType.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
