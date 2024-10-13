// ProductDetails component
import { useProductsContext } from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

type ProductDetailsProps = {
  product: {
    _id: string;
    createdAt: string;
    image: string; // This will now be a Base64 string
    title: string;
    price: number;
    description: string;
    category: string;
  };
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { dispatch } = useProductsContext();

  const handleClick = async () => {
    const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 h-40 object-contain">
        <img
          src={product.image} // Display the Base64 image
          className="h-full w-full object-contain object-center p-3"
          draggable="false"
          alt={product.title} // Consider adding an alt attribute for accessibility
        />
      </div>
      <div className="mt-4 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-md text-gray-700">
            <Link to={`/products/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
        </div>
        <div className="flex items-center mt-4">
          <p className="text-md font-medium text-gray-900">${product.price}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
        <div className="flex items-center mt-4 italic">
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(product.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 relative">
          <button
            onClick={handleClick}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
