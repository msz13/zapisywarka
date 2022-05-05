describe('Catalog categories', () => {
  const getCategories = () => cy.get('[data-cy="category-list"]');
  const getCategory = (name) => cy.get('[data-cy="category"]').contains(name);
  it('should display catalog categories page', () => {
    cy.visit('/main/katalog/kategorie');

    cy.contains('Kategorie');
  });

  describe('Adding category', () => {
    const category = 'Specjalne';
    const addCategory = (name) => {
      cy.get('[data-cy="name-input"]').type(name);

      cy.get('[data-cy="save"]').click();
    };

    beforeEach(() => {
      cy.visit('localhost:4200/main/katalog/kategorie');
      cy.wait(300);
    });
    it('adds cateogry to list', () => {
      const categoryName = 'Bochenki';

      addCategory(categoryName);

      cy.wait(100).get('[data-cy="category-list"]').contains(`${categoryName}`);
    });
  });
});
