import { useEffect, useState } from "react"

const UseAdmin = (email) => {
        const [isAdmin,setIsAdmin] = useState(false)
        const [isAdminLoading,setIsAdminLoading] = useState(true)
    useEffect(() => {
        if(email){
            fetch(`${process.env.REACT_APP_API_URL2}/user/admin/${email}`)
            .then(res => res.json())
            .then(data => {setIsAdmin(data.isAdmin)
               setIsAdminLoading(false)})
        }
    },[email])

    return [isAdmin,isAdminLoading]

}
export default UseAdmin