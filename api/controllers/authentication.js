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

exports.addFriend = function(req, res) {
    const userId = req.params.user_id;
    const friendId = req.body.friendId;
  
    Users.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
  
        Users.findById(friendId)
          .then(friend => {
            if (!friend) {
              return res.status(404).json({ message: 'Ami introuvable' });
            }
  
            if (user.friends.includes(friendId)) {
              return res.status(400).json({ message: 'Cet ami est déjà ajouté' });
            }
  
            user.friends.push(friendId);
            friend.friends.push(userId);
  
            Promise.all([user.save(), friend.save()])
              .then(([savedUser]) => {
                res.status(200).json({ success: true, message: "Ami ajouté avec succès", data: savedUser });
              })
              .catch(err => {
                res.status(500).json({ success: false, message: err });
              });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.removeFriend = function(req, res) {
    const userId = req.params.user_id;
    const friendId = req.params.friend_id;
  
    Users.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
  
        Users.findById(friendId)
          .then(friend => {
            if (!friend) {
              return res.status(404).json({ message: 'Ami introuvable' });
            }
  
            const friendIndex = user.friends.indexOf(friendId);
            if (friendIndex === -1) {
              return res.status(400).json({ message: 'Cet ami n\'est pas dans votre liste d\'amis' });
            }
  
            user.friends.splice(friendIndex, 1);
  
            const userIndex = friend.friends.indexOf(userId);
            if (userIndex === -1) {
              return res.status(400).json({ message: 'Vous n\'êtes pas dans la liste d\'amis de cet utilisateur' });
            }
  
            friend.friends.splice(userIndex, 1);
  
            Promise.all([user.save(), friend.save()])
              .then(([savedUser, savedFriend]) => {
                res.status(200).json({ success: true, message: "Ami supprimé avec succès", data: savedUser });
              })
              .catch(err => {
                res.status(500).json({ success: false, message: err });
              });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };