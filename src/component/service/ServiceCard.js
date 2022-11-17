import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { NavLink } from "react-router-dom";
import Rating from "react-star-rating-lite";

export default function ServiceCard({serviceInfo}) {


    const {title,img,rating,price,desc,_id} = serviceInfo || {}

  return (
    <div className="service text-center">
    <div className="inline-block">
      <PhotoProvider>
        <PhotoView src={img}>
      <img src={img} alt="service" className='cursor-pointer' />
        </PhotoView>
      </PhotoProvider>
    </div>
    <div>
      <h2 className="text-2xl">{title}</h2>
      <p>
       {desc.length > 50 ? desc.slice(0,60) + '...' : desc}
      </p>
    </div>

   <div className="star-wrapper py-3">
        {rating && <Rating readonly value={`${rating}`} weight="18"/> }

   </div>
   
    <p className="text-blue-600 font-semibold text-2xl">{price} $</p>
    <div className="mt-2">

      <NavLink to={`/services/${_id}`} className="btn btn-secondary btn-sm">
        see details
      </NavLink>
    </div>
  </div>
  )
}
