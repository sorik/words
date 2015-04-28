angular.module('myNews')
    .controller('newsInsertCtrl',
        ['$scope', '$timeout', 'NewsService', function($scope, $timeout, NewsService) {
        'use strict';

        $scope.savingResult = '';
        var stopDisplayResultMessage = function(timeout) {
            $timeout(function() {
                $scope.savingResult = '';
            }, timeout);
        };

        $scope.addNews = function() {
            $scope.news.timestamp = new Date();
            NewsService.insert($scope.news).then(function(){
                    $scope.news = {};
                    $scope.insertForm.$setPristine();
                    $scope.savingResult = 'Successfully saved.';
                    stopDisplayResultMessage(3000);
                }, function(error) {
                    $scope.savingResult = 'Failed to save. Try again.' + '(' + error + ')';
                    stopDisplayResultMessage(3000);
                });
        };

        $scope.showFormError = function(ngModelController, error) {
            return ngModelController.$error[error];
        };

        $scope.canSave = function() {
            return $scope.insertForm.$dirty && $scope.insertForm.$valid;
        };
    }]);