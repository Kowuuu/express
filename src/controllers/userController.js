
module.exports={
    getUser:(req,res)=>{
        res.send("Test 123")
    },
    getUserById:(req,res)=>{
        const {id} = req.params;

        res.send("This works "+id)
    }
}