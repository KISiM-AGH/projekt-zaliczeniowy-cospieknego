/// <reference types="cypress"/>

describe('Browsing the app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    /**
     *  This test case works assuming the 'Rock genre' tracklist has tracks and 'Radar genre' is empty.
     */
    it('allows user to find songs based on their genre/type', () => {
        // click the search button
        cy.findByRole('link', { name: /szukaj/i }).click();
        // @TODO edit document title

        // select a non-empty tracklist
        cy.get('[aria-label="podcasts"]').click();
        // cy.findByRole('columnheader', { name: /#/i }).should('be.visible');

        // repeat for an empty list
        cy.visit('http://localhost:3000/search');

        //cy.findByRole('link', { name: /radar/i }).click();
        //cy.location('pathname', { timeout: 60000 }).should('include', '/radar');

        // redirect to new releases
        // cy.findByRole('link', { name: /przejdź do nowych wydań/i }).click();
        // cy.location('pathname', { timeout: 60000 }).should(
        //     'include',
        //     '/new-releases'
        // );
        //cy.findByRole('columnheader', { name: /#/i }).should('be.visible');

        // @TODO edit document title
    });

    // @TODO
    // it('allows user to search content using the search bar')

    it('blocks non-loggedin users from accessing login-only content', () => {
        cy.findByRole('link', { name: /home/i });
        // @TODO - specify home page content
        // cy.findByRole('columnheader', { name: /#/i }).should('be.visible');

        cy.findByRole('link', { name: /szukaj/i }).click();
        cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/search'
        );
        cy.findByRole('heading', { name: /przeglądaj wszystko/i }).should(
            'be.visible'
        );

        cy.findByRole('link', { name: /biblioteka/i }).click();
        cy.findByText(/ciesz się biblioteką/i).should('be.visible');
        cy.findByRole('button', { name: /nie teraz/i }).click();
        cy.findByText(/ciesz się biblioteką/i).should('not.exist');

        cy.findByRole('link', { name: /utwórz playlistę/i }).click();
        cy.findByRole('heading', {
            name: /zaloguj się, aby tworzyć i udostępniać playlisty\./i,
        }).should('be.visible');
        cy.findByRole('button', { name: /nie teraz/i }).click();
        cy.findByRole('heading', {
            name: /zaloguj się, aby tworzyć i udostępniać playlisty\./i,
        }).should('not.exist');

        cy.findByRole('link', { name: /polubione utwory/i }).click();
        cy.findByText(/ciesz się polubionymi utworami/i).should('be.visible');
        cy.findByRole('button', { name: /nie teraz/i }).click();
        cy.findByText(/ciesz się polubionymi utworami/i).should('not.exist');

        cy.visit('http://localhost:3000/collection/album');
        cy.url().should('be.equal', 'http://localhost:3000/');

        cy.visit('http://localhost:3000/collection/tracks');
        cy.url().should('be.equal', 'http://localhost:3000/');
    });

    it('checks if it possible to access saved playlists/albums etc. when you are logged in', () => {
        cy.findByRole('link', { name: /zaloguj się/i }).click();
        cy.url().should('be.equal', 'http://localhost:3000/login');

        cy.get('input[placeholder*="Adres e-mail lub nazwa użytkownika"]').type(
            'testowy'
        );
        cy.get('input[placeholder*="Hasło"]').type('1234');
        cy.findByRole('button', { name: /zaloguj się/i }).click();
        cy.url().should('eq', 'http://localhost:3000/');

        cy.findByRole('link', { name: /szukaj/i }).click();
        cy.url().should('eq', 'http://localhost:3000/search');
        cy.findByRole('heading', { name: /przeglądaj wszystko/i }).should(
            'be.visible'
        );

        cy.get('[href="/collection/albums"]').click();
        // cy.findByRole('heading', { name: /albumy/i });

        // cy.get('[href="/collection/playlists"]').click();
        // cy.findByRole('heading', { name: /playlisty/i });

        // cy.get('[href="/collection/podcasts"]').click();
        // cy.findByRole('heading', { name: /podcasty/i });

        if (window.width > 1024) {
            cy.get('[href="/collection/artists"]').click();
            cy.findByRole('heading', { name: /wykonawcy/i });
        } else {
            cy.findByRole('button', { name: /więcej/i }).click();
            cy.get('[href="/collection/artists"]').click();
            cy.get('body').click(0, 0);
            //cy.findByRole('heading', { name: /wykonawcy/i });
        }
    });
});
