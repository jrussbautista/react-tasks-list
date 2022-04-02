/// <reference types="cypress" />

describe('Tasks', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: 'http://localhost:5000/tasks' }, { fixture: 'tasks' }).as(
      'loadTasks'
    );
    cy.visit('/');
  });

  it('display initial list of task items', () => {
    cy.get('ul[aria-label=tasks-list] li').should('have.length', 3);
  });

  it('should allow user to add task item', () => {
    const fakeTitle = 'Test task';
    const newTask = {
      title: fakeTitle,
      id: Date.now().toString(),
    };

    cy.intercept('POST', 'http://localhost:5000/tasks', (req) => {
      req.reply({
        body: newTask,
        delay: 1000, // milliseconds
      });
    }).as('addTask');

    // open add todo form
    cy.contains('Add New Task').click();

    cy.get('input[name=title]').type(fakeTitle).should('have.value', fakeTitle);

    cy.contains('Add Task').click();

    cy.contains('Adding task...').should('be.disabled');

    cy.get('form button[type=submit]');

    cy.wait('@addTask').then(() => {
      cy.contains('Add Task').should('not.be.disabled');
      cy.get('input[name=title]').should('have.value', '');
      cy.get('ul[aria-label=todo-list] li').should('have.length', 4);
    });
  });
});
