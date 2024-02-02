const express = require('express');
const mongoose = require('mongoose');

// Import Mongoose model(s)
const UserModel = require('./models/userSchema');
const ProductModel = require('./models/productSchema');

const app = express();
const PORT = process.env.PORT || 5000;
console.log(PORT)

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Atlas connection URL
const mongoURI =
  'mongodb+srv://faisalnazirpv11217:3YMtftZIT81OwxqQ@cluster0.locsgbv.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log('Connected to MongoDB Atlas');
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Example route for fetching users
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example route for adding a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send();
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a user by ID
app.get('/api/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching User by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to delete a user by ID
app.delete('/api/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error('Error deleting User by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Example route for fetching products
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example route for adding a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).send();
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a product by ID
app.get('/api/products/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to delete a product by ID
app.delete('/api/products/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      console.error('Error deleting product by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });