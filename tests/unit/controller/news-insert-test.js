describe('newsInsertCtrl', function() {

	beforeEach(module('myNews'));

	var scope,
		NewsService,
		q;

	beforeEach(inject(function($rootScope, $controller, $timeout, $q, _NewsService_) {
		scope = $rootScope.$new();
		q = $q;
		NewsService = _NewsService_;

		$controller('newsInsertCtrl', {
			$scope: scope,
			$timeout: $timeout,
			NewsService: NewsService
		});

		scope.insertForm = {
			$setPristine: function() {
				return;
			}
		};
	}));

	describe('addNews', function() {
		it('should call NewsService insert with the correct data', function() {
			scope.news = {
				title: 'test title',
				content: 'test content'
			};
			var mockNow = new Date();
			jasmine.clock().mockDate(mockNow);
			spyOn(NewsService, 'insert').and.callFake(function() {
				var deferred = q.defer();
				deferred.resolve('saved');
				return deferred.promise;
			});

			scope.addNews();

			expect(NewsService.insert).toHaveBeenCalledWith({
					title: 'test title',
					content: 'test content',
					timestamp: mockNow
				});
		});

		describe('result message', function() {
			describe('when successfully inserted', function() {
				beforeEach(function(){
					scope.news = {
						title: 'whatever',
						content: 'whatever'
					};
					spyOn(NewsService, 'insert').and.callFake(function() {
						var deferred = q.defer();
						deferred.resolve('saved');
						return deferred.promise;
					});
				});

				it('should display success message', function() {
					scope.addNews();
					scope.$digest();

					expect(scope.savingResult).toContain('Successfully saved.');
				});

				it('should remove the success message after 3 seconds', inject(function($timeout) {
					scope.addNews();
					scope.$digest();
					$timeout.flush();

					expect(scope.savingResult).toEqual('');
				}));
			});

			describe('when failed to insert', function() {
				beforeEach(function() {
					scope.news = {
						title: 'whatever',
						content: 'whatever'
					};
					spyOn(NewsService, 'insert').and.callFake(function() {
						var deferred = q.defer();
						deferred.reject('failed');
						return deferred.promise;
					});
				});

				it('should display failed message', function() {
					scope.addNews();
					scope.$digest();

					expect(scope.savingResult).toContain('Failed to save. Try again.');
				});

				it('should remove the success message after 3 seconds', inject(function($timeout) {
					scope.addNews();
					scope.$digest();
					$timeout.flush();

					expect(scope.savingResult).toEqual('');
				}));
			});
		});
	});
});