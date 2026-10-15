const router=require('express').Router();
const adminController=require('../controllers/adminController');
const authMiddleware=require('../middlewares/authMiddleware');
const createJobValidation=require('../validators/jobs/create');

router.get('/companies',authMiddleware.admin ,adminController.showCompanies)
router.get('/technologies',authMiddleware.admin ,adminController.showTechnologies)
router.get('/jobs',authMiddleware.admin, adminController.showJobs)

router.post('/companies/add',authMiddleware.admin ,adminController.createCompany);
router.post('/technologies/add',authMiddleware.admin ,adminController.createTechnology);
router.post('/jobs/add',authMiddleware.admin, createJobValidation, adminController.createJob)

router.get('/technologies/delete/:id',authMiddleware.admin, adminController.deleteTechnology)
router.get('/companies/delete/:id',authMiddleware.admin, adminController.deleteCompany)
router.get('/jobs/delete/:id',authMiddleware.admin, adminController.deleteJob)

router.get('/jobs/search',authMiddleware.admin, adminController.searchJobs)
module.exports=router;