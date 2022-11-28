
import { useState } from "react";
import AppointmentContent from "../component/appointment/AppointmentContent";
import AppointmentHeader from "../component/appointment/AppointmentHeader";
import useTitle from "../component/hook/useTitle";


export default function Appointment() {
  const [selected, setSelected] = useState(new Date());

    
  useTitle("Appointment")
  return (
    <section className="container mx-auto min-h-[70vh] mt-4">
      <AppointmentHeader selected={selected} setSelected={setSelected} />
      <AppointmentContent date={selected} />
    </section>
  );
}
