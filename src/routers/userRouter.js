
const router = require('express').Router();
const userController = require('./../controllers/userController');

//app.use('/user' + /      app.use je prefix za ove putanje vamo
router.get('/',userController.getUser)
//app.use('/user' + /:id => /user/5
router.get('/:id',userController.getUserById)

module.exports = router;