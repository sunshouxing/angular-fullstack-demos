'use strict';

describe('Component: GalleryComponent', function() {
  // load the controller's module
  beforeEach(module('meanApp.gallery'));

  var GalleryComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    GalleryComponent = $componentController('gallery', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
