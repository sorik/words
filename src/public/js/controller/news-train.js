angular.module('myNews')
  .controller('newsTrainCtrl', ['$scope', '$stateParams', 'NewsService', function($scope, $stateParams, NewsService) {
    'use strict';

    $scope.startTraining = function () {
      $scope.userAction = 'training';
    };

    NewsService.getById($stateParams.id)
    .then(function(data) {
        $scope.news = data;
        $scope.todayWords = $scope.news.content.split(/\s+/);
        $scope.todayTraining = $scope.news.content.split(/\s+/);
    });

    $scope.selectWord = function(index) {
      $scope.todayTraining[index] = '____';
      $scope.selected = true;
    };

    $scope.showTrainWord = function(index) {
      $scope.todayTraining[index] = $scope.todayWords[index];
      $scope.answered = true;
    };
  }]);

