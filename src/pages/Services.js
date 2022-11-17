import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import UseTitle from "../component/hook/useTitle";

import ServiceCard from "../component/service/ServiceCard";
export default function Services() {
  const [data, setData] = useState([]);
// get all services
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/services`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
  }, []);

  //title
  UseTitle("Services")

  return (
    <>
    
      <section className="h-min[91vh] container mt-8">
        <div className="all-services-wrapper w-4/5 mx-auto pb-12">
          <h2 className="text-5xl text-center text-blue-600">My Services</h2>
          <p className="text-center mt-4 text-lg">Most Demanded Service</p>

          {data?.length < 1 ? (
            <div className="text-center mt-4 h-[55vh]">
              <SpinnerCircular color="blue" style={{ display: "inline" }} />
            </div>
          ) : (
            <div className="pt-8 services-wrapper grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
              {data?.length > 0 &&
                data.map((d) => <ServiceCard serviceInfo={d} key={d._id} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
