'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('allbooks', {
      url: '/allbooks',
      template: '<allbooks></allbooks>'
    });
}
