angular.module('myNews')
    .factory('PageService', function() {
        'use strict';

        var maxPage = function(inputArray, pageSize) {
            return Math.floor(inputArray.length / pageSize);
        };

        var getCurrentPage = function(inputArray, currentPage, pageSize) {
            var start = currentPage * pageSize;
            return {
                pageNum: currentPage,
                maxPageNum: maxPage(inputArray, pageSize),
                pageData: inputArray.slice(start, start + pageSize)
            };
        };

        return {
            nextPage: function(inputArray, currentPage, pageSize) {
                var maxPageNum = maxPage(inputArray, pageSize);
                var nextPageNum = currentPage === maxPageNum ? maxPageNum : currentPage + 1;
                return getCurrentPage(inputArray, nextPageNum, pageSize);
            },
            currentPage: getCurrentPage,
            prevPage: function(inputArray, currentPage, pageSize) {
                var prevPageNum = currentPage === 0 ? 0 : currentPage - 1;
                return getCurrentPage(inputArray, prevPageNum, pageSize);
            }
       };
    });