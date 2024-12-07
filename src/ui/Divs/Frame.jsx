
import PropTypes from 'prop-types';
import BackButton from '../buttons/BackButton2';

const Frame = ({
  children,
  back = false,
  css = 'w-full max-w-4xl',
  title,
}) => {

  css = back ? (css + " pt-18 p-6 mt-1") : (css + " p-6 mt-1")

  return (
    <div className={`relative min-h-screen bg-gray-50 ${css}`} >
      {title ? null : back && <BackButton />}
      <div className="">
        <div className="mx-auto p-8 bg-white shadow-xl min-h-[80vh] rounded-lg overflow-hidden ">
          {title && <div className='flex gap-3'>
            <BackButton />
            <h2 className="text-3xl font-semibold mb-2">{title}</h2>
          </div>}
          {children}
        </div>
      </div>
    </div >
  )
}

Frame.propTypes = {
  back: PropTypes.bool, // Un booleano que habilita el botón volver atras
  children: PropTypes.node.isRequired, // Los children deben ser elementos válidos de React
  css: PropTypes.string, // Clases CSS adicionales como string
  title: PropTypes.string, // Título de la sección
};

export default Frame;