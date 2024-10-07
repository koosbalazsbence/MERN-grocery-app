import { useProductsContext } from "../hooks/useProductsContext"
import { Trash2 } from "lucide-react"

// date fns
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

type ProductDetailsProps = {
  product: {
    _id: string
    createdAt: string
    image: string
    title: string
    price: number
    description: string
    category: string
  }
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { dispatch } = useProductsContext()

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:5000/api/products/${product._id}`,
      {
        method: "DELETE",
      }
    )

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json })
    }
  }
  return (
    <div className="bg-gray-50 border-2 mx-auto m-5 relative shadow-lg rounded rounded-tl-xl rounded-tr-xl">
      <img
        src={product.image}
        alt={product.title}
        className="rounded-tl-xl rounded-tr-xl shadow-lg"
        draggable="false"
      />
      <div className="p-5">
        <h4 className="mb-2 text-2xl font-poppins text-primary">
          {product.title}
        </h4>
        <p className="text-xl">${product.price}</p>
        <p>{product.description}</p>
        <p className="text-gray-400">{product.category}</p>
        <p className="absolute top-0 right-0 mt-2 mr-5 text-gray-400">
          {formatDistanceToNow(new Date(product.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <span
        className="absolute top-5 right-5 cursor-pointer bg-slate-200 p-2 rounded-full hover:scale-110 transition duration-500 ease-in-out"
        onClick={handleClick}
      >
        <Trash2 size={18} />
      </span>
    </div>
  )
}

export default ProductDetails
