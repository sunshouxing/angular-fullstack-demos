'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './user.config';
import usersService from './services/users/users.service';

export class UserController {
  /*@ngInject*/
  constructor(Users, $mdSidenav) {
    this.$mdSidenav = $mdSidenav;

    Users.loadAllUsers().then(users => {
      this.users = users;
      this.selected = this.users[0];
    });
  }

  $onInit() {}

  selectUser(user) {
    this.selected = user;
  }

  toggleList() {
    this.$mdSidenav('left').toggle();
  }

}

export default angular.module('meanApp.user', [uiRouter, usersService])
  .config(config)
  .component('user', {
    template: require('./user.pug'),
    controller: UserController,
    controllerAs: 'vm'
  })
  .name;
