
const db=require('../services/db')

const Job={
    tableName: "jobs",

    async search(query,data){
        const [result]=await db.execute(query,data);
        return result
    }
}
module.exports=Job;