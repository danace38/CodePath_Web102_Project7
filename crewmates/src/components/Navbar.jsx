import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Home</Link>
      <Link to="/create" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Create a Crewmate</Link>
      <Link to="/gallery" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Crewmate Gallery</Link>
    </nav>
  )
}

export default Navbar;