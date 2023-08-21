import {createSlice} from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: "form",
    initialState: {
        firstName: "",
        lastName: "",
        email: ""
    },
    reducers: {
        updateFormState: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
        }
    }
});

export const {updateFormState} = formSlice.actions;

export default formSlice.reducer;