import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import cryptoverseIcon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-dark/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <img
                src={cryptoverseIcon}
                className="h-10 w-10 relative"
                alt="logo"
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cryptoverse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-1 mb-0">
              <li>
                <Link
                  to="/"
                  className="nav-link">
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cryptocurrencies"
                  className="nav-link">
                  <FundOutlined />
                  <span>Cryptocurrencies</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="nav-link">
                  <BulbOutlined />
                  <span>News</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-lighter border-t border-white/5">
          <nav className="max-w-7xl mx-auto px-4 py-3">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}>
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cryptocurrencies"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}>
                  <FundOutlined />
                  <span>Cryptocurrencies</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}>
                  <BulbOutlined />
                  <span>News</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
