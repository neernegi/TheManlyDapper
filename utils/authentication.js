export function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}


export function destroyUserAuthSession(req) {
    req.session.uid = null;
}
