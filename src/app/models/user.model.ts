export class userModel {
    _id: string;
    username: string;
    password: string;
    status: string;
    email: string;
    prenom: string;
    nom: string;
    adresse: string;
    ville: string;
    pays: string;
    codePostal: string;
    bio: string;
    friends: string[];
    
    constructor(_id: string,username: string, password: string, status: string, email:string, 
                prenom: string, nom: string, adresse: string, ville: string, 
                pays: string, codePostal: string, bio: string, friends: string[]) {
      this._id = _id;
      this.username = username;
      this.password = password;
      this.status = status;
      this.email = email;
      this.prenom = prenom;
      this.nom = nom;
      this.adresse = adresse;
      this.ville = ville;
      this.pays = pays;
      this.codePostal = codePostal;
      this.bio = bio;
      this.friends = friends;
    }
}