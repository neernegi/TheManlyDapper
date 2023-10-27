import User from '../models/user.model.js';
import { createUserSession, destroyUserAuthSession } from '../utils/authentication.js';
import { userDetailsAreValid, emailIsConfirmed } from '../utils/validation.js';
import { getSessionData, flashDataToSession } from '../utils/session-flash.js';


export function getSignup(req,res) {
    let sessionData = getSessionData(req);

    if(!sessionData) {
        sessionData = {
            email:'',
            confirmEmail:'',
            password:'',
            fullname:'',
            street:'',
            city:'',

        };
    }
    res.render('customer/auth/signup', { inputData:sessionData });
}

export async function signup(req,res, next) {

    const enteredData = {
        email : req.body.email,
        confirmEmail:req.body['confirm-email'],
        password :req.body.password, 
        fullname :req.body.fullname, 
        street    :req.body.street,
        postal  :req.body.postal, 
        city   :req.body.city
    }
    
    if(!userDetailsAreValid(
        req.body.email,
        req.body.password, 
        req.body.fullname, 
        req.body.street,
        req.body.postal, 
        req.body.city
      ) || !emailIsConfirmed(req.body.email, req.body['confirm-email'])
    ) {
        flashDataToSession(req, {
            errorMessage:'please check  your message input. Password must be at least 6 character long, postal code must be 5 character long.', ...enteredData
        }, function() {
            res.redirect('/signup');
        })
        
        return;
    }

    const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.street, req.body.postal, req.body.city);

    
    try {
        const existsAlready = await user.existsAlready();
        if(existsAlready) {
            flashDataToSession(req,{
                errorMessage: 'User exists already ! Try logging in instead!',...enteredData,
            }, function() {
                res.redirect('/signup');
            })
            return ;
        }
        await user.signup();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/login');
}

export function getLogin(req,res) {
    let sessionData = getSessionData(req);

    if(!sessionData) {
        sessionData = {
            email:'',
            password: ''
        }
    }
    res.render('customer/auth/login',{ inputData:sessionData });
}


export async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password);

    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }


    const sessonErrorData = {
        errorMessage: 'Invalid credentials - please double-check your email and password',
        email:user.email,
        password: user.password
    };

    if(!existingUser) {
        flashDataToSession(req,sessonErrorData, function() {
            res.redirect('/login');
        })
        
        return ;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if(!passwordIsCorrect) {
        flashDataToSession(req,sessonErrorData, function() {
            res.redirect('/login');
        })
        
        return;
    }

    createUserSession(req, existingUser, function() {
        res.redirect('/');
    });
}


export function logout(req, res) {
    destroyUserAuthSession(req);
    res.redirect('/login');
}

