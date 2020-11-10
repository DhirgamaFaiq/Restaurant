const model = require("../models");
exports.createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    
    model.User
        .create({
            name: name,
            email: email,
            password: password
        })
        .then(user => {
            return res.json({
                msg: "Success, user added",
                user
            })
        })
        .catch(err => {
            return res.json({
                msg: "Error",
                err
            })
        })
}
