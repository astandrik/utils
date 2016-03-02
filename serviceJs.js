app.factory('$orderTypes', ['$http', '$filter', '$resource', '$odataresource', function($http, $filter, $resource, $odataresource) {
    function OrderTypes(data) {
        this.setEmpty = function() {
            this.orderTypes_name = null;
            this.orderTypes_note = null;
        }
        this.setEmpty();
        this.getCopy = function() {
            var serv = new OrderTypes();
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
            tmp.Name = this.orderTypes_name || null;
            tmp.Note = this.orderTypes_note || null;
            return tmp;
        }
        if (data == "new") {
            this.setEmpty.call(this);
        }
        if (data && data != "new") {
            this.rawData = data;
            this.orderTypes_name = data.Name || this.orderTypes_name || null;
            this.orderTypes_note = data.Note || this.orderTypes_note || null;
        }

    }
    OrderTypes.prototype = {
        create: function(callback) {
            var dataToSend = this.preparedData();
            $.post("------------------", {
                '': JSON.stringify(dataToSend)
            }, function(response) {
                callback(response.Id);
            });
        },
        update: function(callback) {
            var dataToSend = this.preparedData();
            $.post("------------------", {
                '': JSON.stringify(dataToSend)
            }, function(response) {
                callback(response);
            });
        },
        validate: function() {
            var res = [];
            if (!this.orderTypes_name) {
                res.push({
                    "orderTypes_name": "------------------"
                });
            }
            if (!this.orderTypes_note) {
                res.push({
                    "orderTypes_note": "------------------"
                });
            }
            return res;
        },
    }
    return {
        createNew: function() {
            return new OrderTypes("new")
        },
        list: function(id) {
            return $odataresource("------------------");
        },
        getById: function(id, callBack, serverForced) {
            if (!serverForced && window.currentOrderTypes && window.currentOrderTypes.id && window.currentOrderTypes.id == id) {
                callBack(window.currentOrderTypes);
            } else {
                $http.get("------------------" + id).success(function(serv) {
                    window.currentOrderTypes = new OrderTypes(serv);
                    window.OrderTypesCopy = new OrderTypes(serv);
                    callBack(window.currentOrderTypes);
                })
            }
        },
        delete: {}
    };
}]);