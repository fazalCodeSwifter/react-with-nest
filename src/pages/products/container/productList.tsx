import type { IProducts } from "../../../store/productSlice"

const ProductList = ({ products }: IProducts) => {
    return (
        <>
            <div className="w-full h-screen grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {
                    !!products && products.map((product) => (
                        <div key={product.id} className="w-11/12 mx-auto border-2 h-full mt-8 text-center">
                            <h1 className="text-2xl mt-5 font-bold">Title: {product.title}</h1>
                            <h1 className="mt-5">Descriptions: {product.description.slice(0, 30)}</h1>
                            <h1 className="text-3xl mt-5 text-gray-500 font-bold">Price: {product.price}</h1>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductList