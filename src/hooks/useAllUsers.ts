import { useEffect, useState } from "react"
import { allUserseApi } from "../utils/http/httpRequest"

export const useAllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const response:any = await allUserseApi()
                
                setAllUsers(response.data)
                
            } catch (error: any) {
                setError(error.response?.data?.message || error.message)
            }finally{
                setLoading(false)
            }

        })()
    },[])

    return { loading, error, allUsers }

}