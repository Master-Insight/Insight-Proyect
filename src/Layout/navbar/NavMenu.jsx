import { Link } from "@tanstack/react-router";
import PropTypes from 'prop-types';
import Spinner from "../../ui/loading/Spinner";

function NavMenu({ layout = 'desktop', navLinks }) {
  // console.log("NavMenu: ", navLinks);


  if (!navLinks) {
    return <div className={`p-2 text-2xl`}>Cargando... <Spinner /></div>
  }

  // Vista para dispositivos desktop
  if (layout === 'desktop') {
    return (
      <div className="hidden sm:block sm:ml-6 h-12">
        <div className="flex space-x-4 h-12 items-center">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-gray-700 hover:bg-gray-100 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Vista para dispositivos móviles
  if (layout === 'mobile') {
    return (
      <div className="sm:hidden x-2 pt-2 pb-3 space-y-1" id="mobile-menu ">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-gray-700 hover:bg-gray-100 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

NavMenu.propTypes = {
  layout: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired
}

export default NavMenu