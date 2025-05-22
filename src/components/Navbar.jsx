import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  BulbOutlined,
  MoneyCollectOutlined,
  FundOutlined,
} from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  return (
    <div className="flex flex-col px-6 py-4 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800">
      <div className="flex items-center border-b border-1px pb-4 border-teal-50">
        <img
          src={icon}
          className="h-10 w-10 mr-2"
          alt="cryptoverse-logo"
        />
        <Link
          to="/"
          className="text-white font-bold text-2xl uppercase antialiased">
          Cryptoverse
        </Link>
      </div>

      <nav>
        <ul className="flex items-center gap-6 mt-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-teal-900">
              <HomeOutlined />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cryptocurrencies"
              className="flex items-center gap-2 text-white hover:text-teal-900">
              <FundOutlined />
              <span>Cryptocurrencies</span>
            </Link>
          </li>
          <li>
            <Link
              to="/exchanges"
              className="flex items-center gap-2 text-white hover:text-teal-900">
              <MoneyCollectOutlined />
              <span>Exchanges</span>
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className="flex items-center gap-2 text-white hover:text-teal-900">
              <BulbOutlined />
              <span>News</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
