import React, { useState, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import axios from 'axios';
import InsertData from './components/insert-data';


function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    // Fetch users
    function reloadItems() {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetch products
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    }
    reloadItems()
  }, []);

  function deleteUser(userId) {
      const userIdToDelete = userId;

      axios.delete(`http://localhost:5000/api/users/${userIdToDelete}`)
        .then(response => {
          console.log('Product deleted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error deleting user:', error.response.data);
      });
  }

  function deleteProduct(productId) {
      const productIdToDelete = productId;

      axios.delete(`http://localhost:5000/api/products/${productIdToDelete}`)
        .then(response => {
          console.log('Product deleted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error deleting product:', error.response.data);
      });
  }

  return (
    <>
    <div className='products-data'>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <input type="button" data-user-id={user._id} onClick={(e)=> deleteUser(e.target.getAttribute('data-user-id'))} value="Delete User" />
          </li>
        ))}
      </ul>

      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <input type="button" data-product-id={product._id} onClick={(e) => deleteProduct(e.target.getAttribute('data-product-id'))} value="Delete product" />
          </li>
        ))}
      </ul>
    </div>
    <InsertData/>
    </>
  );
}

export default App;
