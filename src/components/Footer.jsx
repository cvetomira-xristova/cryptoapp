import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-teal-50 text-center mb-8 uppercase">
          Cryptoverse
        </h1>

        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 uppercase">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-teal-900">
            Home
          </Link>
          <Link
            to="/exchanges"
            className="flex items-center gap-2 text-white hover:text-teal-900">
            Exchanges
          </Link>
          <Link
            to="/cryptocurrencies"
            className="flex items-center gap-2 text-white hover:text-teal-900">
            Cryptocurrencies
          </Link>
          <Link
            to="/news"
            className="flex items-center gap-2 text-white hover:text-teal-900">
            News
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
