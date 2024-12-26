import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if user is logged in (token exists in localStorage)
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    // Clear the token from localStorage and redirect to login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-950 to-purple-950 text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className=" text-sm md:text-lg  mx-2 xs:mx-[2rem] md:mx-[5rem] lg:mx-[12rem] h-[6rem] flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className=" font-bold text-white hover:text-gray-300 transition duration-300">
          Home
        </Link>

        {/* Navbar Links */}
 
          <Link to='/create-recipe' className="font-bold hover:text-gray-200 transition duration-300">CreateRecipe</Link>
          <Link to='/saved-recipes' className="font-bold hover:text-gray-200 transition duration-300">SavedRecipes</Link>
      

        {/* User Authentication Section */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="xs:bg-red-500 font-bold text-white xs:px-2 xs:py-1 rounded-full hover:bg-red-600 focus:outline-none transition duration-300"
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="  font-bold hover:text-gray-200 transition duration-300">Login</Link>
               
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
