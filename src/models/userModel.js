const db =require('../services/db');
const bcrypt=require("bcrypt");

const User={
    tableName:'users',

    async create(name,email,password, role="user"){
        const hashedPassword=await bcrypt.hash(password,10)
        const [result] = await db.execute("INSERT INTO users (name,email,password,role) VALUES(?,?,?,?)",[name,email,hashedPassword,role])
        return result.insertId;
    },
    async getByEmail(email){
        const[rows]=await db.execute("SELECT * FROM users WHERE email=?",[email]);
        return rows;
    },

};
module.exports=User;