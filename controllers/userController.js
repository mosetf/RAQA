const User = require('../models/User'); 

exports.updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;
        const user = await User.findById(userId);

        // Check if the username is unique
        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username is already taken' });
            }
        }

        // Update user details
        if (username) user.username = username;
        if (email) user.email = email;
        if (req.file) user.profilePicture = `/uploads/${req.file.filename}`;

        await user.save();
        res.json({ message: 'User details updated successfully', user });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Failed to update user details' });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password'); // Exclude the password field
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  };
  