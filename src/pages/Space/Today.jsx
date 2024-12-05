import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import "../../assets/css/Today.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import abbrTimezone from "dayjs-abbr-timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(abbrTimezone);

export default function Today({ timezone, todayEvents }) {
  const { t } = useTranslation();

  return (
    <div className="todaysEvent">
      <div className="disclosure">
        <Disclosure>
          <DisclosureButton className="group header">
            <div className="title">{t("space.today-events")}</div>
            <div className="chev">
              <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="panel">
            <div className="title">
              {dayjs().tz(timezone).format("DD MMMM YYYY")}
            </div>
            {todayEvents.map((event) => (
              <div key={event.id} className="card">
                <div className="header">
                  <div className="title">{event.name}</div>
                  <CogIcon className="h-5 w-5 white mr-1 text-gray-400"></CogIcon>
                </div>
                <div className="content">
                  <div className="flex">
                    <ClockIcon className="h-5 w-5 white mr-1 text-gray-400"></ClockIcon>
                    <div className="time">{dayjs(event.startsAt).tz(timezone).format('HH:mm')}-{dayjs(event.endsAt).tz(timezone).format('HH:mm')}</div>
                  </div>
                  <div className="participants">
                    <UserCircleIcon className="h-5 w-5 white mr-1 text-gray-400"></UserCircleIcon>
                  </div>
                </div>
              </div>
            ))}
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
}

Today.propTypes = {
  timezone: PropTypes.string,
  todayEvents: PropTypes.array,
};
