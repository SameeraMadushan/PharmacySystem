var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'); //for encrypting passwords


// set up a mongoose models
var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    possition: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    contactno: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});
/**
 * Encrypt the password before saving
 */
UserSchema.pre('save', function (next) {
    var user = this;
    //if pw is modify  ... eg/ pw:abc
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/**
 * Comparing password when logging
 */
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);