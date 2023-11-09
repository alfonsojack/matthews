import './CombinedPoem.css'


function CombinedPoem ({ poem1, poem2, combinedPoem}) {
  return (
    <div>
      {combinedPoem.map((line) => (
      <p>{line}</p>
      ))}
    </div>
  )
}

export default CombinedPoem