import { useState } from "react"
import { useProductsContext } from "../hooks/useProductsContext"

const CreateProduct = () => {
  const { dispatch } = useProductsContext()

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const product = {
      image,
      title,
      price,
      description,
      category,
    }

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
      setEmptyFields(data.emptyFields)
    }
    if (response.ok) {
      setTitle("")
      setPrice("")
      setDescription("")
      setImage("")
      setCategory("")
      setError(null)
      setEmptyFields([])
      dispatch({ type: "CREATE_PRODUCT", payload: data })
    }
  }

  return (
    <div className="w-screen mt-12 flex items-center justify-center">
      <div className="md:w-2/5 md:m-0 w-full m-5 p-10 rounded-md shadow-md border-2 ">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-montserrat mb-5 text-center">
            Add a New Workout
          </h3>

          <label className="block font-montserrat">Product Name:</label>
          <input
            className={
              emptyFields.includes("title")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            onChange={(e) => setTitle(e.target.value as string)}
            value={title}
          />

          <label className="block font-montserrat">Price:</label>
          <input
            className={
              emptyFields.includes("price")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="number"
            onChange={(e) => setPrice(e.target.value as string)}
            value={price}
            min={0.99}
            step={0.01}
          />

          <label className="block font-montserrat">Description:</label>
          <input
            className={
              emptyFields.includes("description")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            onChange={(e) => setDescription(e.target.value as string)}
            value={description}
          />

          <label className="block font-montserrat">Image URL:</label>
          <input
            className={
              emptyFields.includes("image")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            onChange={(e) => setImage(e.target.value as string)}
            value={image}
          />

          <label className="block font-montserrat">Category:</label>
          <input
            className={
              emptyFields.includes("category")
                ? "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 border-red-500 focus:border-red-500"
                : "p-2 mt-1 mb-2 w-full border-2 rounded-md box-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            }
            type="text"
            onChange={(e) => setCategory(e.target.value as string)}
            value={category}
          />

          <button className="p-2 mt-1 mb-2 w-full bg-primary text-white rounded hover:bg-[#2a9d8f]">
            Add workout
          </button>
          {error && (
            <div className="text-secondary border-secondary border-2 p-2 rounded-md absolute bottom-10 right-10 bg-red-100">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
