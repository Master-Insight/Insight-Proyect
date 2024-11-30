// import NavUser from "./NavUser";
import NavMenu from "./NavMenu";
import PropTypes from 'prop-types';
import NavUser from "./NavUser";

function NavBar({ type = 'public', navLinks }) {
  // console.log("NavBar: ", navLinks);
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          {/* Mobile menu button*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">MiApp {type}</h1>
            </div>
            {/* Menu para dispositivos desktop */}
            <NavMenu type={type} navLinks={navLinks} layout="desktop" />
          </div>

          {/* Componente del usuario logueado */}
          <NavUser />

        </div>
      </div>

      {/* Menu para dispositivos móviles */}
      <NavMenu type={type} navLinks={navLinks} layout="mobile" />
    </nav>
  );
}

NavBar.propTypes = {
  type: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired
}

export default NavBar