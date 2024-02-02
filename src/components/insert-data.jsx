import React, { useState, useEffect } from 'react';
import axios from 'axios';


    const InsertData = () => {
        const [price, setPrice] = useState([]);
        const [name, setName] = useState([]);
        const [nameUser, setNameUser] = useState([]);
        const [email, setEmail] = useState([]);
        function addProduct() {
            let priceInteger = parseInt(price);
            const newProduct = {
              name: name,
              price: priceInteger,
            };

            console.log(newProduct)

            axios.post('http://localhost:5000/api/products', newProduct)
              .then(response => {
                console.log('Product added successfully:', response.data);
              })
              .catch(error => {
                console.error('Error adding product:', error.response.data);
            });
        }

        function addUser() {
            const newUser = {
              username: nameUser,
              email: email,
            };

            console.log(newUser)

            axios.post('http://localhost:5000/api/users', newUser)
              .then(response => {
                console.log('User added successfully:', response.data);
              })
              .catch(error => {
                console.error('Error adding User:', error.response.data);
            });
        }
    return (
        <>
        <div className="add-product-form">
            <div className="container-cs">
                <div className="grid-pd">
                    <p>Product Name</p>
                    <p>Product price</p>
                </div>
                <div className="grid-pd">
                    <input type="text" onChange={(e) => setName(e.target.value)} className="name-product" />
                    <input type="number" onChange={(e) => setPrice(e.target.value)} className="price-product" />
                    <input type="button" onClick={addProduct} value="Add product" />
                </div>
                <div className="grid-pd">
                    <p>User Name</p>
                    <p>User Email</p>
                </div>
                <div className="grid-pd">
                    <input type="text" onChange={(e) => setNameUser(e.target.value)} className="name-user" />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="email-user" />
                    <input type="button" onClick={addUser} value="Add User" />
                </div>
            </div>
        </div>
        </>
    );
};


export default InsertData;
