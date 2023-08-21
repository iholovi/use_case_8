import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormTextField} from "./FormTextField";
import {updateFormState} from "../features/form/formSlice";
import {validateEmail, validateUsername} from "../helpers/validators";

const getInitialFormState = (fieldsObj) => {
    return Object.entries(fieldsObj).reduce((acc, [name, value]) => {
        return {...acc, fields: {...acc.fields, [name]: {value, isValid: null}}};
    }, {fields: {}, isFormValid: null});
}

export const Form = () => {
    const dispatch = useDispatch();
    const formFields = useSelector(state => state.form);
    const [formState, setFormState] = useState(getInitialFormState(formFields));
    const {
        fields: {
            firstName, lastName, email
        }, isFormValid
    } = formState;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFields = Object.entries(formState.fields).reduce((acc, [name, {value}]) => {
            return {...acc, [name]: value};
        }, {});

        dispatch(updateFormState(newFields));
    }

    const handleFieldChange = ({name, value, isValid}) => {
        const updateField = fields => ({...fields, [name]: {value, isValid}});
        const updateValidity = newFields => Object.values(newFields).every((field) => field.isValid);

        setFormState(prevState => {
            const fields = updateField(prevState.fields);
            const isFormValid = updateValidity(fields);

            return {
                fields, isFormValid
            }
        });
    }

    const getFieldHandler = (validationFunc) => (e) => {
        const {name, value} = e.target;
        const isValid = validationFunc(value);

        handleFieldChange({name, value, isValid});
    }

    const nameInputHandler = getFieldHandler(validateUsername);
    const emailInputHandler = getFieldHandler(validateEmail);

    return (<form onSubmit={handleSubmit}>
        <FormTextField value={firstName.value} onChange={nameInputHandler} name="firstName" label="First name"/>
        <FormTextField value={lastName.value} onChange={nameInputHandler} name="lastName" label="Last name"/>
        <FormTextField value={email.value} onChange={emailInputHandler} name="email" label="Email" type="email"/>

        <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>)
};