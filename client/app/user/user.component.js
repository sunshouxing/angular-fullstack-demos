'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routes from './user.routes';

export class UserController {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('meanApp.user', [uiRouter])
  .config(routes)
  .component('user', {
    template: require('./user.pug'),
    controller: UserController,
    controllerAs: 'vm'
  })
  .name;
