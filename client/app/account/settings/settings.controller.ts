'use strict';
// @flow
interface User {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  city: string;
  state: string;
}

export default class SettingsController {
  user: User = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    city: '',
    state: '',
  };
  errors = {other: undefined};
  message = '';
  submitted = false;
  Auth;
  $http;

  /*@ngInject*/
  constructor(Auth, $http) {
    this.Auth = Auth;
    this.$http = $http;
  }

  updateProfile(form) {
    if (form.$valid) {
      this.$http.put('/api/users/' + this.Auth.getCurrentUserSync()._id + '/' + this.user.city + '/' + this.user.state);
    }
  }

  changePassword(form) {
    this.submitted = true;
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}
