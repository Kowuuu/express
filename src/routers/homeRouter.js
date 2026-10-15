const router=require('express').Router();
const homeController=require('../controllers/homeController');
const authMiddleware=require('../middlewares/authMiddleware');
//req.method===GET && req.url==='/'
// app.get('/', (req, res) => {
//     res.send('hello world');
// })
router.get('/',homeController.showHome)
router.get('/home',homeController.showHome)
router.get('/login', authMiddleware.guest, homeController.showLogin)
router.get('/register', authMiddleware.guest, homeController.showRegister)
//protected routs, auth only!
router.get('/dashboard',authMiddleware.auth, homeController.showDashboard) //prvo pozove middleware
router.get('/settings',authMiddleware.auth, homeController.showSettings)

module.exports=router;