'use strict';

describe('Component: AllbooksComponent', function() {
  // load the controller's module
  beforeEach(module('basecampBookjumpApp.allbooks'));

  var AllbooksComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AllbooksComponent = $componentController('allbooks', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
