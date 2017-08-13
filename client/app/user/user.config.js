'use strict';

export default function($stateProvider, $mdIconProvider, $mdThemingProvider) {
  'ngInject';
  $stateProvider
    .state('user', {
      url: '/user',
      template: '<user></user>'
    });

  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      'default': '700'
    })
    .accentPalette('light-blue', {
      'default': '600'
    });

//$mdThemingProvider.theme('default')
//  .primaryPalette('brown')
//  .accentPalette('red');

  $mdIconProvider.defaultIconSet('assets/svg/avatars.svg', 128)
    .icon('phone', 'assets/svg/phone.svg', 24)
    .icon('twitter', 'assets/svg/twitter.svg', 24)
    .icon('google_plus', 'assets/svg/google_plus.svg', 24)
    .icon('hangouts', 'assets/svg/hangouts.svg', 24);
}
