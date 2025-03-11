// In Basket.jsx:
function Basket({selectedProduct, remove}) {
    
    function Basket({selectedProduct, remove}) {
        const totalPrice = selectedProduct ? selectedProduct.reduce((acc, product) => {
            const price = product.price || 0;
            return acc + price;
        }, 0) : 0;
        
    }

    return (
        <>
        <div className='container'>
            <h2>Basket</h2>
        
        {selectedProduct && selectedProduct.length > 0 ?
            <div className="card" style={{width: 18+'rem'}}>
                <ul className="list-group list-group-flush">
                    {selectedProduct.map(({title, price}, index) => {
                        return <li className="list-group-item d-flex justify-content-between" key={index}> 
                                {title}  {price} $
                            <button className="btn btn-danger" onClick={() => remove(index)}>Delete</button>
                        </li>
                    })}
                </ul>
                <div className="card-footer">
                    Total: {totalPrice} $
                </div>
            </div>:
            <div className='container my-5'>
                <p className='text-center align-middle'>Basket is empty</p>
            </div>
            }
        </div>
        </>
    );
}