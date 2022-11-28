import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";

export default function AppointmentContent({ date }) {
  const [treatment, setTreatment] = useState(null);

  const {
    data: availableOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointments", date],
    queryFn: async () => {
      date = format(date, "PP");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL2}/appointmentoptions?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className="h-[70vh] text-center">
        <SpinnerCircular color="blue" style={{ display: "inline" }} />
      </div>
    )
  }

  return (
    <div className="py-16">
      <h4 className="text-center text-violet-600 text-3xl">
        Available Appointment {format(date, "PP")}
      </h4>

      <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto pt-4">
        {availableOptions?.length > 0 &&
          availableOptions.map((data) => (
            <AppointmentCard
              key={data._id}
              info={data}
              setTreatment={setTreatment}
            />
          ))}
      </div>

      {treatment && (
        <AppointmentModal
          treatment={treatment}
          date={date}
          setTreatment={setTreatment}
          refetch={refetch}
        />
      )}
    </div>
  );
}
