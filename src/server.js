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
      if (query.userId) {
        try {
          const user = await UserModel.findById(query.userId);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          console.error('Error fetching User by ID:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        try {
          const users = await UserModel.find();
          res.json(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      break;

    case 'POST':
      try {
        const newUser = new UserModel(body);
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      try {
        const deletedUser = await UserModel.findByIdAndDelete(query.userId);
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
      } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
