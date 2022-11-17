import Rating from "react-star-rating-lite";

export default function ReviewCard({review,num}) {
    const {userImg,userName,rating,msg} = review || {}
  return (
    <div className="review-card w-48 my-4 text-center p-3 bg-gray-100">
      <p>{num}</p>
    <img
      src={userImg}
      className="inline w-14 h-14 rounded-full bg-black"
      alt=""
    />
    <p> name : {userName ? userName : 'not available'}</p>
    <div className="w-2/5 mx-auto">
      <Rating value={rating} readonly weight="16" />
    </div>

    <p>{msg}</p>
  </div>
  
  )
}
