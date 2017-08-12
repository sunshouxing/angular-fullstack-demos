'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routes from './user.routes';
import usersService from './services/users/users.service';

export class UserController {
  /*@ngInject*/
  constructor(Users) {
    this.message = 'Hello';
    Users.loadAllUsers().then(users => { this.users = users; });
  }

  $onInit() {}

}

export default angular.module('meanApp.user', [uiRouter, usersService])
  .config(routes)
  .component('user', {
    template: require('./user.pug'),
    controller: UserController,
    controllerAs: 'vm'
  })
  .name;
