import { Link } from "@tanstack/react-router";
import PropTypes from 'prop-types';
import Spinner from "../../ui/loading/Spinner";

function NavMenu({ layout = 'desktop', navLinks, displayMobile = false }) {
  // console.log("NavMenu: ", navLinks);

  if (!navLinks) {
    return <div className={`p-2 text-2xl`}>Cargando... <Spinner /></div>
  }

  return (
    <>
      {/* Vista para dispositivos desktop */}
      {layout === "desktop" && (
        <div className="hidden sm:block sm:ml-6 h-12">
          <div className="flex space-x-4 h-12 items-center">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-700 hover:bg-gray-100 hover:text-primary-dark px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Vista para dispositivos móviles */}
      {layout === "mobile" && (
        <div
          className={`sm:hidden px-2 pt-2 pb-3 space-y-1 ${displayMobile ? "block" : "hidden"
            }`}
        >
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-gray-700 hover:bg-gray-100 hover:text-primary-dark block px-3 py-2 rounded-md text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

NavMenu.propTypes = {
  layout: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  displayMobile: PropTypes.bool,
}

export default NavMenu