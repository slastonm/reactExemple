import { useState, useEffect } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Section from './pages/Section';
import SingleProduct from './pages/SingleProduct';
import Authentication from './components/Authentication';
import Basket from './pages/Basket';
import Register from './components/Register';
import Example from './pages/Example';
import CategoryProducts from './components/CategoryProducts'
import NewSidebar from './components/NewSidebar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories/")
      .then(resp => resp.json())
      .then(data => setProduct(data));
  }, []);

  const [prod, setProd] = useState([]);
  const [visability, setVisbility] = useState(10);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products/")
      .then(resp => resp.json())
      .then(data => setProd(data.slice(0, visability)));
  }, [visability]);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const selectProd = (product) => {
    setSelectedProduct(selectProduct => [...selectProduct, product]);
  };

  function remove(idx) {
    setSelectedProduct(prod => prod.filter((value, index) => index !== idx));
  }

  console.log(selectedProduct);

  return (
    <>
      <Router>
        <Header prod={prod} />
        <div className="container d-flex">
          {/* <Sidebar product={product} /> */}
          <NewSidebar product={product}></NewSidebar>
          <Routes>
            <Route path="/" element={<Section prod={prod} selectProd={selectProd} />} />
            <Route path="/example" element={<Example />} />
            <Route path="/categories/:id" element={<CategoryProducts />} />
            <Route path="/products" element={<SingleProduct />} />
            <Route path="/basket" element={<Basket />} selectedProduct={selectedProduct} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
