'use strict';

import angular from 'angular';

export class ContactSheetController {
  user = {};

  items = [
    {
      name: 'Phone',
      icon: 'assets/svg/phone.svg'
    },
    {
      name: 'Twitter',
      icon: 'assets/svg/twitter.svg'
    },
    {
      name: 'Google+',
      icon: 'assets/svg/google_plus.svg'
    },
    {
      name: 'Hangout',
      icon: 'assets/svg/hangouts.svg'
    }
  ];

  /*@ngInject*/
  constructor($mdBottomSheet) {
    this.$mdBottomSheet = $mdBottomSheet;
  }

  contactWith(method) {
    this.$mdBottomSheet.hide(method);
  }

}

export default angular.module('meanApp.user.components.contact-sheet', [])
.component('contactSheet', {
  template: require('./contact-sheet.pug'),
  bindings: {
    user: '<'
  },
  controller: ContactSheetController,
  controllerAs: 'vm'
})
.name;
