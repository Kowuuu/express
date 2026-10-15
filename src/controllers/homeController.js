

module.exports={
    showHome:(req,res)=>{
        req.session.test=true;
        res.send("Hello World")
    },
    showLogin:(req,res)=>{
        const error=req.session.error;
        req.session.error=null; //odma je brises da ne ostane
        res.render('login', {error});   //render je prikazivanje necega
    },
    showRegister:(req,res)=>{
        const error=req.session.error;
        req.session.error=null;
        res.render('register',{error});
    },
    showDashboard:(req,res)=>{
        if(!req.session || !req.session.userId){
            return res.redirect('/login');
        }

        res.render('dashboard');
    },
    showSettings:(req,res)=>{
        if(!req.session || !req.session.userId){
            return res.redirect('/login');
        }
        res.render('settings');
    }
};