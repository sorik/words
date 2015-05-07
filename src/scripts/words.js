angular.module('myNews', ['ngResource', 'ui.router'])
    .constant('NEWS_PAGE', {
        pageSize: 2,
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
                        templateUrl: 'views/news-list.html',
                        controller: 'newsListCtrl'
                    }
                }
            })
            .state('news.show', {
                url: ':id',
                views: {
                    'content@': {
                        templateUrl: 'views/news-show.html',
                        controller: 'newsShowCtrl'
                    }
                }
            })
            .state('news.insert', {
                url: 'insert',
                views: {
                    'content@': {
                        templateUrl: 'views/news-insert.html',
                        controller: 'newsInsertCtrl'
                    }
                }
            })
            .state('news.train', {
                url: ':id/train',
                views: {
                    'content@': {
                        templateUrl: 'views/news-train.html',
                        controller: 'newsTrainCtrl'
                    }
                }
            });
    }]);
