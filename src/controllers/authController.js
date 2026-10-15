const db=require("../services/db");
const bcrypt=require("bcrypt");
const {saveErrorAndRedirect}=require("../helpers/sessionHelper");
const User=require("../models/userModel");

module.exports={
    login:async (req,res)=>{
        const {email,password} = req.body;
        const rows=await User.getByEmail(email);

        if(rows.length<1){
            return saveErrorAndRedirect(req,res,'/login',"This email doesent exist in the database");
        }
        const user=rows[0];
        const validPassword= await bcrypt.compare(password, user.password);//sifra koju je uneo sa sifrom u bazi
        if(!validPassword){
            return saveErrorAndRedirect(req,res,'/login',"Invalid password");
        }
        req.session.userId=user.id;
        req.session.loggedIn=true;
        req.session.role=user.role;

        return req.session.save(()=>{res.redirect('/dashboard');})
    },

    register: async (req,res)=> {
        const {name, email, password} = req.body;
        const rows=await User.getByEmail(email);
        if(rows.length>=1){
            return saveErrorAndRedirect(req,res,'/register',"Email taken");
        }
        const role= password==='ADMIN_SIFRA' ? 'admin' : 'user';

        req.session.userId = await User.create(name, email, password, role );
        req.session.loggedIn=true;
        req.session.role=role;

        return req.session.save(()=>{res.redirect('/dashboard');})
    },
    logout:(req,res)=> {
        req.session.destroy(()=>{
            res.redirect('/')      //kada se unisti sesija onda ovo
        })
    },
}