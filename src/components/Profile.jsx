import { useUser } from "../useUser";
import { useEffect } from "react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
export default function Profile() {
  const { user } = useUser();
  const { t } = useTranslation();
  console.log("user: ", user);
  useEffect(() => {
    if (!i18n) {
      console.error("i18n is not initialized");
    }
  }, []);

  return (
    <div className="px-8 pt-8">
      <h1>{t("home.follow-button")}</h1>
      <p>{t("home.availability")}</p>
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
