
module.exports= {
    auth: (req, res, next) =>{
        if (!req.session || !req.session.userId) {
            return res.redirect('/login');
        }
        next();  //nastavi dalje (pozovi kontroler)
    },
    guest: (req, res, next) =>{
        if (req.session && req.session.userId) {
            return res.redirect('/dashboard');
        }
        next();
    },
    admin: (req, res, next) =>{
        if(!req.session || req.session.role!=='admin'){
            return res.redirect('/login');
        }
        next();
    }
}