import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export default function AllServices() {

        const {data:allUsers = [],refetch} =  useQuery({
                queryKey:["allusers"],
                queryFn:async () => {
                  const jwttoken = localStorage.getItem("jwttoken")
                    const res = await fetch(`${process.env.REACT_APP_API_URL2}/users`,{
                      headers:{
                        authorization:`bearer ${jwttoken}`
                      }
                    })
                    const data = await res.json()
                    return  data
                }
        })

        const handleUserUpdate =async (d) => {
            const {_id,role} =   d || {}
            let data
            if(!role || role === 'user'){
              data = {role:'admin'}
            } else{
                data = {role:"user"}
            }
          
          const jwttoken = localStorage.getItem("jwttoken")
         const res = await fetch(`${process.env.REACT_APP_API_URL2}/user/admin/${_id}`,{
          method:"PUT",
            headers:{
              "content-type":"application/json",
              authorization:`bearer ${jwttoken}`
            },
            body:JSON.stringify(data)
          })
           await res.json()
            toast.success('user updated successfully')
            refetch()

        }

        const handleUserDelete = (d) => {

        }


  return (
    <div className="container mx-auto mb-12">
    <h2 className="text-2xl my-6 text-center">All users</h2>

    <div className="px-6">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
              {allUsers.length > 0 &&  allUsers.map((d,i) => (
                  <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{d.userEmail}</td>
                      <td>{d.userName}</td>
                      <td> {d?.role === "admin" ? (<button onClick={() => handleUserUpdate(d)} className="btn btn-xs btn-primary">make user</button>) : (<button onClick={() => handleUserUpdate(d)} className="btn btn-xs btn-primary">make admin</button>)}</td>
                      <td><button onClick={() =>handleUserDelete(d) } className="btn btn-xs btn-secondary">Delete</button></td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
