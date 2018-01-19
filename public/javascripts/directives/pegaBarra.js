angular.module('globalmediaApp').directive('pegabarra', function ($window) {
	return {
		controller: function($scope,$element, $timeout){
			$scope.$watch(function () {
				if($window.scrollY>180){
					$element.addClass('affixBarra');
				}
				else{
					$element.removeClass('affixBarra');
				}
				$scope.$applyAsync();
				return $window.scrollY;
			}, function (scrollY) {
				/* logic */
			});
		}	
	};
});