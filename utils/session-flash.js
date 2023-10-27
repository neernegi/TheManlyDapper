export function getSessionData(req) {
    const sessionData = req.session.flashData;

    req.session.flashData = null;

    return sessionData;
}


export function flashDataToSession(req, data, action) {
    req.session.flashData = data;
    req.session.save(action);
}


