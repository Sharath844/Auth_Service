const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: 'Successfully created a new user',
            data: response,
            error: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            error: error,
            success: false
        });
    }
}
 
const signIn = async(req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            success: true,
            data: response,
            message: 'Successfully signed in',
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            error: error,
            success: false
        });
    }
}

module.exports = {
    create,
    signIn
}