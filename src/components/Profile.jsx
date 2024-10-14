import { useUser } from "../UserContext";
export default function Profile() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="px-8 pt-8">
      <h1 className="text-2xl font-bold text-black">Profile Page</h1>
      {user ? (
        <>
          <img
            className="h-120 w-120 flex-none rounded-full bg-gray-50"
            src={user.picture}
          ></img>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </>
      ) : (
        <p>Please log in to see your profile information.</p>
      )}
    </div>
  );
}
