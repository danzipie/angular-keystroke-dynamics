/*
 * angular-keystroke-dynamics
 *
 * Copyright (c) 2016 Pietro Danzi
 * Licensed under the MIT license.
 * https://github.com/danzipie/angular-keystroke-dynamics/blob/master/LICENSE
 */

angular.module('ngKeystrokeDynamics', [])

    .directive('keystrokeDynamics', function() {

        function init(attrs) {
            attrs.count = 0;
            attrs.last = 0;
            attrs.prev_length = 0;
            attrs.attempt = 0;
            attrs.keystrokeDynamics = undefined;
        };

        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {

                init(attrs);

                scope.$watch(attrs.ngModel, function (v) {

                    var now = Date.now();

                    if (v != undefined) {

                        if (attrs.keystrokeDynamics == undefined) {
                            attrs.keystrokeDynamics = {};
                            attrs.keystrokeDynamics['seq_' + attrs.attempt] = [];
                        }

                        if (v.length < attrs.prev_length) {
                            attrs.attempt++;
                            attrs.keystrokeDynamics['seq_' + attrs.attempt] = [];
                            attrs.count = 0;
                        }

                        attrs.prev_length = v.length;

                        if (attrs.count > 0) {
                            attrs.keystrokeDynamics['seq_' + attrs.attempt].push(now - attrs.last);
                        }

                        attrs.last = now;
                        attrs.count++;

                        scope.keystrokeDynamics = attrs.keystrokeDynamics;

                    } else {
                        init(attrs);
                        scope.keystrokeDynamics = undefined;
                    }

                });

            }
        }
    })
