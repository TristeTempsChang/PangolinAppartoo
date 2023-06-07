var Users = require('../models/user');

exports.postUser = function(req, res) {
    var user = new Users();

    user.username = req.body.username;
    user.password = req.body.password;

    console.log(user.username)
    user.save()
        .then(savedUser => {
            res.status(200).json({ success: true, message: "L'utilisateur a été créé avec succès", data: savedUser }).status(200);
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err });
        });
};

exports.login = function(req, res) {
    Users.findOne({ username: req.body.username })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            if (req.body.password !== user.password) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            res.status(200).json({
                userId: user._id,
                token: 'TOKEN',
                message: "YEEEEEES"
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUser = function(req,res) {
    Users.find()
         .then(users => {
            res.status(200).json({ success: true, message: "L'utilisateur a été trouvé avec succès", data: users }).status(200);
         })
         .catch(err => {
            res.status(500).json({ success: false, message: err });
         });
}

exports.getUserById = function(req,res) {
    Users.findById(req.params.user_id)
         .then(users => {
            res.status(200).json({ success: true, message: "L'utilisateur a été trouvé avec succès", data: users }).status(200);
         })
         .catch(err => {
            res.status(500).json({ success: false, message: err });
         });
}

exports.updateUser = function(req,res) {
    Users.findById(req.params.user_id)
    .then(users => {
        if(req.body.username) { users.username = req.body.username}
        if(req.body.password) { users.password = req.body.password}
        if(req.body.status) { users.status = req.body.status}

    users.save()
        .then(savedModifUser => {
            res.status(200).json({ success: true, message: "L'utilisateur a été modifé avec succès", data: savedModifUser }).status(200);
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err });
        });
    })
    .catch(err => {
       res.status(500).json({ success: false, message: err });
    });
}

exports.deleteUser = function(req,res) {
       Users.findByIdAndRemove(req.params.user_id)
       .catch(err => {
        res.status(500).json({ success: false, message: err });
       })
       res.status(200).json({ success: true, message: "L'utilisateur a été supprimé avec succès"}).status(200);
}

////////////////////////////