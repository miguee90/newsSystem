angular.module('globalmediaApp').directive('pegaesnoticia', function ($window) {
	return {
		controller: function($scope,$element, $timeout){	
			$scope.$watch(function () {
				if($window.scrollY>180){
					$element.addClass('affixEsnoticia');
				}
				else{
					$element.removeClass('affixEsnoticia');
				}
				$scope.$applyAsync();
				return $window.scrollY;
			}, function (scrollY) {
				/* logic */
			});
		}	
	};
});