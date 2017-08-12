'use strict';

export default function($stateProvider, $mdIconProvider) {
  'ngInject';
  $stateProvider
    .state('user', {
      url: '/user',
      template: '<user></user>'
    });

  $mdIconProvider.defaultIconSet("assets/svg/avatars.svg", 128);
}
