it('Correctly generates a line chart', () => {
    //Arrange
    cy.visit('/line.html');

    //Act
    cy.putText('Chart title', 'Cats vs. Dogs')
    cy.putText('X label', 'Cats')
    cy.putText('Y label', 'Dogs')
    cy.populateValues()
    cy.generateChart()

    //Assert
    cy.get('img').should("exist")
})

it('Correctly generates a bar chart', () => {
    //Arrange
    cy.visit('/bar.html');

    //Act
    cy.putText('Chart title', 'Cats vs. Dogs')
    cy.putText('X label', 'Cats')
    cy.putText('Y label', 'Dogs')
    cy.populateValues()
    cy.generateChart()

    //Assert
    cy.get('img').should("exist")
})

it('Correctly generates a scatter chart', () => {
    //Arrange
    cy.visit('/scatter.html');

    //Act
    cy.putText('Chart title', 'Cats vs. Dogs')
    cy.putText('X label', 'Cats')
    cy.putText('Y label', 'Dogs')
    cy.populateValues()
    cy.generateChart()

    //Assert
    cy.get('img').should("exist")
})