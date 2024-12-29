// import NavUser from "./NavUser";
import NavMenu from "./NavMenu";
import PropTypes from 'prop-types';
import NavUser from "./NavUser";
import { useState } from "react";

function NavBar({ type = 'public', navLinks, config }) {
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar visibilidad en Mobile

  // console.log("NavBar: ", navLinks);
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          {/* Mobile menu button*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir Menu</span>
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

          {/* Logo + Menu */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img
                src={config.images.logo[0]}
                alt="Logo Insight"
                className="w-auto h-12" />
            </div>
            {/* Menu */}
            <NavMenu
              layout="desktop"
              navLinks={navLinks}
            />
          </div>

          {/* Componente del usuario logueado */}
          <NavUser />

        </div>
      </div>

      {/* Menu para dispositivos móviles */}
      <NavMenu
        layout="mobile"
        navLinks={navLinks}
        displayMobile={isVisible}
      />
    </nav>
  );
}

NavBar.propTypes = {
  type: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  config: PropTypes.shape({
    images: PropTypes.any,
  })
}

export default NavBar