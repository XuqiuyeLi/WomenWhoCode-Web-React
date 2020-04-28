describe('Add New Event Scenario', () => {
  before(() => {
    cy.task('queryDB', 'DELETE FROM `events`')
  })

  function createNewEvent() {
    cy.visit('http://localhost:3000/add-event')
    cy.contains('Name').type('Test Event')
    cy.contains('Venue').type('Test Event Venue')
    cy.contains('Date').type('2020-05-01')
    cy.contains('Start Time').type('07:00')
    cy.contains('End Time').type('15:00')
    cy.contains('Description').type('Some test description')
    cy.contains('Submit').click()
  }

  it('Add and show added event', () => {
    createNewEvent()


    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Test Event')
  })

  it('Show new event details', () => {
    cy.contains('Test Event').click({force: true})


    cy.url().should('match', /^http:\/\/localhost:3000\/events\/\w+$/)
    cy.contains('EventDetail')
    cy.contains('Test Event')
    cy.contains('Some test description')
  })
})