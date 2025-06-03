import { Link } from 'react-router-dom';
import { HomeOutlined, FundOutlined, BulbOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-dark-lighter border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cryptoverse
          </h1>

          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="nav-link group"
            >
              <HomeOutlined className="text-primary group-hover:text-primary-light" />
              <span>Home</span>
            </Link>
            <Link
              to="/cryptocurrencies"
              className="nav-link group"
            >
              <FundOutlined className="text-primary group-hover:text-primary-light" />
              <span>Cryptocurrencies</span>
            </Link>
            <Link
              to="/news"
              className="nav-link group"
            >
              <BulbOutlined className="text-primary group-hover:text-primary-light" />
              <span>News</span>
            </Link>
          </nav>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Cryptoverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
