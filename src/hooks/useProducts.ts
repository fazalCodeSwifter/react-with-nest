import { useEffect, useState } from "react"
import type { IProduct } from "../store/productSlice"
import { productseApi } from "../utils/http/httpRequest"

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const response:any = await productseApi()
                
                setProducts(response.data)
                
            } catch (error: any) {
                setError(error.response?.data?.message || error.message)
            }finally{
                setLoading(false)
            }

        })()
    },[])

    return { loading, error, products }

}