'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './allbooks.routes';

export class AllbooksComponent {
  /*@ngInject*/
  /*@ngInject*/

  $http;
  $scope;
  socket;
  books;

  constructor($http, $scope, socket) {
    this.$http = $http;

    this.socket = socket;
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('allbooks');
    });
  }

  $onInit() {
    this.$http.get('/api/books').then(response => {
      this.books = response.data;
      this.socket.syncUpdates('allbooks', this.books);
    });
  }

  request(book) {
    book.requested = true;
    this.$http.put('/api/books/' + book._id, book).then(response => {
      book.note = 'requested!';
    }, (errorResponse) => book.requested = true);
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
