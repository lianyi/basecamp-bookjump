'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './allbooks.routes';

export class AllbooksComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('basecampBookjumpApp.allbooks', [uiRouter])
  .config(routes)
  .component('allbooks', {
    template: require('./allbooks.html'),
    controller: AllbooksComponent,
    controllerAs: 'allbooksCtrl'
  })
  .name;
