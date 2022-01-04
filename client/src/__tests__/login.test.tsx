import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SignInPage } from '../pages';

describe('<SignInPage/>', () => {
    it('upon clicking `login` button and when both fields are left empty, it shows a message informing user to fill in the form', async () => {
        const { findByText, findByRole } = render(<SignInPage />);
        const loginBtn = await findByRole('button', {
            name: /zaloguj się/i,
        });

        fireEvent.click(loginBtn);

        expect(
            await findByText(
                /Wprowadź nazwę użytkownika Spotify lub adres e-mail./i
            )
        ).toBeInTheDocument();
        expect(await findByText(/Wpisz swoje hasło/i)).toBeInTheDocument();
    });

    it('when user fill in the field then remove the text, it shows a message that field is empty', async () => {
        const { getByPlaceholderText } = render(<SignInPage />);

        const email = getByPlaceholderText(
            /Adres e-mail lub nazwa użytkownika/i
        );
        const password = getByPlaceholderText(/Hasło/i);

        userEvent.type(email, 'email');
        userEvent.type(password, 'password');
        fireEvent.change(email, { target: { value: '' } });
        fireEvent.change(password, { target: { value: '' } });

        await waitFor(() => {
            const emailError = screen.queryByText(
                /Wprowadź nazwę użytkownika Spotify lub adres e-mail./i
            );
            const passError = screen.queryByText(/Wpisz swoje hasło/);

            expect(emailError).toBeInTheDocument();
            expect(passError).toBeInTheDocument();
        });
    });
});
