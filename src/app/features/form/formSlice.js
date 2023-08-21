import {createSlice} from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: "form",
    initialState: {
        firstName: {
            value: "",
            isValid: null,
        },
        lastName: {
            value: "",
            isValid: null,
        },
        email: {
            value: "",
            isValid: null,
        }
    },
    reducers: {
        updateField: (state, action) => {
            const {name, value, isValid} = action.payload;
            state[name].value = value;
            state[name].isValid = isValid;
        }
    }
});

export const {updateField} = formSlice.actions;

export default formSlice.reducer;