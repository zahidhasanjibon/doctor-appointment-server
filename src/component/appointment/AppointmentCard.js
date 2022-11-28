export default function AppointmentCard({info,setTreatment}) {
    const {name,slots,price} = info || {}
  return (
    <div className="card  bg-base-100 shadow-xl">
  <div className="card-body text-center">
    <h2 className="text-center text-xl text-blue-400">{name}</h2>
    <p className="">{slots[0]}</p>
    <p>{slots.length} {slots.length > 1 ? "spaces" : "space"} available</p>
    <p className="text-blue-600 text-xl font-bold">{price} $</p>
    <div className="card-actions justify-center pt-4">
     {
      slots.length > 0 ? (
        <label htmlFor="booking-modal" className="btn btn-primary btn-sm" onClick={() => setTreatment(info)} >Book Appointmentl</label>
      ) : (
        <label  className="btn btn-disabled btn-sm" >Book Appointmentl</label>
      )
     }
    </div>
  </div>
</div>
  )
}
