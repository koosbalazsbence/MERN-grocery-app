import { useState } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import { useNavigate } from "react-router-dom" // Add useNavigate for redirecting

const CreateProduct = () => {
  const { dispatch } = useProductsContext()
  const navigate = useNavigate() // Initialize navigate for redirecting

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [emptyFields, setEmptyFields] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields || [])
      } else {
        setProduct({
          title: "",
          price: "",
          description: "",
          image: "",
          category: "",
        })
        setError(null)
        setEmptyFields([])
        dispatch({ type: "CREATE_PRODUCT", payload: json })
        navigate("/")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-screen mt-12 flex items-center justify-center">
      <div className="md:w-2/5 md:m-0 w-full m-5 p-10 rounded-md shadow-md border-2 ">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-montserrat mb-5 text-center">
            Add a New Product
          </h3>
          <label className="block font-montserrat">Product Name:</label>
          <input
            className={
              emptyFields.includes("title")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500 focus:ring-secondary"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            name="title"
            onChange={handleChange}
            value={product.title}
          />
          <label className="block font-montserrat">Price:</label>
          <input
            className={
              emptyFields.includes("price")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500 focus:ring-secondary"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="number"
            name="price"
            onChange={handleChange}
            value={product.price}
            min={0.99}
            step={0.01}
          />

          {/* Description */}
          <label className="block font-montserrat">Description:</label>
          <input
            className={
              emptyFields.includes("description")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500 focus:ring-secondary"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            name="description"
            onChange={handleChange}
            value={product.description}
          />

          {/* Image URL */}
          <label className="block font-montserrat">Image URL:</label>
          <input
            className={
              emptyFields.includes("image")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500 focus:ring-secondary"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            name="image"
            onChange={handleChange}
            value={product.image}
          />

          {/* Category */}
          <label className="block font-montserrat">Category:</label>
          <input
            className={
              emptyFields.includes("category")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500 focus:ring-secondary"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            name="category"
            onChange={handleChange}
            value={product.category}
          />

          {/* Submit Button */}
          <button className="p-2 mt-1 mb-2 w-full bg-primary text-white rounded hover:bg-[#2a9d8f]">
            Add Product
          </button>

          {/* Error Message */}
          {error && (
            <div className="text-secondary border-secondary border-2 p-2 rounded-md bg-red-100">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
