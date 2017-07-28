'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';

import routes from './gallery.routes';

export class GalleryController {
  active = 0;
  interval = 5000;
  wrapSlides = true;

  /*@ngInject*/
  constructor($http, $scope, Upload, socket) {
    this.$http = $http;
    this.uploader = Upload;
    this.socket = socket;

    $scope.$on('$destroy', () => {
      socket.unsyncUpdates('gallery');
    });
  }

  $onInit() {
    this.$http.get('/api/gallery')
      .then(response => {
        this.slides = response.data;
        this.socket.syncUpdates('gallery', this.slides);
      });
  }

  /**
   * add a new slide to the gallery
   */
  addSlide(text, image) {
    image.upload = this.uploader.upload({
      url: '/api/gallery',
      method: 'POST',
      data: {text, image}
    });

    image.upload.then(
      res => { // success callback
        console.log(`upload slide succeed with response status ${res.status}`);
      },
      res => { // error callback
        console.log(`failed to upload slide with response status ${res.status}`);
      },
      event => { //event callback, ProgressEvent
        console.log(`upload slide event: ${event}`);
      }
    );
  }

}

export default angular.module('meanApp.gallery', [uiRouter, ngFileUpload])
  .config(routes)
  .component('gallery', {
    template: require('./gallery.pug'),
    controller: GalleryController,
    controllerAs: 'vm'
  })
  .name;
