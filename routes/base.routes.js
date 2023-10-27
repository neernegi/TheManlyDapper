import express from 'express';

const baseRouter = express.Router();

baseRouter.get('/', function(req, res) {
    res.redirect('/products');
});

baseRouter.get('/401', function(req, res){
    res.status(401).render('shared/401');
});

baseRouter.get('/403', function(req, res){
    res.status(403).render('shared/403');
});


export default baseRouter; 