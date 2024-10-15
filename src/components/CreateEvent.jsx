import { useUser } from "../UserContext";
// import { useState, useEffect } from "react";
export default function CreateEvent() {
  const { user } = useUser();

  return (
    <div className="px-8 pt-8">
      <h1 className="text-2xl font-bold text-black">Create Event</h1>
      {user ? (
        <>hi {user.name}</>
      ) : (
        // user is not logged in
        <p>Please log in.</p>
      )}
    </div>
  );
}
