const LocalStrategy = require("passport-local").Strategy;
const model = require("../models");

function authConfig(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        model.User
            .findOne({
                id: id
            })
            .then(user => {
                done(null, user)
            })
            .catch(err => {
                done(err, null)
            })
    });
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
            model.User
                .findOne({
                    where:{email: username}
                })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }

                    if (user.password !== password) {
                        return done(null, false);
                    }

                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                })
        })
    )
}

module.exports = authConfig;