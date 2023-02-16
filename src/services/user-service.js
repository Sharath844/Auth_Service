const jwt = require('jsonwebtoken');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            console.log(error); 
           throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(user, JWT_KEY, {expiresIn: '1h'});
            return response;
        } catch (error) {
            console.log("Something went wrong in token creation");
        }
    }
}

module.exports = UserService;