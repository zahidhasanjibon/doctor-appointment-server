import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import ServiceCard from "../../service/ServiceCard";

export default function ServicesSection() {
  const [services,setServices] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/services?limit=3`)
      .then((res) => res.json())
      .then((d) => {
        setServices(d)
      });
  }, []);

  return (
    <section>
      <div className="container mx-auto w-4/5 pt-12 pb-24">
        <h2 className="text-3xl text-center">My Clinic Service</h2>
        <p className="text-center">Service i Provide</p>

        <div className="pt-14 services-wrapper grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
            {
              services?.length < 1 ? ( <div className="text-center mt-4">
              <SpinnerCircular color="blue" style={{ display: "inline" }} />
            </div>) :  services.map((d) =>(
                <ServiceCard serviceInfo={d}  key={d?._id}/>
              ) )
            } 

        </div>

        <div className="text-center mt-12">
          <NavLink to="/services" className="btn btn-secondary">
        See all

          </NavLink>
        </div>
      </div>
    </section>
  );
}
