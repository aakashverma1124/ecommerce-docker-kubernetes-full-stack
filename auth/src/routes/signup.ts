import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 to 20 characters')
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        console.log("Email:", email);
        console.log("Password:", password);
        throw new Error('DB Error ');

        res.send({});
    }
);

export { router as signupRouter };