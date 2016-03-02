(function() {
    angular.module('orderType').controller('DialogOrderTypeController', ['$scope', '$modalInstance', '$routeParams', '$orderType', '$controller', 'data', function($scope, $modalInstance, $params, orderType, $controller, $data) {
        var orderType = orderType.createNew();
        window.currentEntity = orderType;
        $scope.cancel = function() {
            $modalInstance.dismiss('Canceled');
        };
        var errorMixin = $controller('FormErrorsMixinController', {
            '$scope': $scope
        });

        function validate() {
            var errors = window.currentEntity.validate();
            $scope.showErrors(errors);
            return errors.length === 0;
        }

        function goTo(id) {
            $data.navigateInEntity(id, 'OrderType');
            $modalInstance.dismiss('Saved');
        }
        $scope.save = function() {
            if (validate()) {
                window.currentDepartments.create(goTo);
            }
        };
        $scope.entity = orderType;
    }]);
}());