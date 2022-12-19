
import { compareSync } from 'bcrypt';
import passport from 'passport'
import LocalStrategy from ('passport-local').Strategy;
import UserModel from '../models/userModel'

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); } //When some error occurs

            if (!user) {  //When username is invalid
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!compareSync(password, user.password)) { //When password is invalid 
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user); //When user is valid
        });
    }
));