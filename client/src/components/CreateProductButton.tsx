import { Link } from "react-router-dom"

const CreateProductButton = () => {
  return (
    <div className="mx-auto flex md:justify-end justify-center">
      <Link to="/create-product">
        <p className="bg-primary p-2 rounded-md text-center hover:bg-[#2a9d8f] hover:scale-110 transition duration-500 ease-in-out text-gray-50 font-poppins shadow-sm">
          Create Product
        </p>
      </Link>
    </div>
  )
}

export default CreateProductButton
