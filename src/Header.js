import './Header.css'
import { Link, NavLink, useLocation } from 'react-router-dom'

function Header () {
  const location = useLocation();

  return (
    <header>
      <div className='header-logo'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-book-open"><g><path className="secondary" d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"/><path className="primary" d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"/></g></svg>
        <Link to='/' className="header-title">Matthews</Link>
      </div>
      <Link to="/" className={location.pathname === '/' ? 'active-link' : 'header-nav'}>Home</Link>
      <Link to="/create" className={location.pathname === '/create' ? 'active-link' : 'header-nav'}>Create</Link>
      <Link to="/combine" className={location.pathname === '/combine' ? 'active-link' : 'header-nav'}>Combine</Link>
      <Link to="/about" className={location.pathname === '/about' ? 'active-link' : 'header-nav'}>About</Link>
    </header>
  )
}

export default Header