const mongoose = require('mongoose');
const UserModel = require('./models/userSchema');
const ProductModel = require('./models/productSchema');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

module.exports = async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      if (req.url === '/api/users') {
        try {
          const users = await UserModel.find();
          res.json(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else if (req.url.startsWith('/api/users/')) {
        try {
          const userId = req.url.split('/').pop();
          const user = await UserModel.findById(userId);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          console.error('Error fetching User by ID:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else if (req.url === '/api/products') {
        try {
          const products = await ProductModel.find();
          res.json(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else if (req.url.startsWith('/api/products/')) {
        try {
          const productId = req.url.split('/').pop();
          const product = await ProductModel.findById(productId);
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.json(product);
        } catch (error) {
          console.error('Error fetching product by ID:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      break;

    case 'POST':
      if (req.url === '/api/users') {
        try {
          const newUser = new UserModel(body);
          await newUser.save();
          res.status(201).send();
        } catch (error) {
          console.error('Error adding user:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else if (req.url === '/api/products') {
        try {
          const newProduct = new ProductModel(body);
          await newProduct.save();
          res.status(201).send();
        } catch (error) {
          console.error('Error adding product:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      break;

    case 'DELETE':
      if (req.url.startsWith('/api/users/')) {
        try {
          const userId = req.url.split('/').pop();
          const deletedUser = await UserModel.findByIdAndDelete(userId);
          if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } catch (error) {
          console.error('Error deleting user by ID:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else if (req.url.startsWith('/api/products/')) {
        try {
          const productId = req.url.split('/').pop();
          const deletedProduct = await ProductModel.findByIdAndDelete(productId);
          if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
        } catch (error) {
          console.error('Error deleting product by ID:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
