import './CombinedPoem.css'
import PropTypes from 'prop-types';

function CombinedPoem ({ combinedPoem }) {
  return (
    <div className='combined-poem'>
      <h2 className='new-poem-title'>Earth's Newest Poem</h2>
      {combinedPoem.map((line, index) => (
      <p key={index} className='combined-poem-lines'>{line}</p>
      ))}
    </div>
  )
}


CombinedPoem.propTypes = {
  combinedPoem: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CombinedPoem