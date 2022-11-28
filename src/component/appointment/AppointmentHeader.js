import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import doctChember from "../../assests/img/chair.png";

export default function AppointmentHeader({selected,setSelected}) {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-4/5 mx-auto pt-12 items-center">
    <div className="w-full md:w-1/2">
      <DayPicker 
       mode="single"
      selected={selected}
       onSelect={(data) => {
        if(data){
          setSelected(data)
        }
       }}

       />
       <p className="text-center">you have selected {format(selected,"PP")}</p>
    </div>

    <div className="w-full md:w-1/2 pl-8">
      <div className="w-4/5 mx-auto">
        <img src={doctChember} alt="doct" />
      </div>
    </div>
  </div>
  )
}
