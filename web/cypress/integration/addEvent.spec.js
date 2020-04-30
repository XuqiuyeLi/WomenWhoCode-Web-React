describe('Add a new event', () => {
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
  describe('failed if user not logged in', () => {
    it('Add event should redirect user to login page', () => {
      createNewEvent()


      cy.url().should('eq', 'http://localhost:3000/login')
    })

    it('event should not be created', () => {
      cy.visit('http://localhost:3000/')


      cy.contains('Test Event').should('not.exist')
    })
  })

  function login() {
    cy.visit('http://localhost:3000/login')
    cy.contains('username').type('foo')
    cy.contains('password').type('bar')
    cy.contains('Submit').click()

    cy.url().should('eq', 'http://localhost:3000/')
  }

  function showEventDetails() {
    cy.contains('Test Event').click({force: true})
  }

  describe('succeeded if user already logged in', () => {
    it('User log in successful and can add event', () => {
      login()

      createNewEvent()

      cy.url().should('eq', 'http://localhost:3000/')

      showEventDetails()

      cy.url().should('match', /^http:\/\/localhost:3000\/events\/\w+$/)
      cy.contains('EventDetail')
      cy.contains('Test Event')
      cy.contains('Some test description')
    })
  })
})

