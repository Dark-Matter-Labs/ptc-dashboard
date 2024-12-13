import { Button } from "@headlessui/react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import "../../assets/css/Report.css";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/solid";
import { MusicNoteIcon } from "@heroicons/react/solid";
import { BookOpenIcon } from "@heroicons/react/solid";
import { FireIcon } from "@heroicons/react/solid";
import { SparklesIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ApiClient, SpaceHistoryAPI } from "@dark-matter-labs/ptc-sdk";
import BottomDrawerSpaceIssueReport from "../../components/Common/BottomDrawerSpaceIssueReport";

export default function Report({ space }) {
  const { t } = useTranslation();
  const apiClient = new ApiClient();
  const spaceHistoryAPI = new SpaceHistoryAPI(apiClient);
  const [issues, setIssues] = useState([]);
  const [isIssueReportBottonDrawerOpen, setIsIssueReportBottonDrawerOpen] =
    useState(false);

  const fetchIssues = async () => {
    try {
      const unresolvedIssues = await spaceHistoryAPI.findAllUnresolvedIssue({
        spaceId: space.id,
      });

      setIssues(unresolvedIssues?.data);
    } catch (error) {
      console.error(`Failed to fetch issues`, error);
    }
  };
  const generateIssueTag = (issue) => {
    const { children } = issue;
    let tag = <div className="card-tail">Volunteer to resolve</div>;

    if (children.length > 0) {
      console.log("children", children);
      tag = <div className="card-tail being-resolved">Being resolved</div>;
    }

    return tag;
  };

  const handleIssueReport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsIssueReportBottonDrawerOpen(true);
  };

  useEffect(() => {
    if (space) {
      fetchIssues();
    }
  }, [space]);

  return (
    <section className="space-report">
      <div className="issue-report">
        <div className="disclosure">
          <Disclosure>
            <DisclosureButton className="group header">
              <div className="title">{t("space.issue-report")}</div>
              <div className="chev">
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="panel">
              {issues?.map((spaceHistory) => (
                <div key={spaceHistory.id} className="card">
                  <div className="card-header">
                    <BellIcon className="h-6 w-6"></BellIcon>
                  </div>
                  <div className="card-content">
                    <div className="content-title">{spaceHistory.title}</div>
                    <div className="content-description">
                      {spaceHistory.details}
                    </div>
                  </div>
                  {generateIssueTag(spaceHistory)}
                </div>
              ))}
              <Button
                className="issue-report-button"
                onClick={handleIssueReport}
              >
                Report an issue
              </Button>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
      <div className="permission-statistics">
        <div className="disclosure">
          <Disclosure>
            <DisclosureButton className="group header">
              <div className="title">{t("space.permission-statistics")}</div>
              <div className="chev">
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="panel overflow-x-scroll">
              <div className="title">Number of permissions</div>
              <div className="flex space-x-1">
                <div className="card bg-emerald-400">
                  <div className="card-header">Permissions granted</div>
                  <div className="card-content">25</div>
                </div>
                <div className="card bg-slate-300">
                  <div className="card-header">Permissions requested</div>
                  <div className="card-content">49</div>
                </div>
              </div>
              <div className="title">Permissioning group</div>
              <div className="flex">
                <div className="card bg-slate-300">
                  <div className="card-header">Permissions granted</div>
                  <div className="card-content">25</div>
                </div>
                <div className="card bg-emerald-400">
                  <div className="card-header">Permissions requested</div>
                  <div className="card-content">49</div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
      <div className="interest-category">
        <div className="disclosure">
          <Disclosure>
            <DisclosureButton className="group header">
              <div className="title">{t("space.interest-category")}</div>
              <div className="chev">
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="panel">
              <div className="card">
                <div className="card-header bg-purple-200">
                  <MusicNoteIcon className="h-6 w-6 text-purple-600"></MusicNoteIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Music</div>
                  <div className="content-description">35 Times</div>
                </div>
                <div className="card-tail">205 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-orange-200">
                  <BookOpenIcon className="h-6 w-6 text-orange-600"></BookOpenIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Books</div>
                  <div className="content-description">27 Times</div>
                </div>
                <div className="card-tail">131 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-green-200">
                  <FireIcon className="h-6 w-6 text-green-600"></FireIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Cooking</div>
                  <div className="content-description">19 Times</div>
                </div>
                <div className="card-tail">120 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-pink-200">
                  <SparklesIcon className="h-6 w-6 text-pink-600"></SparklesIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Party</div>
                  <div className="content-description">12 Times</div>
                </div>
                <div className="card-tail">92 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-blue-200">
                  <SunIcon className="h-6 w-6 text-blue-600"></SunIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Meditation</div>
                  <div className="content-description">8 Times</div>
                </div>
                <div className="card-tail">76 members</div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div className="w-full h-0">
          {isIssueReportBottonDrawerOpen ? (
            <BottomDrawerSpaceIssueReport
              space={space}
              isIssueReportBottonDrawerOpen={isIssueReportBottonDrawerOpen}
              setIsIssueReportBottonDrawerOpen={
                setIsIssueReportBottonDrawerOpen
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

Report.propTypes = {
  space: PropTypes.object,
  permissionEngineAPI: PropTypes.object,
};
