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
    <div className="bg-gray-50 border-2 mx-auto m-5 relative shadow-lg rounded rounded-tl-xl rounded-tr-xl w-3/4 max-h-full">
      <div className="rounded-tl-xl rounded-tr-xl shadow-lg w-full h-40 object-contain">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain rounded-tl-xl rounded-tr-xl p-3"
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-5">
        <h4 className="mb-2 text-2xl font-poppins text-primary">
          {product.title}
        </h4>
        <p className="text-xl">${product.price}</p>
        <p>{product.description}</p>
        <p className="text-gray-400">{product.category}</p>
        <p className="absolute bottom-5 right-5 text-gray-400">
          {formatDistanceToNow(new Date(product.createdAt), {
            addSuffix: true,
          })}
        </p>
        <p
          className="absolute top-5 right-5 cursor-pointer bg-slate-200 p-2 rounded-full"
          onClick={handleClick}
        >
          <Trash2 size={18} />
        </p>
      </div>
    </div>
  )
}

export default ProductDetails
