import { UserIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/outline";
import { Button } from "@headlessui/react";
import "../../assets/css/Space.css";
export default function Space() {
  return (
    <section className="space">
      <div className="space-data">
        <div className="space-image">
          {/* First, space image */}
          <img src="https://plus.unsplash.com/premium_photo-1670315264879-59cc6b15db5f?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          {/* Second, profile image */}
          <img src="https://images.unsplash.com/uploads/1411901100260f56b39b9/ab70b250?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
        </div>
        <div className="space-snippet">
          <h1>Berry Garden</h1>

          <div className="space-account">
            <UserIcon className="h-5 w-5 text-gray-800 mr-1" />
            Berrylover
          </div>
          <div className="space-desc">
            Simple description of the space and message from the space owner
          </div>
          <div className="space-connection">273 Connections</div>
          <h3>Space Keywords</h3>
          <Button className="tag">MUSIC ENVENTS</Button>
          <Button className="tag">COOKING</Button>
          <Button className="tag">SEMINAR</Button>
          <div className="space-call-to-action">
            <Button className="follow-button">
              <PlusIcon className="h-5 w-5 white mr-1"></PlusIcon>Follow
            </Button>
          </div>
        </div>
      </div>
      <div className="space-map">
        <div className="map-image">
          {/* Background, map image */}
          <img src="https://s3-alpha-sig.figma.com/img/ce5a/a60c/d6ae29c4c13e4f97cafddefd350823bc?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B-zt6UfWcGsi2gEV8PDGE3fCC~1CCYfIwKBVGz2AF~pIakb99sba1t6y4CvCGEMSk4UYAKQpsF0p5W~QWnZ8uzNRztkyN4TCLLlmRAnlZgaa-d5KtG~bwVHkRR8IPj-iM1SufApYPhT75eiLrVdU0wK8T4m8uDuboprrjwIRlhPk8zqm22eU9Vqa1udb1BfYT3vMaH6YIT--q9lew8ksGW4lgKl2oIFFaZKjv5F7p3OGEw4FmDjR8inCJZtCeyvLTmjhOTsvL~Nf2P52KpynZq-douBr3vRQ7vDm1XQw9VtevZUhOpiOTUJ4LnYoWroCP5F~SXpzrmRplSZMxjp0sQ__"></img>
          <div className="chip">
            {/* Forground, profile image */}
            <img src="https://images.unsplash.com/uploads/1411901100260f56b39b9/ab70b250?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            <div className="chip-content">
              <h1>berrygarden</h1>
              <div>88, Gongpyeong-ro, Jung-gu, Daegu</div>
            </div>
          </div>
        </div>
        <div className="map-snippet">
          <div className="registration-date">
            <CalendarIcon className="h-5 w-5 white mr-1 text-gray-400"></CalendarIcon>
            <b>Registration date</b>2024.09.23
          </div>
          <div className="space-owner">
            <UsersIcon className="h-5 w-5 white mr-1 text-gray-400"></UsersIcon>
            <b>Space owner</b>Daegu City
            <div className="tag">Government</div>
          </div>
          <hr></hr>
          <div className="address">
            <LocationMarkerIcon className="h-5 w-5 white mr-1 text-gray-400"></LocationMarkerIcon>
            What3words address
          </div>
          <div className="website">
            <LinkIcon className="h-5 w-5 white mr-1 text-gray-400"></LinkIcon>
            www.website.com
          </div>
        </div>
        <div className="map-call-to-action">
          <Button className="become-steward-button">Become a Steward</Button>
          <Button className="browse-rules-button">Browse Rules</Button>
        </div>
      </div>
    </section>
  );
}
