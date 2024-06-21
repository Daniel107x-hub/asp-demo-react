import Login from "./Login"
import { renderWithProviders } from "../../utils/test-utils"
import { fireEvent, screen } from "@testing-library/react";
import { v4 as uuidv4 } from 'uuid';

describe('It loads login screen', () => {
    it('Doesn\'t break when loading', () => {
        renderWithProviders(<Login/>);
    })

    it('Matches DOM Snapshot', () => {
        const domTree = renderWithProviders(<Login/>).asFragment();
        expect(domTree).toMatchSnapshot();
    })

    it('Loads login title', () => {
        renderWithProviders(<Login/>);
        const title = screen.getByText('Login');
        expect(title).toBeInTheDocument();
    })

    it('Loads input fields empty', () => {
        renderWithProviders(<Login/>);
        const emailField = screen.getByLabelText('Email');
        expect(emailField.value).toBe('');
        const passwordField = screen.getByLabelText('Password');
        expect(passwordField.value).toBe('');
    })

    it('Submit button is disabled when fields are empty', () => {
        renderWithProviders(<Login/>);
        const emailField = screen.getByLabelText('Email');
        fireEvent.change(emailField, {target: {value: ''}});
        expect(emailField.value).toBe('');
        const passwordField = screen.getByLabelText('Password');
        fireEvent.change(passwordField, {target: {value: ''}});
        expect(passwordField.value).toBe('');
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeDisabled();
    })

    it('Enables submit button if fields are not empty', () => {
        renderWithProviders(<Login/>);
        const randomString = uuidv4();
        const emailField = screen.getByLabelText('Email');
        fireEvent.change(emailField, {target: {value: randomString}});
        expect(emailField.value).toBe(randomString);
        const passwordField = screen.getByLabelText('Password');
        fireEvent.change(passwordField, {target: {value: randomString}});
        expect(passwordField.value).toBe(randomString);
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeEnabled();
    })
})