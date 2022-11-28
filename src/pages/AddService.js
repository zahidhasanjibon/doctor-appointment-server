import { useState } from "react";
import toast from "react-hot-toast";
import Rating from "react-star-rating-lite";

import UseTitle from "../component/hook/useTitle";
export default function AddService() {
  const [addRating, setAddRating] = useState("0");
  const [preview, setPreview] = useState("");

  const handleUplaodImg = (e) => {
    const imgFile = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(imgFile);
  };

  // handle submit func for add service
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const price = Number(form.price.value);
    const desc = form.desc.value;
    const img = form.img.files[0]

    const formData = new FormData()
    formData.append("image",img)

    const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_API}`

    fetch(imgbbApiUrl,{
      method:"POST",
      body:formData
    })
    .then(res => res.json())
    .then(d =>{
      if(d.success){
        const service = { title, price, desc, rating: addRating,img:d.data.url };
        const jwttoken = localStorage.getItem("jwttoken");
        fetch(`${process.env.REACT_APP_API_URL}/addservice`, {
          method: "POST",
          headers: { "Content-Type": "application/json",authorization: `bearer ${jwttoken}` },
          body: JSON.stringify(service),
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
             return toast.error("unauthorized access");
            }
            return res.json()
          })
          .then((data) => {
            if (data?.success) {
              toast.success(`service added succesfully`);
            } else {
              toast.success(`service added failed`);
            }
          });
      }

    
        setPreview("")
        setAddRating("0")
      form.reset();


    })

  };

  // handle rating func
  const handlerating = (ratedVal) => {
    setAddRating(String(ratedVal));
  };

  // set title
  UseTitle("Add Service");

  return (
    <>
      <section className="container mx-auto h-[65vh]">
        <h1 className="text-blue-500 text-center text-3xl mt-12">
          Add Service
        </h1>

        <div className="add-service-wrapper mt-12 w-3/5 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <input
              required
              name="title"
              type="text"
              placeholder="Type title"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <textarea
              required
              name="desc"
              className="textarea textarea-secondary w-full max-w-xs"
              placeholder="Type description"
            ></textarea>

            <input
              required
              name="price"
              type="number"
              placeholder="Type price"
              className="input input-bordered input-primary w-full max-w-xs"
            />

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Pick a image</span>
              </label>
              <input
                onChange={handleUplaodImg}
                name="img"
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="avatar">
              <div className="w-24 rounded">
                {preview && <img src={preview} alt="" />}
              </div>
            </div>

            <div>
              <Rating value={addRating} onClick={handlerating} />
            </div>

            <input type="submit" className="btn btn-sm btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
}
