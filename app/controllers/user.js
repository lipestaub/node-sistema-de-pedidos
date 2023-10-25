module.exports.validateUser = function (application, req, res) {
    const data = req.body;

    req.assert('email', 'Preencha o campo E-mail!').notEmpty();
    req.assert('password', 'Preencha o campo Senha!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render('default/login', {errors: errors, data: data});
        return;
    }

    const connection = new application.config.connection().create();
    const userModel = new application.app.models.user(connection);

    userModel.getUserByEmailAndPassword(data, function(error, result) {
        if (typeof result === 'undefined' || result.length <= 0) {
            let errors = [{ msg: 'Usuário não encontrado! Verifique seus dados e tente novamente.' }]
            res.render('default/login', { errors: errors, data: data });
            return;
        }
        else {
            req.session.user_id = result[0].id;
            req.session.user_name = result[0].name;
            req.session.user_type_id = result[0].user_type_id;

            res.redirect('/products');
        }
    })
}

module.exports.showClientRegistrationForm = function (application, req, res) {
    res.render('user/clientRegistrationForm', {errors: {}, data: {}})
}

module.exports.registerClient = function (application, req, res) {
    const data = req.body;

    req.assert('name', 'Preencha o campo Nome!').notEmpty();
    req.assert('email', 'Preencha o campo E-mail!').notEmpty();
    req.assert('password', 'Preencha o campo Senha!').notEmpty();
    req.assert('password', 'O campo Senha deve conter, no mínimo, 6 caracteres!').len(6);
    req.assert('confirmPassword', 'Preencha o campo Confirmar Senha!').notEmpty();
    req.assert('confirmPassword', 'O campo Confirmar Senha deve conter, no mínimo, 6 caracteres!').len(6);

    let errors = req.validationErrors();

    if (data.password != data.confirmPassword) {
        errors.push({msg: 'Os campos Senha e Confirmar Senha estão com valores diferentes!'})
    }

    if (errors) {
        res.render('user/clientRegistrationForm', {errors: errors, data: data});
        return;
    }

    const connection = new application.config.connection().create();
    const userModel = new application.app.models.user(connection);

    userModel.getUserByEmail(data.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'Este e-mail já está sendo utilizado!' }]
            res.render('user/clientRegistrationForm', { errors: erros, data: data });
            return;
        }
        else {
            userModel.registerClient(data, function (error, result) {
                res.redirect('/login');
            })
        }
    })
}