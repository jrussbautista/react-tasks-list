import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800">
      <div>
        <Link to="/">Taskly</Link>
      </div>
      <Link to="/about">About</Link>
    </header>
  );
};

export default Header;
