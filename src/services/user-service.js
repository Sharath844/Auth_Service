const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    async signIn(email, plainPassword)
    {
        try {
            //step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2-> compare incoming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordMatch)
            {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            //step 3-> If password match then create a token and send it to the user
            const newJWt = this.createToken({email: user.email, id: user.id});
            return newJWt; 
        } catch (error) {
            console.log("Something went wrong in signin process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user)
            {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch(error) {
            console.log("Somethig went wrong in the auth process");
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password encryption");
            throw error;
        }
    }
}

module.exports = UserService;