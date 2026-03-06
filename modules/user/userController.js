const User = require('./userModel');

const bcrypt = require('bcryptjs');

exports.register = async(req, res) => {
    const { username, email, password, confirmPassword, fullName } = req.body;
    try
    {
        if (password !== confirmPassword) {
            req.flash('error', 'As senhas não coincidem.');
            return res.direct('/register');
        }

        // 2 - verificar se o usuario ou o email ja existem no banco 
        const emailExists = await User.findOne({where: {email}});
        const usernameExists = await User.findOne({where:{username}});
        if (emailExists || usernameExists) {
            req.flash('error', 'Este email ou usuario já está cadastrado.');
            return res.redirect('/register');
        }

        // 3  - ja que o email e o usarname estao ok, e as senhas batem
        // encriptar a senha

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password, salt);
        console.log(password, hashedPassword);

        // 4 - inserir o registro no banco de dados
        await User.create({
            username, 
            email, 
            password: hashedPassword,
            fullName
        });

        // 5 - redireciona o novo usuario para o login
        req.flash('sucess', 'Conta criada com sucesso! Faça seu login.');
        res.redirect("/login");

    }
        catch (error)
        {
            console.log(error);
            req.flash('error', 'Erro ao criar conta, tente novamente.');
            req.redirect('/register');
        }
};

