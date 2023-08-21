import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

export const validateUsername = (username) => {
    return !isEmpty(username)
}

export const validateEmail = (email) => {
    return !isEmpty(email) && isEmail(email)
}