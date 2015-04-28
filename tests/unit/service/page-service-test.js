describe('PageService', function() {

    beforeEach(module('myNews'));

    var pageService;
    beforeEach(inject(function(_PageService_) {
        pageService = _PageService_;
    }));

    describe('page navigation', function() {
        it('should return current page information', function() {
            var testArray = [1, 2 ,3 ,4 ,5 ,6, 7, 8, 9 ,10];
            expect(pageService.currentPage(testArray, 1, 3)).toEqual({
                pageNum: 1,
                maxPageNum: 3,
                pageData: [4, 5 ,6]
            });
        });

        it('should return next page information', function() {
            var testArray = [1, 2 ,3 ,4 ,5 ,6, 7, 8, 9 ,10];
            expect(pageService.nextPage(testArray, 1, 3)).toEqual({
                pageNum: 2,
                maxPageNum: 3,
                pageData: [7, 8 ,9]
            });
        });

        it('should return previous page information', function() {
            var testArray = [1, 2 ,3 ,4 ,5 ,6, 7, 8, 9 ,10];
            expect(pageService.prevPage(testArray, 1, 3)).toEqual({
                pageNum: 0,
                maxPageNum: 3,
                pageData: [1, 2 ,3]
            });
        });

        it('should not go to the previous page if the current page is the first page', function() {
            var testArray = [1, 2 ,3 ,4 ,5 ,6, 7, 8, 9 ,10];
            expect(pageService.prevPage(testArray, 0, 3)).toEqual({
                pageNum: 0,
                maxPageNum: 3,
                pageData: [1, 2, 3]
            });
        });

        it('should not go to the next page if the current page is the maximum page', function() {
            var testArray = [1, 2 ,3 ,4 ,5 ,6, 7, 8, 9 ,10];
            expect(pageService.nextPage(testArray, 3, 3)).toEqual({
                pageNum: 3,
                maxPageNum: 3,
                pageData: [10]
            });
        });
    });

    describe('last page', function() {
        it('should return all items in the current page', function() {
            var testArray = [1, 2, 3, 4];
            expect(pageService.currentPage(testArray, 1, 3)).toEqual({
                pageNum: 1,
                maxPageNum: 1,
                pageData: [4]
            });
        });

        it('should return all items in the last page', function () {
            var testArray = [1, 2, 3, 4];
            expect(pageService.nextPage(testArray, 0, 3)).toEqual({
                pageNum: 1,
                maxPageNum: 1,
                pageData: [4]
            });
        });
    });

    describe('out-of bound', function() {
        it('should return empty list with the given pageNum', function() {
            var testArray = [1, 2, 3, 4];
            expect(pageService.currentPage(testArray, 2, 3)).toEqual({
                pageNum: 2,
                maxPageNum: 1,
                pageData: []
            });
        });
    });
});