import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            />
            <Route
              path="/crypto/:coinId"
              element={<CryptoDetails />}
            />
            <Route
              path="/news"
              element={<News />}
            />
          </Routes>
        </Layout>
      </div>
      <Footer />
    </>
  );
};

export default App;
