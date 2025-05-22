import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Exchanges from './components/Exchanges';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Layout>
          <div className="p-12">
            <Routes>
              <Route
                exact
                path="/"
                element={<HomePage />}
              />
              <Route
                exact
                path="/exchanges"
                element={<Exchanges />}
              />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route
                exact
                path="/exchanges"
                element={<Exchanges />}
              />
              <Route
                exact
                path="/cryptocurrency/:coinId"
                element={<CryptoDetails />}
              />
              <Route
                exact
                path="/news"
                element={<News />}
              />
            </Routes>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
};

export default App;
