import expressSession from 'express-session';

import mongodbStore from 'connect-mongodb-session';



export function createSessionStore() {
    const MongoDBStore = mongodbStore(expressSession);


    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName:'online-shop',
        collection: 'session'
    });

    return store;
}

export function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store:createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 *1000
        }
    };
}


