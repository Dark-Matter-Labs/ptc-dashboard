import { useState, useEffect } from "react";
import "../assets/css/Activity.css";
import { Button } from "@headlessui/react";
import Today from "./Today";
export default function Activity() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEvents(data);
      });
  }, []);
  return (
    <section className="home-availability">
      <div className="availability">
        <h1>Availability</h1>
        <div className="permissioning-container">
          <div className="permissioning">
            <h1>Availability</h1>
            <div>Available to register for activities</div>
            <Button className="get-permission-button">Get permission</Button>
          </div>
        </div>
        <Today></Today>
      </div>
      <div className="activity">
        <div className="upcoming-activity">
          <h1>Upcoming activity</h1>
          <div className="scroll-container">
            {" "}
            {events.map((event) => (
              <div className="card" key={event.id}>
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">{event.name}</div>
                <div className="card-date">{event.address.city}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="past-activity">
          <h1>Past activity</h1>
          <div className="scroll-container">
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/d098/ee3b/6c2b37f58d15cb93e78d348bbe7c1aa6?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SetPzCP-2gX7uU-~J86pgcDzm51dT3LGGBXCbyoTn8Cfp2d69pZps3oKbX~LSP19EgKuumlXeHf2cp5KM-2aL~gQqQDxhdtJa5BZjR-6H0UrXBurpr9NRWJLhFiu8M1Y39CbGpDXt7MsTPakYEhFb7Y8W8F3tQlZz6WSuUhGlwGnS0Zv-wZLrbCCMFMFqM4wXxBOE6AqzJ4c4eC-MnvutY5JoLAzZjeZyeRpVpcuzBhXLzCcYgMEwjcA4jKxB2BOYvpDjROLEXBTSZ2oQ6E~XCz941YfwciAlMVzgUk6XZHla45uuumXNQ20jAK2cOmqiHwCSDLJgJnUy33CTOMFgw__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/ce3c/09c8/715591a35943d80c1ea8bd1b71db844d?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G~CvYPfpjC1kSvC0SHoy0oq7htWywXk7HqUal0nafQd79COeB0v7G61GaSbWcV84O9BuRzukY5pI2vWp2tBPwYWt21bAeuHai5vkFKcG2pWlk5lgFaTH68wrn-GbyCokePQDsOO4rhGR9pAlQnxP~l15T38Zj-mRV127pCS7WW3ygRFlZq0jp6u2FWj5mYSc6Cn7ukRgsxpX8trj8Az5nCDMrRZWnWe8bPUUBYcAePK4LhKe1b9JvzwOND6KfJ1IecJITzigdfoCZZUhlDr7-MR85udjkwgc6T5uFfS-H9uxV~Tg1NeExQrBe9Tn-fkBhflLG1du2w56wmai381wzA__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
              </div>
              <div className="card-title">Cooking class</div>
              <div className="card-date">2024.8.12</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
