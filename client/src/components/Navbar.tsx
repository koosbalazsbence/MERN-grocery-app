import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="flex justify-around items-center w-full p-5 bg-[#f4f5f7] shadow-md">
      <Link to="/">
        <h1 className="font-montserrat text-xl transition duration-500 ease-in-out hover:scale-110">
          Groceryhub.com
        </h1>
      </Link>
      <div className="font-poppins flex flex-row items-center gap-5">
        <Link to="/login">
          <p className="">Login</p>
        </Link>
        <Link to="/signup">
          <p className="">Signup</p>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
