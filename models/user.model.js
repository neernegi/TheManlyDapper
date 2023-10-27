import bcrypt from 'bcryptjs';
import mongodb from 'mongodb';
import { getDb } from '../data/database.js';


class User {
    constructor (email,password,fullname,street,postal,city) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street : street,
            postalCode : postal,
            city : city
        }
    }

    static async findById(userId) {
        const uid = new mongodb.ObjectId(userId);

        return getDb().collection('users').findOne({_id:uid}, { projection: {password:0} });
    }

    getUserWithSameEmail() {
        return getDb().collection('users').findOne({ email:this.email })
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if(existingUser) {
            return true;
        }
        return false;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            fullname: this.fullname,
            address :this.address
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
}

export default User;