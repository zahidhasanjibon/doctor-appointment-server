import format from "date-fns/format";
import { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../authentication/AuthContext";

export default function AppointmentModal({ treatment, date, setTreatment,refetch }) {
  const { user } = useContext(authContext);
      date = format(date, "PP")


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const patientName = form.name.value;
    const patientEmail = form.email.value;
    const patientPhone = form.phone.value;
    const appointmentTime = form.slot.value;

    const formData = {
      treatmentName: treatment.name,
      appointMentDate: date,
      appointmentTime,
      patientName,
      patientEmail,
      patientPhone,
      price:treatment.price
    };
    fetch(`${process.env.REACT_APP_API_URL2}/booking`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        form.reset();
        setTreatment(null);
        if (result?.acknowledged) {
          toast.success("appointment booking successfully");
          refetch()
        } else {
          toast.error(result.message)
        }
      })
      .catch((err) => toast.error("appointment booking failed"));
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center">{treatment?.name}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              disabled
              defaultValue={date}
              className="input input-bordered input-info w-full my-2"
            />
            <select name="slot" className="select select-secondary w-full">
              {treatment?.slots.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              name="name"
              defaultValue={user?.displayName}
              disabled
              type="text"
              required
              placeholder="Full Name"
              className="input input-bordered input-info w-full my-2"
            />
            <input
              name="email"
              defaultValue={user?.email}
              type="email"
              disabled
              required
              placeholder="Email"
              className="input input-bordered input-info w-full my-2"
            />
            <input
              name="phone"
              type="number"
              required
              placeholder="Phone No"
              className="input input-bordered input-info w-full my-2"
            />
            <input
              type="submit"
              className="bg-gray-900 text-white cursor-pointer input input-bordered input-info w-full my-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
