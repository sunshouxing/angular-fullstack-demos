'use strict';

describe('Component: contactSheet', function() {
  // load the component's module
  beforeEach(module('meanApp.user.components.contact-sheet'));

  var contactSheetComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    contactSheetComponent = $componentController('contactSheet', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
