angular.module('myNews')
    .controller('newsShowCtrl', ['$scope', '$stateParams', 'NewsService', function($scope, $stateParams, NewsService) {
        'use strict';

        NewsService.getById($stateParams.id)
            .then(function(data) {
                $scope.news = data;
            });
    }]);