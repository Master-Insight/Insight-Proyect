import BackButton from '../buttons/BackButton'
import PropTypes from 'prop-types';

const Frame = ({ children, redirect, css }) => {

  return (
    <div className={`relative mt-1 p-6 min-h-screen bg-gray-50 ${css}`} >
      {redirect && <BackButton to={redirect} />
      }
      <div className="">
        <div className={`mx-auto p-8 bg-white shadow-xl min-h-[80vh] rounded-lg overflow-hidden `}>
          {children}
        </div>
      </div>
    </div >
  )
}

Frame.propTypes = {
  children: PropTypes.node.isRequired, // Los children deben ser elementos válidos de React
  redirect: PropTypes.string, // Una URL o path como string
  css: PropTypes.string, // Clases CSS adicionales como string
};

Frame.defaultProps = {
  redirect: null, // Por defecto no hay redirección
  css: 'w-full max-w-4xl', // Valor predeterminado para css
};

export default Frame;