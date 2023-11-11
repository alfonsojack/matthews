import './Error.css'
import PropTypes from 'prop-types';

function Error ({error, message}) {
  return (
    <div className='error-cont'>
      <h2 className='error-h2'>Oops! Something went wrong...</h2>
      <h3 className='error-h3'>{error}</h3>
      <h3 className='error-h3'>{message}</h3>
  </div>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired, 
  message: PropTypes.string.isRequired
}

export default Error
