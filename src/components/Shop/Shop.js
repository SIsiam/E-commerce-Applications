import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        fetch('https://e-commerce-backhand.herokuapp.com/products?search=' + searchFilter)
            .then(respo => respo.json())
            .then(data => setProducts(data))
    }, [searchFilter])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://e-commerce-backhand.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])

    const handleSearch = (e) => {
        setSearchFilter(e.target.value)
    }

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }



    return (
        <div className="twin-container">
            <div className="product-container">
                {/* <form class="form-inline my-2 my-lg-0"> */}
                <form class="mb-5" style={{width:'50%', margin:'auto'}}>
                    <input className="form-control mr-sm-2" type="search" onChange={handleSearch} placeholder="Search" aria-label="Search" />
                </form>
                <div className="row">

                    {
                        products.map(pd => <Product key={pd.key}
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={pd} />)
                    }
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;