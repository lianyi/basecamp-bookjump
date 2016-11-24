'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mybooks.routes';

export class MybooksComponent {
  /*@ngInject*/
  constructor() {
    //this.message = 'Hello';
  }
}

export default angular.module('basecampBookjumpApp.mybooks', [uiRouter])
  .config(routes)
  .component('mybooks', {
    template: require('./mybooks.html'),
    controller: MybooksComponent,
    controllerAs: 'mybooksCtrl'
  })
  .name;
