import {render, fireEvent, screen, act} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import reducer from "../features/form/formSlice";
import {Form} from "./Form";

const store = configureStore({
    reducer: {form: reducer},
});

store.dispatch = jest.fn();

describe("Form Component", () => {
    it('renders input elements', () => {
        render(<Provider store={store}>
            <Form/>
        </Provider>);

        expect(screen.getByLabelText('First name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('allows user to submit a form', async () => {
        const {getByLabelText, getByRole} = render(<Provider store={store}>
            <Form/>
        </Provider>);


        act(() => {
            userEvent.type(getByLabelText('First name'), 'Ivan');
            userEvent.type(getByLabelText('Last name'), 'Holovin');
            userEvent.type(getByLabelText('Email'), 'ivan@holovin.com');
        });

        fireEvent.click(getByRole('button', {name: /submit/i}));

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('does not allow user to submit an empty form', () => {
        const {getByRole} = render(<Provider store={store}>
            <Form/>
        </Provider>);

        expect(getByRole('button')).toBeDisabled();
    });

    it('does not allow to submit a form with invalid email', () => {
        const {getByLabelText, getByRole} = render(<Provider store={store}>
            <Form/>
        </Provider>);

        act(() => {
            userEvent.type(getByLabelText('First name'), 'Ivan');
            userEvent.type(getByLabelText('Last name'), 'Holovin');
            userEvent.type(getByLabelText('Email'), 'ivan');
        });

        expect(getByRole('button')).toBeDisabled();
    });
});