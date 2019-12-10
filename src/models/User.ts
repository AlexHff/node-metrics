import db from "../db";
import bcrypt, { hash } from "bcrypt";

const bcryptRegex = /^\$2[ayb]\$.{56}$/;

export class User {
    username: string;
    email: string;
    password: string = "";

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        if (bcryptRegex.test(password)) {
            this.password = password;
        } else {
            this.password = bcrypt.hashSync(password, 10);
        }
    }

    static getFromDB(username: string, value: any): User {
        const [password, email] = value.split(":");
        return new User(username, email, password);
    }

    public comparePassword(candidatePassword: string, callback: (err: any, isMatch: any) => void) {
        bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
            callback(err, isMatch);
        });
    }
}

export class UserHandler {
    public get(username: string, callback: (err: Error | null, result?: User) => void) {
        db.get(`user:${username}`, function (err: Error, data: any) {
            if (err) return callback(err);
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
        });
    }
}
