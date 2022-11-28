import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { authContext } from "../component/authentication/AuthContext";

export default function MyAppointment() {
  const { user, logOut } = useContext(authContext);
  const navigate = useNavigate();

  const { data: myAppointments = [],isLoading } = useQuery({
    queryKey: ["mybooking", user?.email],
    queryFn: async () => {
      const jwttoken = localStorage.getItem("jwttoken");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL2}/booking?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${jwttoken}`,
          },
        }
      );
      if (res.status === 401 || res.status === 403) {
        toast.error("unauthorized access");
          logOut()
          .then(() => {
            localStorage.removeItem("jwttoken");
            navigate("/login");
          })
          .catch((err) => {
            toast.error(err);
          });
      }

      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <div className="h-[70vh] text-center"> <SpinnerCircular color="blue" style={{ display: "inline" }} /></div>;
}

  return (
    <div className="container mx-auto mb-12">
      <h2 className="text-2xl my-6 text-center">My Appointment</h2>

      <div className="px-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Treatment</th>
                <th>Price</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {myAppointments.length > 0 &&
                myAppointments.map((booking, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{booking.patientName}</td>
                    <td>{booking.treatmentName}</td>
                    <td>{booking.price} $</td>
                    <td>{booking.appointMentDate}</td>
                    <td>{booking.appointmentTime}</td>
                    {!booking.paid ? <td>
                      <Link to={`/dashboard/payment/${booking._id}`} className="btn btn-sm btn-primary">Pay</Link>
                    </td> : (
                      <td>
                      <span className="font-bold text-blue-600">Paid</span></td>
                    )   
                    
                    }
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
