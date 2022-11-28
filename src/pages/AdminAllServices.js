import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'
import UseTitle from '../component/hook/useTitle'

export default function AdminAllServices() {
    


        const {data:allServices,isLoading,refetch} = useQuery({
            queryKey:["adminallservices"],
            queryFn:async () => {
                const res = await fetch(`${process.env.REACT_APP_API_URL2}/services`,{
                })
                const data = await res.json()
                return  data
            }
        })

            const handleDelete = async(id) => {
        
                    const jwttoken = localStorage.getItem("jwttoken");
                    const res = await fetch(`${process.env.REACT_APP_API_URL2}/service/${id}`,
                      {
                        method:"DELETE",
                        headers: {
                          authorization: `bearer ${jwttoken}`,
                        },
                      }
                    );

                    const data = await res.json()
                      if(data?.acknowledged){
                        toast.success("service deleted successfully")
                        refetch()
                      }


            }


    UseTitle('admin all services')

    if (isLoading) {
        return <div className="h-[70vh] text-center"> <SpinnerCircular color="blue" style={{ display: "inline" }} /></div>;
    }



  return (
    <div className="overflow-x-auto w-full px-8 py-8">
  <table className="table w-full">
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Title</th>
        <th>Price</th>

        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {
        allServices?.length > 0 && allServices.map((d) => (
            <tr key={d?._id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <img src={d?.img} alt="" />
              </div>
            </div>
          </div>
        </td>
        <td>
        <div>
              <div className="font-bold">{d?.title}</div>
             
            </div>
        </td>
        <td>
            <p className='text-2xl text-blue-500'>{d?.price} $</p>
        </td>

        <th>
<button className='btn btn-sm btn-secondary' onClick={() => handleDelete(d?._id)}>Delete</button>
        </th>
      </tr>
        ))
      }
    

    </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>
  )
}
