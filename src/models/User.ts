import db from "../db";
import bcrypt from "bcrypt";

export class User {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
    console.log(this);
  }

  static getFromDB(username: string, value: any): User {
    const [password, email] = value.split(":");
    return new User(username, email, password);
  }
}

export class UserHandler {
  public get(username: string, callback: (err: Error | null, result?: User) => void) {
    db.get(`user:${username}`, function (err: Error, data: any) {
      if (err) callback(err);
      else if (data == undefined) callback(null, data);
      callback(null, User.getFromDB(username, data));
    });
  }

  public save(user: User, callback: (err: Error | null) => void) {
    db.put(`user:${user.username}`, `${user.password}:${user.email}`, (err: Error | null) => {
      callback(err);
    });
  }

  public delete(username: string, callback: (err: Error | null) => void) {
    db.del(`user:${username}`, function (err: Error) {
      if (err) callback(err);
    })
  }
}

