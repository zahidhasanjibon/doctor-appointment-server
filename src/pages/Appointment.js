import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import doctChember from "../assests/img/chair.png";
export default function Appointment() {
  const [selected, setSelected] = useState(new Date());
 console.log(selected);
  return (
    <section className="container mx-auto min-h-[70vh] mt-4">
      <div className="flex flex-col md:flex-row gap-4 w-4/5 mx-auto pt-12 items-center">
        <div className="w-full md:w-1/2">
          <DayPicker 
           mode="single"
           selected={(data) => {
            if(data){
              console.log(data);
              setSelected(data)
            }
           }}
           onSelect={setSelected}
    
           />
           <p className="text-center">you have selected {format(selected,"PP")}</p>
        </div>

        <div className="w-full md:w-1/2 pl-8">
          <div className="w-4/5">
            <img src={doctChember} alt="doct" />
          </div>
        </div>
      </div>
    </section>
  );
}
