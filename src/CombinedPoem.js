import './CombinedPoem.css'


function CombinedPoem ({ poem1, poem2, combinedPoem}) {
  return (
    <div className='combined-poem'>
      <h2 className='new-poem-title'>Your new poem</h2>
      {combinedPoem.map((line) => (
      <p className='combined-poem-lines'>{line}</p>
      ))}
    </div>
  )
}

export default CombinedPoem