export function isEmpty(value) {
    return (!value || value.trim()==='');
}


export function userCredentialsAreValid(email, password) {
    return (
        email && email.includes('@') && password && password.trim().length >= 6
    );
}

export function userDetailsAreValid(email, password, name, street, postal, city) {
    return (
        userCredentialsAreValid(email, password) && 
        !isEmpty(name) && !isEmpty(street) && !isEmpty(postal) && !isEmpty(city)
    );
}

export function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}


