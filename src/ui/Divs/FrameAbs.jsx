
import PropTypes from 'prop-types';

const FrameAbs = ({
  children,
}) => {

  return (
    <div className="min-h-screen mt-2 pt-2 bg-white " >
      {children}
    </div >
  )
}

FrameAbs.propTypes = {
  children: PropTypes.node.isRequired, // Los children deben ser elementos válidos de React
};

export default FrameAbs;