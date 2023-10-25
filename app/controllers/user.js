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