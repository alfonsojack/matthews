import './About.css'
import { Link } from 'react-router-dom'

function About () {
  return (
    <div className='About'>
      <div className='label'>
      <img className='image' alt="Harry Matthews" src="https://www.theparisreview.org/blog/wp-content/uploads/2017/01/sinkingharperback.jpg"></img>
      <p>Harry Matthews</p>
      </div>
      <div className="writing">
          <p id='text-quote'>I too, dislike it: there are things that are important beyond all this fiddle.</p>
          <p id='attribution'>Marianne Moore, on poetry</p>
        <p className='about-line' id='first-line'>Everyone hates poetry. Even the great poets hate poetry. </p>
        <p className='about-line'>From past legends like Marianne Moore to contemporary muckety-mucks like Ben Lerner, poets' disdain for their own craft is well documented.</p>
        <p className='about-line'>Luckily, in the 20th century, Harry Matthews and the Oulipo School pioneered the fusion of mathematics and literature, creating all sorts of algorithms and formulas for creating poetry.</p>
        <p className='about-line'>Thanks to their work and this site, you can now create poetry without any of the boring, exhausting effort of thinking thoughts or writing things down.</p>
        <p className='about-line'>Visit our <Link to="/combine">Combine</Link> page to fuse two poems together, or visit our <Link to="/create">Create</Link> page to generate a great new poem with a single click.</p>
        <p className='about-line' id='first-line'>Say Goodbye to emotional labor and Hello to literary greatness!</p>

      </div>
    </div>
  )
}

export default About