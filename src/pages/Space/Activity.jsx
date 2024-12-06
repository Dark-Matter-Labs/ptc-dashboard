import { useState, useEffect } from "react";
import "../../assets/css/Activity.css";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Today from "./Today";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import abbrTimezone from "dayjs-abbr-timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(abbrTimezone);

export default function Activity({ space, permissionEngineAPI }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const fetchUpcomingEvents = async (space) => {
    try {
      const upcomingEvents = await permissionEngineAPI.fetchEvents({
        page: 1,
        limit: 10,
        spaceId: space.id,
        startsAfter: dayjs().tz(space.timezone).toISOString(),
      });
      if (upcomingEvents) {
        setUpcomingEvents(upcomingEvents);
        const todayEvents = upcomingEvents.filter(
          (item) =>
            dayjs(item.startsAt).tz(space.timezone).format("YYYY-MM-DD") ===
            dayjs().tz(space.timezone).format("YYYY-MM-DD")
        );

        setTodayEvents(todayEvents);
      }
    } catch (error) {
      console.error(`Failed to fetch upcomingEvents`, error);
    }
  };

  const fetchPastEvents = async (space) => {
    try {
      const pastEvents = await permissionEngineAPI.fetchEvents({
        page: 1,
        limit: 10,
        spaceId: space.id,
        endsBefore: dayjs().tz(space.timezone).toISOString(),
      });
      if (pastEvents) {
        setPastEvents(pastEvents);
      }
    } catch (error) {
      console.error(`Failed to fetch pastEvents`, error);
    }
  };

  useEffect(() => {
    if (space?.id) {
      fetchUpcomingEvents(space);
      fetchPastEvents(space);
    }
  }, [space]);

  const gotoCreateEvent = () => {
    if (space) {
      navigate(`/event/new/${space?.id}`);
    }
  };

  return (
    <section className="space-availability">
      <div className="availability">
        <h1>{t("space.availability")}</h1>
        <div className="permissioning-container">
          <div className="permissioning">
            <h1>{t("space.availability")}</h1>
            <div>{t("space.available")}</div>
            <Button onClick={gotoCreateEvent} className="get-permission-button">
              {t("space.get-permission")}
            </Button>
          </div>
        </div>
        {todayEvents && todayEvents.length > 0 ? (
          <Today todayEvents={todayEvents} timezone={space?.timezone}></Today>
        ) : (
          ""
        )}
      </div>
      <div className="activity">
        <div className="upcoming-activity">
          <h1>{t("space.upcoming-events")}</h1>
          <div className="scroll-container">
            {" "}
            {upcomingEvents?.map((event) => (
              <div className="card" key={event.id}>
                <div className="card-image">
                  <img src={event.spaceEventImages?.[0]?.link}></img>
                </div>
                <div className="card-title">{event.name}</div>
                <div className="card-date">
                  {dayjs(event.startsAt)
                    .tz(space.timezone)
                    .format("YYYY-MM-DD")}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="past-activity">
          <h1>{t("space.past-events")}</h1>
          <div className="scroll-container">
            {pastEvents.map((event) => (
              <div key={event.id} className="card">
                <div className="card-image">
                  <img src={event.spaceEventImages?.[0]?.link}></img>
                </div>
                <div className="card-title">{event.name}</div>
                <div className="card-date">
                  {dayjs(event.startsAt)
                    .tz(space.timezone)
                    .format("YYYY-MM-DD")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
Activity.propTypes = {
  space: PropTypes.object,
  permissionEngineAPI: PropTypes.object,
};
