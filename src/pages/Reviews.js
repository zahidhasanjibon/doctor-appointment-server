import React, { useContext, useEffect, useState } from 'react';

import toast from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";
import { authContext } from '../component/authentication/AuthContext';
import UseTitle from '../component/hook/useTitle';
import ReviewTableRow from '../component/reviews/ReviewTableRow';



export default function Reviews() {

    const [allReviews,setAllReviews] = useState([])
    const [updateReviewData,setUpdateReviewData] = useState({})
    const [reviewMsgsg,setReviewMsg] = useState("")
    const [isLoading,setIsLoading] = useState(true)


  const {user,logOut} = useContext(authContext)
    const {uid} = user || {}

      useEffect(() => {
          getAllreviews()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[uid])

        // get all reviews func

      const getAllreviews = () => {
        const jwttoken = localStorage.getItem("jwttoken")

        fetch(`${process.env.REACT_APP_API_URL}/myreviews?userEmail=${uid}`,{
          headers:{
            authorization:`bearer ${jwttoken}`
          }
        })
        .then((res) => {
          if(res.status === 401 || res.status === 403){
            toast.error('unauthorized access')
            logOut()
            return
          }
          return res.json()
          })
        .then((d) => {
          if(d?.message){
              toast.error(d?.message + 'please log in again')
          } else {
            setAllReviews(d)
            setIsLoading(false)
          }
          
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
        })

      }

        // for update review

      const handleUpdate = (e) => {
        e.preventDefault()
        const updatedMsg = e.target.msg.value
        const updatedData = {...updateReviewData,msg:updatedMsg}
        fetch(`${process.env.REACT_APP_API_URL}/myreview`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedData)
        })
        .then((res) => res.json())
        .then((d) => {
          toast.success("review updated successfully")
        getAllreviews()
        })
       .catch((err) => {
          console.log(err);
        })
        e.target.reset()
    }
    const handleDelete = (id) => {

    fetch(`${process.env.REACT_APP_API_URL}/myreview/${id}`,{
      method:"DELETE"
    })
      .then((res) => res.json())
      .then((d) => {
        if(d?.status){
          toast.success("review deleted successfully")
          const updateReviewList = allReviews.filter((d) =>d._id !== id )
          setAllReviews(updateReviewList)
        }
      })
     .catch((err) => {
        console.log(err);
      })
    }
      // set clicked data to modal 

      const setUpdateDataToModal = (data) => {
        setUpdateReviewData(data)
        setReviewMsg(data?.msg)
   
      }
      // set title
      UseTitle("My reviews")
        // if loading then return spinner
      if(isLoading) {
        return  <div className="text-center mt-4 h-[70vh]">
        <SpinnerCircular color="blue" style={{ display: "inline" }} />
      </div>
      }

  return (
    <section className='container mx-auto'>
      <div className='my-reviews-wrapper w-4/5 mx-auto h-[70vh]'>
  

    {
      allReviews?.length < 1 ? (<div className='text-center flex items-center justify-center h-[70vh]'><h4 className='text-4xl'>No reviews were added</h4> </div>) : (<div className="overflow-x-auto w-full mt-16">
      <table className="table w-full">
    
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Review message</th>
            <th>Review</th>
            <th>Actions</th>
            <th></th>
          
          </tr>
        </thead>
        <tbody>
          {
              allReviews?.length > 0 && allReviews.map((d) => (
                <ReviewTableRow handleDelete={handleDelete} setUpdateDataToModal={setUpdateDataToModal}  review={d} key={d._id}/>
              ))
          }
    
        </tbody>
    
      </table>
    </div>
    )
    }

      </div>

        {/* The button to open modal */}
       

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <form onSubmit={handleUpdate} className="flex flex-col items-center">
                  <textarea
                    name="msg"
                    value={reviewMsgsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    className="textarea textarea-primary"
                    placeholder="Bio"
                  ></textarea>
                  
                  <input  type="submit" className="block mx-auto btn btn-sm btn-primary mt-4" />
                </form>
    <div className="modal-action">
      <label  htmlFor="my-modal" className="btn">close</label>
    </div>
  </div>
</div>


    </section>
  )
}
