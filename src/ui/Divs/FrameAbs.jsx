
import PropTypes from 'prop-types';

const FrameAbs = ({
  children,
}) => {

  return (
    <div className="w-full min-h-screen mt-2 p-4 bg-white " >
      {children}
    </div >
  )
}

FrameAbs.propTypes = {
  children: PropTypes.node.isRequired, // Los children deben ser elementos válidos de React
};

export default FrameAbs;