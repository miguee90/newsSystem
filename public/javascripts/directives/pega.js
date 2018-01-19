angular.module('globalmediaApp').directive('pega', function ($window) {
	return {
		controller: function($scope,$element, $timeout){
				$timeout(function(){
					if($scope.sec!=undefined){
						console.log($scope.sec);
						switch($scope.sec){
							case 'Local':
								$scope.backColor={'background-color':'#0f5591',
												 'border-color':'#0f5591'};
								$scope.$apply();
								break;
							case 'Seguridad':
								$scope.backColor={'background-color':'#f36523',
												 'border-color':'#f36523'};
								$scope.$apply();
								break;
							case 'Nacional':
								$scope.backColor={'background-color':'#0072bb',
												 'border-color':'#0072bb'};
								$scope.$apply();
								break;
							case 'Internacional':
								$scope.backColor={'background-color':'#8ec63f',
												 'border-color':'#8ec63f'};
								$scope.$apply();
								break;
							case 'Espectaculos':
								$scope.backColor={'background-color':'#ed008c',
												 'border-color':'#ed008c'};
								$scope.$apply();
								break;
							case 'Deportes':
								$scope.backColor={'background-color':'#01a89e',
												 'border-color':'#01a89e'};
								$scope.$apply();
								break;
							case 'Negocios':
								$scope.backColor={'background-color':'#090d4a',
												 'border-color':'#090d4a'};
								$scope.$apply();
								break;
							case 'Estados':
								$scope.backColor={'background-color':'#ff9a00',
												 'border-color':'#ff9a00'};
								$scope.$apply();
								break;
							case 'Actualidad':
								$scope.backColor={'background-color':'#00a652',
												 'border-color':'#00a652'};
								$scope.$apply();
								break;
						}
					}			
				}, 200);	
			$scope.$watch(function () {
				if($window.scrollY>180){
					$element.addClass('affix');
				}
				else{
					$element.removeClass('affix');
				}
				$scope.$applyAsync();
				return $window.scrollY;
			}, function (scrollY) {
				/* logic */
			});
		}	
	};
});