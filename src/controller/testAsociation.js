const { User, Role } = require('../model/assosiationsModels');
class Test {
  async findAllUsersWithRoles(req, res) {
    try {
      const users = await User.findAll({
        attributes: {exclude: ['password']},
        include: [
          {
            model: Role,
            attributes: ['name'] 
           
          }
        ]
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users with roles:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  }
}

module.exports = new Test();
