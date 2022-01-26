/// <reference types="cypress"/>

describe('Login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('tests logging into test account', () => {
        cy.findByRole('link', { name: /zaloguj się/i }).click();
        cy.url().should('eq', 'http://localhost:3000/login');

        // show errors when fields are left empty
        cy.findByRole('button', { name: /zaloguj się/i }).click();
        cy.findByText(
            /wprowadź nazwę użytkownika spotify lub adres e\-mail\./i
        ).should('be.visible');
        cy.findByText(/wpisz swoje hasło\./i).should('be.visible');

        // remove errors when user fill one of the fields
        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]').type(
            'testowy'
        );
        cy.findByText(
            /wprowadź nazwę użytkownika spotify lub adres e\-mail\./i
        ).should('not.exist');
        cy.get('input[placeholder*="Hasło"]').type('1234');
        cy.findByText(/wpisz swoje hasło\./i).should('not.exist');

        // show errors when user clear fields
        cy.get(
            'input[placeholder*="Adres e-mail lub nazwa użytkownika"]'
        ).clear();
        cy.findByText(
            /wprowadź nazwę użytkownika spotify lub adres e\-mail\./i
        ).should('be.visible');
        cy.get('input[placeholder*="Hasło"]').clear();
        cy.findByText(/wpisz swoje hasło\./i).should('be.visible');

        // inform user about incorrect credentials
        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]').type(
            'awda'
        );
        cy.get('input[placeholder*="Hasło"]').type('awdw');
        cy.findByRole('button', { name: /zaloguj się/i }).click();
        cy.findByRole('alert');

        // redirect user upon successfull login
        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]')
            .clear()
            .type('testowy');
        cy.get('input[placeholder*="Hasło"]').clear().type('1234');
        cy.findByRole('button', { name: /zaloguj się/i }).click();
        // .should(() => {
        //     // get token first
        //     // expect(localStorage.getItem('authUser')).to.eq(
        //     //     '{"id":1,"email":"test@mail.com","username":"testowy","birth_date":"1998-12-31T23:00:00.000Z","gender":"male","send_newsletter":0,"image_url":"/images/avatars/1.jpg","role":"RegularUser","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjQxMzE4NTAwLCJleHAiOjE2NDE0MDQ5MDB9.WR066gEkKoeYrxiXtZfGRIJ-uJkLNIx595ZRe5dr5l8"}'
        //     // );
        // });
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('allows user to logout with a button click', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]')
            .clear()
            .type('testowy');
        cy.get('input[placeholder*="Hasło"]').clear().type('1234');
        cy.findByRole('button', { name: /zaloguj się/i }).click();

        cy.findByRole('button', {
            name: /account of the current user/i,
        }).click();
        cy.findByRole('menuitem', { name: /wyloguj/i })
            .click()
            .should(() => {
                expect(localStorage.getItem('authUser')).to.be.null;
            });
    });

    it('prevents user from visiting `login` and `register` page when the user is already logged in', () => {
        cy.visit('http://localhost:3000/signup');
        cy.url().should('eq', 'http://localhost:3000/signup');
        cy.visit('http://localhost:3000/login');
        cy.url().should('eq', 'http://localhost:3000/login');

        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]')
            .clear()
            .type('testowy');
        cy.get('input[placeholder*="Hasło"]').clear().type('1234');
        cy.findByRole('button', { name: /zaloguj się/i }).click();

        cy.visit('http://localhost:3000/login');
        cy.url().should('eq', 'http://localhost:3000/');
        cy.visit('http://localhost:3000/signup');
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('redirect user to sign up page when `signup` button is clicked', () => {
        cy.visit('http://localhost:3000/login');
        cy.findByRole('link', { name: /zarejestruj się w spotify/i }).click();
        cy.url().should('eq', 'http://localhost:3000/signup');
    });

    it('redirect user to password reset page when `forgot password` button is clicked', () => {
        cy.visit('http://localhost:3000/login');
        cy.findByRole('link', { name: /nie pamiętasz hasła\?/i }).click();
        cy.url().should('eq', 'http://localhost:3000/password-reset');
    });

    it('shows register banner when user is not logged in and media player when is logged in', () => {
        cy.findByText(
            /zarejestruj się, aby słuchać utworów i podcastów przerywanych sporadycznie reklamami\. nie wymagamy podania numeru karty kredytowej\./i
        ).should('be.visible');

        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]')
            .clear()
            .type('testowy');
        cy.get('input[placeholder*="Hasło"]').clear().type('1234');
        cy.findByRole('button', { name: /zaloguj się/i }).click();

        cy.findByRole('button', { name: /play\/pause/i }).should('be.visible');
    });
});
