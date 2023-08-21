import React from 'react';
import { Provider } from 'react-redux';
import {render, screen, fireEvent, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import formReducer from './app/features/form/formSlice';

describe('App', () => {
    it('renders the Form component', () => {
        const mockStore = configureStore({
            reducer: {
                form: () => ({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                }),
            },
        });

        render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );

        expect(screen.getByLabelText('First name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('updates store state after form submission', async () => {
        const store = configureStore({ reducer: { form: formReducer } });

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        act(() => {
            userEvent.type(screen.getByLabelText('First name'), 'Ivan');
            userEvent.type(screen.getByLabelText('Last name'), 'Holovin');
            userEvent.type(screen.getByLabelText('Email'), 'ivan@holovin.com');
        });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await screen.findByText(/"firstName": "Ivan"/i);
        await screen.findByText(/"lastName": "Holovin"/i);
        await screen.findByText(/"email": "ivan@holovin.com"/i);
    });
});