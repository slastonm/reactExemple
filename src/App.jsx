import { ProductProvider } from './context/ProductContext'; // імпортуй

function App() {
  return (
    <ProductProvider>
      <Router>
        <Header />
        <div className='container d-sm-flex d-block'>
          <Sidebar />
          <SwipeUp />
          <Routes>
            {/* Routes залишаються без змін, тільки видаляємо всі пропси, які раніше пробрасывались */}
            <Route path="/" element={<Section />} />
            <Route path="/basket" element={<Basket />} />
            {/* ... інші маршрути */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </ProductProvider>
  );
}
