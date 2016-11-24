'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mybooks.routes';

export class MybooksComponent {
  /*@ngInject*/
  title;
  $http;
  $scope;
  socket;
  books;
  getCurrentUser;

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.getCurrentUser = Auth.getCurrentUser;
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('books');
    });
  }


  $onInit() {

    //this.socket.syncUpdates('books', this.books);
    this.getCurrentUser().then((user) =>
      this.$http.get('/api/books/user/' + user._id).then(response => {
        this.books = response.data;
      })
    )
  }

  addBook() {
    if (this.title)
      this.$http.get('/api/books/add/' + this.title).then(response => {
        if (response.data && response.data.title) {
          this.books.push(response.data);
          this.title = '';
        }
      });
  }

  accept(book) {
    book.requested = false;
    this.$http.put('/api/books/' + book._id, book).then(response => {
      book.note = 'request accepted!';
    }, (errorResponse) => book.requested = false);
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
