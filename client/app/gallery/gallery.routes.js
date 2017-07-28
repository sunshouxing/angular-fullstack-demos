'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('gallery', {
      url: '/gallery',
      template: '<gallery></gallery>'
    });
}
