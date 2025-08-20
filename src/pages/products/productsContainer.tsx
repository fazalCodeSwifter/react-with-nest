import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import ProductList from "./container/productList";

const ProductsContainer = () => {
    const products = useSelector((state: RootState) => state.productStore.products)
    
  return (
    <>
        <ProductList products={products} />
    </>
  )
}

export default ProductsContainer