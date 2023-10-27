import Cart from '../models/cart.model.js';


function initializeCart(req, res, next) {
    let cart;

    if(!req.session.cart) {
        cart = new Cart();
    } else {
        const sessionCart = req.session.cart;
        cart = new Cart(sessionCart.items, sessionCart.totalQuantity, sessionCart.totalPrice);
    }

    res.locals.cart = cart;

    next();
}



export default initializeCart;