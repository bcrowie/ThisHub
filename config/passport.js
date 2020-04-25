const Strategy = require("passport-jwt").Strategy;
const extract = require("passport-jwt").ExtractJwt;
const models = require("../models");
const User = models.User;
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = extract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findOne({ where: { id: jwt_payload.id } }).then(user => {
        if (user) return done(null, user);
        return done(null, false).catch(err => console.log(err));
      });
    })
  );
};
