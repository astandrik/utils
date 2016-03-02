(function() {
    angular.module('orderType').factory('$orderType', ['$http', '$filter', '$resource', '$odataresource', function($http, $filter, $resource, $odataresource) {
        function OrderType(data) {
            this.setEmpty = function() {
                this.orderType_name = null;
                this.orderType_note = null;
            }
            this.setEmpty();
            this.getCopy = function() {
                var serv = new OrderType();
                for (var key in this) {
                    serv[key] = this[key];
                }
                return serv;
            }
            this.preparedData = function() {
                var tmp = {};
                for (var e in this.rawData) {
                    tmp[e] = this.rawData[e];
                };
                tmp.Name = this.orderType_name || null;
                tmp.Note = this.orderType_note || null;
                return tmp;
            }
            if (data == "new") {
                this.setEmpty.call(this);
            }
            if (data && data != "new") {
                this.rawData = data;
                this.orderType_name = data.Name || this.orderType_name || null;
                this.orderType_note = data.Note || this.orderType_note || null;
            }

        }
        OrderType.prototype = {
            create: function(callback) {
                var dataToSend = this.preparedData();
                $.post("CatalogOrderTypes/Add", {
                    '': JSON.stringify(dataToSend)
                }, function(response) {
                    callback(response.Id);
                });
            },
            update: function(callback) {
                var dataToSend = this.preparedData();
                $.post("CatalogOrderTypes/Update", {
                    '': JSON.stringify(dataToSend)
                }, function(response) {
                    callback(response);
                });
            },
            validate: function() {
                var res = [];
                if (!this.orderType_name) {
                    res.push({
                        "orderType_name": "------------------"
                    });
                }
                return res;
            },
        }
        return {
            createNew: function() {
                return new OrderType("new")
            },
            list: function(id) {
                return $odataresource("api/SimpleCatalogOrderTypes");
            },
            getById: function(id, callBack, serverForced) {
                if (!serverForced && window.currentEntity && window.currentEntity.id && window.currentEntity.id == id) {
                    callBack(window.currentEntity);
                } else {
                    $http.get("CatalogOrderTypes/" + id).success(function(serv) {
                        window.currentEntity = new OrderType(serv);
                        window.currentEntityCopy = new OrderType(serv);
                        callBack(window.currentEntity);
                    })
                }
            },
            delete: function(id, callback) {
                $http.get("CatalogOrderTypes/Delete/" + id).success(function() {
                    callback();
                });
            },
            multipleDelete: function(ids, callback) {
                for (var i = 0; i < ids.length; i++) {
                    ids[i] = "ids=" + ids[i];
                }
                $http.get("CatalogOrderTypes/MultipleDelete" + ids.join("&")).success(function() {
                    callback();
                });
            }
        };
    }]);
}());