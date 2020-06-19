User.findOne({
    $or: [{
        email: req.body.email
    }, {
        username: req.body.username
    }]
}).then(user => {
    if (user) {
        let errors = {};
        if (user.username === req.body.username) {
            errors.username = "User Name already exists";
        } else {
            errors.email = "Email already exists";
        }
        return res.status(400).json(errors);
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    }
})
.catch(err => {
    return res.status(500).json({
        error: err
    });
});