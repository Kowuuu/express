const Company = require('../models/companyModle');
const Technology = require('../models/technologyModel');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const CoreModel=require('../models/coreModel');
const JobTechnology = require("../models/jobTechnology");
const {validationResult} = require('express-validator');

module.exports = {
    showCompanies: async (req, res) => {
        res.render('admin/companies', {
            companies: await CoreModel.getAll(Company.tableName)
        });
    },
    showTechnologies: async (req, res) => {
        res.render('admin/technologies', {
            technologies: await CoreModel.getAll(Technology.tableName)
        });
    },
    showJobs: async (req, res) => {
        res.render('admin/jobs', {
            jobs: await CoreModel.getAll(Job.tableName),
            users: await CoreModel.getAll(User.tableName),
            companies: await CoreModel.getAll(Company.tableName),
            technologies: await CoreModel.getAll(Technology.tableName),
            errors:[]
        })
    },
    createCompany: async (req, res) => {
        await CoreModel.create(Company.tableName,{name:req.body.name})
        return res.redirect('/admin/companies')
    },
    createTechnology: (req, res) => {
        Technology.create(req.body.name)
        return res.redirect('/admin/technologies')
    },
    createJob: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin/jobs', {
                jobs: await CoreModel.getAll(Job.tableName),
                users: await CoreModel.getAll(User.tableName),
                companies: await CoreModel.getAll(Company.tableName),
                technologies: await CoreModel.getAll(Technology.tableName),
                errors: errors.array()
            });
        }

        const job = {
            user_id: req.body.user_id,
            company_id: req.body.company_id,
            title: req.body.title,
            salary: req.body.salary || null,
            due_date: req.body.due_date
        };

        const jobId = await CoreModel.create(Job.tableName, job);
        console.log(req.body.technology);
        req.body.technology.forEach(technology => {
            CoreModel.create(JobTechnology.tableName, {
                'job_id': jobId,
                'technology_id': technology
            })
        })

        return res.send("It works!")
    },
    deleteTechnology: (req, res) => {
        const {id} = req.params;
        CoreModel.deleteById(Technology.tableName, id);
        return res.redirect('/admin/technologies')
    },
    deleteCompany: (req, res) => {
        const {id} = req.params;
        CoreModel.deleteById(Company.tableName, id);
        return res.redirect('/admin/companies')
    },
    searchJobs: async (req, res) => {
        const title = req.query.title;
        //search?title=Toma&salary=5000=>{title: 'Toma',  salary:5000}
        const filters=req.query;
        let sql="SELECT * FROM jobs";
        const conditions=[]; //WHERE name LIKE '%Toma%' AND salary>=5000
        const values=[]; //salary=5000
        const technologies=[];

        const fields={
            string_fields: ['title'],
            other_fields: ['id','user_id','company_id','salary'],
            date_fields:['due_date','created_at']
        }
        for(const[key,value] of Object.entries(filters)){
            if(value!==undefined && value!==null && value!==""){
                if(fields.string_fields.includes(key)){
                    conditions.push(`${key} LIKE ?`)// title LIKE ?
                    values.push(`%${value}%`);
                }else if(fields.other_fields.includes(key)){
                   conditions.push(`${key}=?`)   //salary=?
                    values.push(value)
                }else if(fields.date_fields.includes(key)){
                    conditions.push(`date(${key})=?`);
                    values.push(value)
                }
                if(key==="technology"){
                    technologies.push(value);
                }
            }
        }
        if(conditions.length>0){
            //['title LIKE?' ,'salary=?','due_date=2025']
            //=>WHERE title LIKE ? AND salary =? and due_date=2025
            sql+=" WHERE "+conditions.join(" AND ")
        }
        if(technologies.length>1){
            const prefix=conditions.length<1?" WHERE ": "AND";
            const placeholders=technologies.map(()=>"?").join(",");
            sql+=prefix+" id IN (SELECT job_id FROM job_technologies WHERE technology_id IN ("+placeholders+") )";
            values.push(...technologies);
        }
        res.render("admin/jobSearch",{
            jobs: await Job.search(sql,values)
        })
    },
    deleteJob(req,res){
        const {id} = req.params;
        CoreModel.deleteById(Job.tableName, id);
        return res.redirect('/admin/jobs')
    }
}