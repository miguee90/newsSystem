angular.module('globalmediaApp').directive('audios', function ($sce) {
	return {
	    restrict: 'A',
	    scope: { code:'=' },
	    replace: true,
	    template: '<audio ng-src="{{url}}" autoplay controls></audio>',
	    link: function (scope) {
	        scope.$watch('code', function (newVal, oldVal) {
	           if (newVal !== undefined) {
	               scope.url = $sce.trustAsResourceUrl("images/multimedia/" + newVal);
	           }
	        });
	    }
  };
});