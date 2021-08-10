/// <reference types="cypress" />

describe('TodoApp', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: 'http://localhost:5000/todos' }, { fixture: 'todos' }).as(
      'loadTodos'
    );
    cy.visit('/');
  });

  it('display initial list of todo items', () => {
    cy.get('ul[aria-label=todo-list] li').should('have.length', 3);
  });

  it('should allow user to add todo item', () => {
    const fakeTitle = 'Test todo';
    const newTodo = {
      title: fakeTitle,
      id: Date.now().toString(),
    };

    cy.intercept('POST', 'http://localhost:5000/todos', (req) => {
      req.reply({
        body: newTodo,
        delay: 1000, // milliseconds
      });
    }).as('addTodo');

    // open add todo form
    cy.contains('Add New Todo').click();

    cy.get('input[name=title]').type(fakeTitle).should('have.value', fakeTitle);

    cy.contains('Add Task').click();

    cy.contains('Adding task...').should('be.disabled');

    cy.get('form button[type=submit]');

    cy.wait('@addTodo').then(() => {
      cy.contains('Add Task').should('not.be.disabled');
      cy.get('input[name=title]').should('have.value', '');
      cy.get('ul[aria-label=todo-list] li').should('have.length', 4);
    });
  });
});
