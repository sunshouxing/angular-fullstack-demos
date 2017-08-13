'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './user.config';
import usersService from './services/users/users.service';
import contactSheet from './components/contact-sheet/contact-sheet.component';

export class UserController {
  /*@ngInject*/
  constructor(Users, $scope, $mdSidenav, $mdBottomSheet) {
    this.$scope = $scope;
    this.$mdSidenav = $mdSidenav;
    this.$mdBottomSheet = $mdBottomSheet;

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

  share(event) {
    let scope = angular.extend(this.$scope.$new(true), { user: this.selected });
    this.$mdBottomSheet.show({
      scope,
      template: '<contact-sheet user="user"></contact-sheet>',
      preserveScope: true,
      parent: angular.element(document.querySelector('#content')),
      targetEvent: event
    }).then(method => {
      // print selected contact method
      console.log(method);
    });
  }

}

export default angular.module('meanApp.user', [uiRouter, usersService, contactSheet])
  .config(config)
  .component('user', {
    template: require('./user.pug'),
    controller: UserController,
    controllerAs: 'vm'
  })
  .name;
