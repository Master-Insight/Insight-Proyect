
import PropTypes from 'prop-types';
import BackButton from '../buttons/BackButton2';

const Frame = ({
  children, back = false, css = 'w-full max-w-4xl',
}) => {

  css = back ? (css + " pt-18 p-6 mt-1") : (css + " p-6 mt-1")

  return (
    <div className={`relative min-h-screen bg-gray-50 ${css}`} >
      {back && <BackButton />
      }
      <div className="">
        <div className="mx-auto p-8 bg-white shadow-xl min-h-[80vh] rounded-lg overflow-hidden ">
          {children}
        </div>
      </div>
    </div >
  )
}

Frame.propTypes = {
  children: PropTypes.node.isRequired, // Los children deben ser elementos válidos de React
  back: PropTypes.bool, // Un booleano que habilita el botón volver atras
  css: PropTypes.string, // Clases CSS adicionales como string
};

export default Frame;