import { useState } from "react";
import toast from "react-hot-toast";
import Rating from "react-star-rating-lite";

import UseTitle from "../component/hook/useTitle";
export default function AddService() {

  const [addRating, setAddRating] = useState("0");



  // handle submit func for add service
  const handleSubmit = (e) => {


      e.preventDefault()

      const form = e.target
      const title = form.title.value
      const price = Number(form.price.value)
      const desc = form.desc.value
      const img = form.imgurl.value

      const service = {title,price,desc,img,rating:addRating}

     fetch(`${process.env.REACT_APP_API_URL}/addservice`,{
        method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(service)
     })
     .then(res => res.json())
     .then((data) => {
      if(data?.success){
        toast.success(`service added succesfully`)
      } else {
        toast.success(`service added failed`)
      }
     })
     form.reset()
  }

  // handle rating func
  const handlerating = (ratedVal) => {
    setAddRating(String(ratedVal));
  };

      // set title
      UseTitle("Add Service")

  return (

    <>

     <section className='container mx-auto h-[65vh]'>

      <h1 className='text-blue-500 text-center text-3xl mt-12'>Add Service</h1>

        <div className='add-service-wrapper mt-12 w-3/5 mx-auto'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>

        <input required name="title" type="text" placeholder="Type title" className="input input-bordered input-primary w-full max-w-xs" />
        <textarea required name="desc" className="textarea textarea-secondary w-full max-w-xs" placeholder="Type description"></textarea>

        <input required name="price" type="number" placeholder="Type price" className="input input-bordered input-primary w-full max-w-xs" />
        <input required name="imgurl" type="text" placeholder="Type img url" className="input input-bordered input-primary w-full max-w-xs" />

        <div>
        <Rating value={addRating} onClick={handlerating} />
        </div>

      <input type="submit" className="btn btn-sm btn-primary" />

        </form>
        


        </div>



    </section>
    
    </>

   
  )
}
