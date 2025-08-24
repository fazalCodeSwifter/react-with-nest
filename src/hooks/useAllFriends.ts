import { useEffect, useState } from "react"
import { allFriendsApi } from "../utils/http/httpRequest"

export const useAllFriends = () => {
    const [allFriends, setAllFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const response:any = await allFriendsApi()
                
                setAllFriends(response.data)
                
            } catch (error: any) {
                setError(error.response?.data?.message || error.message)
            }finally{
                setLoading(false)
            }

        })()
    },[])

    return { loading, error, allFriends }

}