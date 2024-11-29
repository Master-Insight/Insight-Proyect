import * as React from 'react'
import PropTypes from 'prop-types';

function Spinner({
  show,
  wait,
}) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition ${(show ?? true)
        ? `opacity-1 duration-500 ${wait ?? 'delay-300'}`
        : 'duration-500 opacity-0 delay-0'
        }`}
    >
      ⍥
    </div>
  )
}

Spinner.propTypes = {
  show: PropTypes.bool,
  wait: PropTypes.bool,
}

export default Spinner