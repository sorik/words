angular.module('myNews', ['ngResource', 'ui.router'])
    .constant('NEWS_PAGE', {
        pageSize: 1,
        initialPage: 0
    })
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('news', {
                url: '/',
                views: {
                    'list': {
                        templateUrl: 'partials/news-list.html',
                        controller: 'newsListCtrl'
                    }
                }
            })
            .state('news.show', {
                url: ':id',
                views: {
                    'content@': {
                        templateUrl: 'partials/news-show.html',
                        controller: 'newsShowCtrl'
                    }
                }
            })
            .state('news.insert', {
                url: 'insert',
                views: {
                    'content@': {
                        templateUrl: 'partials/news-insert.html',
                        controller: 'newsInsertCtrl'
                    }
                }
            })
            .state('news.train', {
                url: ':id/train',
                views: {
                    'content@': {
                        templateUrl: 'partials/news-train.html',
                        controller: 'newsTrainCtrl'
                    }
                }
            });
    }]);
