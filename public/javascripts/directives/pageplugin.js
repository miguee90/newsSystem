angular.module('globalmediaApp').directive('pageplugin', function () {
    function createHTML() {
        return '<div class="fb-page" ' +
                       'data-href="https://www.facebook.com/RMX-SLP-1729371247302102" ' +
                       'data-tabs="timeline,events,messages" ' +
                       'data-small-header="true" ' +
                       'data-adapt-container-width="true" ' +
                       'data-hide-cover="false" ' +
                       'data-show-facepile="true">' +
                       '<blockquote cite="https://www.facebook.com/RMX-SLP-1729371247302102" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/RMX-SLP-1729371247302102">RMX SLP</a></blockquote>' +
               '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            elem.html(createHTML());
                console.log(elem);
            setTimeout(function() {
                FB.XFBML.parse(elem[0]);
                //scope.$apply();
            }, 1000);
        }
    };
});