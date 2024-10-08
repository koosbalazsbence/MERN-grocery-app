import { useEffect } from "react"

// custom hooks
import { useProductsContext } from "../hooks/useProductsContext"

// components
import CreateProductButton from "../components/CreateProductButton"
import ProductDetails from "../components/ProductDetails"

const Home = () => {
  const { products, dispatch } = useProductsContext()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products")
        const data = await response.json()
        console.log(data)
        console.log(response)

        if (response.ok) {
          dispatch({ type: "SET_PRDOUCTS", payload: data })
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [dispatch])

  return (
    <>
      <div className="w-4/5 mx-auto mt-12">
        <CreateProductButton />
      </div>
      <div className="w-3/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {products &&
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
      </div>
    </>
  )
}

export default Home
