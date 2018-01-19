angular.module('globalmediaApp').directive('exportTable', function ($window) {
	return {
		restrict:'C',
		link: function($scope,$element, $timeout){
					$scope.$on('export-pdf', function(e, d){
					    $element.tableExport({type:'pdf', escape:'false'});
					 });
					$scope.$on('export-excel', function(e, d){
						console.log($element);
					    $element.tableExport({type:'excel', escape:false});
					 });
					$scope.$on('export-doc', function(e, d){
					    $element.tableExport({type: 'doc', escape:false});
					 });
				}	
	};
});