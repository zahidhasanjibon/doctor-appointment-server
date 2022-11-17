import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";
import Rating from "react-star-rating-lite";
import { SpinnerCircular } from "spinners-react";
import { authContext } from "../component/authentication/AuthContext";
import UseTitle from "../component/hook/useTitle";
import ReviewCard from "../component/reviews/ReviewCard";

export default function ServicesDetails() {
  const [serviceDetails, setServiceDetails] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [addRating, setAddRating] = useState("0");

  const { user } = useContext(authContext);
  const { photoURL ,displayName,uid,email} = user || {};

  const { _id, title, img, price, rating, desc } = serviceDetails || {};
 
  const { id } = useParams();

  useEffect(() => {
      getSingleService()
      getAllreviews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


      // get single service
      const getSingleService = () => {
        fetch(`${process.env.REACT_APP_API_URL}/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceDetails(data);
      });
      }

      // get all reviews with sorting latest
  const getAllreviews = () => {
    fetch(`${process.env.REACT_APP_API_URL}/reviews/${id}`)
    .then((res) => res.json())
    .then((data) => {
    setAllReviews(data)
    }).catch((err) => {
      console.log(err);
    })
  }

  // set rating func
  const handlerating = (ratedVal) => {
    setAddRating(String(ratedVal));
  };

    // add review func 

  const handleAddReview = (e) => {
    e.preventDefault();

    const form = e.target;
    const msg = form.msg.value;

    const review = {
      serviceId: _id,
      serviceName:title,
      msg,
      userName:displayName,
      userEmail: uid,
      email,
      userImg: photoURL,
      rating: addRating.toString(),
    };

    fetch(`${process.env.REACT_APP_API_URL}/addreview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`review addded successfully`)
        getAllreviews()
      }).catch(() => {
        toast.error(`review addded failed`)
        
      })
      form.reset()
  };
  // set title

    UseTitle(`Service - ${title}`)


  return (
    <section className="container mx-auto">
      <div className="w-11/12 mx-auto mt-6">
        <div className="service-details-sec">
         {
          !serviceDetails?._id  ?  (  <div className="text-center mt-4">
          <SpinnerCircular color="blue" style={{ display: "inline" }} />
        </div>) : (
            <div className="wrapper flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 text-center">
              <img className="w-3/5 inline" src={img} alt="" />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-start">
              <h4 className="text-3xl">{title}</h4>
              <div className="rating">
               {rating &&  <Rating value={`${rating}`} readonly />}
              </div>
              <p className="text-blue-500 text-2xl">{price} $</p>

              <p className="text-xl md:text-2xl">{desc}</p>
            </div>
          </div>
          )
         }
        </div>
        <div className="service-review-sec py-12">
          <h4 className="text-2xl text-center">Reviews</h4>
          <div className="flex flex-col-reverse md:flex-row pt-8 gap-6">
            <div className="reviews-list w-full md:w-3/5 lg:w-4/5">
              <div className="ml-0 md:ml-24">
                {
                  allReviews?.length > 0 ? allReviews.map((d,i) => (
                    <ReviewCard review={d} key={d._id} num={i + 1}/>
                  )) : <h4 className="text-3xl">No reviews yet</h4>
                }
              </div>
            </div>

            <div className="w-full md:w-2/5 lg:w-1/5">
              {
                user?.uid ? ( <div className="bg-gray-200 px-3 py-4 text-center">
                <h4>add Review</h4>
                <form onSubmit={handleAddReview}>
                  <textarea
                    name="msg"
                    required
                    className="textarea textarea-primary"
                    placeholder="Bio"
                  ></textarea>
                  <div className="rating pb-4">
                    <Rating value={addRating} onClick={handlerating} />
                  </div>
                  <input  type="submit" className="block mx-auto btn btn-sm btn-primary" />
                </form>
              </div>) : (
                <div>
                  <h4 className="text-3xl">Please Log in to Add review</h4>
                  <NavLink to="/login" className="btn btn-primary btn-sm mt-4">Log in</NavLink>

                </div>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
