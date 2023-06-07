export class userModel {
    username: string;
    password: string;
    status: string;
    
    constructor(username: string, password: string, status: string) {
      this.username = username;
      this.password = password;
      this.status = status;
    }
}