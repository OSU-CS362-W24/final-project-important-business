// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require("@testing-library/cypress/add-commands")

Cypress.Commands.add("useButton", function (text) {
    cy.findByRole("button", { name: text }).click()
})

Cypress.Commands.add("useLink", function (text) {
    cy.findByText(text).click()
})

Cypress.Commands.add("putText", function (textbox, text) {
    cy.findByLabelText(textbox).type(text)
    })

Cypress.Commands.add("generateChart", function () {
    cy.useButton("Generate chart")
})

Cypress.Commands.add("populateValues", function () {
    cy.putText("X", '1')
    cy.putText("Y", '3')
})