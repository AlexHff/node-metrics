import { User, UserHandler } from "../models/User";

const handler = new UserHandler();

describe("User", function() {
    describe("#save()", function() {
        it("should save without error", function(done) {
            const user = new User("Bob", "bob@gmail.com", "1234");
            handler.save(user, (err) => {
                if (err) done(err);
                else done();
            });
        });
    });

    describe("#get()", function() {
        it("should get without error", function(done) {
            handler.get("Bob", (err) => {
                if (err) done(err);
                else done();
            });
        });
        it("should return an error", function(done) {
            handler.get("BOBO", (err) => {
                if (err) done();
                else done(err);
            });
        });
    });

    describe("#comparePassword()", function() {
        it("should return true", function(done) {
            handler.get("Bob", (err, user) => {
                if (err) done(err);
                user?.comparePassword("1234", (err, isMatch) => {
                    if (err || !isMatch) done(err);
                    else done();
                })
            });
        });
        it("should return false", function(done) {
            handler.get("Bob", (err, user) => {
                if (err) done(err);
                user?.comparePassword("4321", (err, isMatch) => {
                    if (err || isMatch) done(err);
                    else done();
                })
            });
        });
    });

    describe("#delete()", function() {
        it("should delete without error", function(done) {
            handler.delete("Bob", (err) => {
                if (err) done(err);
                else done();
            });
        });
    });
});
