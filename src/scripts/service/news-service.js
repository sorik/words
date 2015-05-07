angular.module('myNews')
    .factory('NewsService', ['$q', '$resource', function($q, $resource) {
        'use strict';

        var newsResource = $resource('data/news');
        var newsIdResource = $resource('data/news/:id', {id: '@id'});

        return {
            insert: function(data) {
                var deferred = $q.defer();
                newsResource.save(data, function() {
                    deferred.resolve('');
                }, function(error) {
                    deferred.reject(error.data.message);
                });
                return deferred.promise;
            },
            query: function() {
                var deferred = $q.defer();
                newsResource.query(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error.data.message);
                });
                return deferred.promise;
            },
            getById: function(id) {
                var deferred = $q.defer();
                newsIdResource.get({id: id}, function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error.data.message);
                });
                return deferred.promise;
            }
        };
    }]);