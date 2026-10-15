
const {body}=require('express-validator');

const createJobValidation=[
    body('user_id').notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
    body('company_id').notEmpty().withMessage('Company ID is required')
    .isInt().withMessage('Company ID must be an integer'),
    body('title').notEmpty().withMessage('Title is required')
    .isLength({min:3}).withMessage('Title must be at least 3 characters long'),
    body('salary').isInt({min:0}).withMessage('Salary must be a positive number').optional({checkFalsy:true}),
    body('due_date').notEmpty().withMessage('Due date is required'),
    body('technology').isArray({min:1}).withMessage('At least one technology is required'),
    body('technology.*').isInt().withMessage('Technology IDs must be integers')
];

module.exports=createJobValidation;