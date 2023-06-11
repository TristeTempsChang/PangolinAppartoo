var Users = require('../models/user');
const jwt = require('jsonwebtoken');

exports.postUser = function(req, res) {
    var user = new Users();

    user.username = req.body.username;
    user.password = req.body.password;
    user.status = req.body.status;
    user.email = req.body.email;
    user.prenom = req.body.prenom;
    user.nom = req.body.nom;
    user.adresse = req.body.adresse;
    user.ville = req.body.ville;
    user.pays = req.body.pays;
    user.codePostal = req.body.codePostal;
    user.bio = req.body.bio;

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
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                ),
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
        if(req.body.email) { users.email = req.body.email}
        if(req.body.prenom) { users.prenom = req.body.prenom}
        if(req.body.nom) { users.nom = req.body.nom}
        if(req.body.adresse) { users.adresse = req.body.adresse}
        if(req.body.ville) { users.ville = req.body.ville}
        if(req.body.pays) { users.pays = req.body.pays}
        if(req.body.codePostal) { users.codePostal = req.body.codePostal}
        if(req.body.bio) { users.bio = req.body.bio}

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