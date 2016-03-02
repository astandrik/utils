var fs = require("fs");
var beautify = require('js-beautify').js_beautify;
var arr = fs.readFileSync("./CS.txt", "utf8").split('\r\n');
var fields = [];
var strEmpty = "null";
var numEmpty = "null";
var boolEmpty = "false";
var config = require('./entityGenerator.config.js')


var serviceName = config.entityName;
var neededFields = config.requiredFields;
var moduleName = config.moduleName;

var serviceNameUnCapitalized = serviceName.charAt(0).toLowerCase() + serviceName.slice(1);
var constructorFunc = '';
var setEmptyFunc = 'this.setEmpty = function() {\n';
var validateFunc = 'validate: function() {\n var res = []; \n';
var parseDataFunc = 'if (data && data != "new") { \n this.rawData = data; \n ';
var copyFunction = 'this.getCopy = function () { \n var serv = new ' + serviceName + '(); \n for (var key in this) { \n serv[key] = this[key]; \n } \n return serv; \n }'
var prepareFunction = 'this.preparedData = function () {\n' + ' var tmp = {}; \n for (var e in this.rawData) \n { tmp[e] = this.rawData[e]; \n };';
var prototypeFunction = serviceName + '.prototype = {\n';
constructorFunc = 'function ' + serviceName + '(data) {\n';


var emptySpace = '------------------';
var beautify_html = require('js-beautify').html;

var mkdirp = require('mkdirp');
mkdirp('./' + serviceName,function(err) {});

mkdirp('./' + serviceName + '/services',function(err) {});

mkdirp('./' + serviceName + '/pages',function(err) {});
mkdirp('./' + serviceName + '/controllers',function(err) {});
mkdirp('./' + serviceName + '/tests',function(err) {});
mkdirp('./' + serviceName + '/modules',function(err) {});

var generatedCode = "(function () {\
  angular.module('"+moduleName+"').factory('$" + serviceNameUnCapitalized + "', ['$http', '$filter', '$resource', '$odataresource', function ($http, $filter, $resource, $odataresource) {" + '\n';

for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split(' ').join('').split('public').join('').split(/\{.+\}/).join('');
    var defValue = strEmpty;
    var fieldType = 'string';
    if (arr[i].indexOf('int') > -1 || arr[i].indexOf('double') > -1) {
        defValue = numEmpty;
        fieldType = 'number';
    } else if (arr[i].indexOf('bool') > -1) {
        defValue = boolEmpty;
        fieldType = 'boolean';
    }
    arr[i] = arr[i].split('string').join('').split('int').join('').split('int?').join('').split('double').join('').split('double?').join('').split('bool').join('').split('?').join('');
    var rawField = arr[i];
    arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].slice(1);
    fields.push({
        field: serviceNameUnCapitalized + '_' + arr[i],
        type: fieldType,
        defValue: defValue,
        rawField: rawField
    });
}

fields.forEach(function(field) {
    setEmptyFunc += 'this.' + field.field + ' = ' + field.defValue + ';\n';
});
setEmptyFunc += '} \n';

fields.forEach(function(field) {
    parseDataFunc += 'this.' + field.field + ' = data.' + field.rawField + ' || this.' + field.field + ' || ' + field.defValue + ';\n';
});
parseDataFunc += '} \n';

fields.forEach(function(field) {
    prepareFunction += 'tmp.' + field.rawField + ' = this.' + field.field + ' || ' + field.defValue + ';\n';
});
prepareFunction += ' return tmp; \n } \n';

neededFields.forEach(function(field) {
    validateFunc += 'if (!this.' + serviceNameUnCapitalized + '_' + field.charAt(0).toLowerCase() + field.slice(1) + ') { \n  res.push({ "' + serviceNameUnCapitalized + '_' + field.charAt(0).toLowerCase() + field.slice(1) + '":"' + emptySpace + '" });}';
})
validateFunc += 'return res;},';

constructorFunc += setEmptyFunc + 'this.setEmpty();\n' + copyFunction + prepareFunction + 'if (data == "new") {this.setEmpty.call(this);}' + parseDataFunc + '\n';


constructorFunc += '}\n';

prototypeFunction += 'create: function(callback){ var dataToSend = this.preparedData(); $.post(\"' + config.addRoute + '\", { \'\': JSON.stringify(dataToSend) }, function (response) { callback(response.Id);});},\n';
prototypeFunction += 'update: function (callback) {\
            var dataToSend = this.preparedData(); \
            $.post(\"' + config.updateRoute + '\", { \'\': JSON.stringify(dataToSend) }, function (response) {\
                callback(response);\
            });\
        },\n';
prototypeFunction += validateFunc;

prototypeFunction += '}\n';

generatedCode += constructorFunc + prototypeFunction;

generatedCode += ' return {\
        createNew: function () { return new ' + serviceName + '("new") },\
        list: function (id) { return $odataresource(\"' + config.listRoute + '\");},\n\
        getById: function (id, callBack, serverForced) { \
            if (!serverForced && window.currentEntity && window.currentEntity.id && window.currentEntity.id == id) {\
                callBack(window.currentEntity); \
            } else { \
                $http.get(\"' + config.rootRoute + '\" + id).success(function (serv) { \
                    window.currentEntity = new ' + serviceName + '(serv); \
                    window.currentEntityCopy = new ' + serviceName + '(serv);   \
                    callBack(window.currentEntity); \
                })\
            }\
        },\n\
                delete: function (id, callback) {\
          $http.get("'+config.deleteRoute+'" + id).success(function () {\
            callback();\
          });\
        },\
        multipleDelete: function (ids, callback) {\
          for (var i = 0; i < ids.length; i++) {\
            ids[i] = "ids=" + ids[i];\
          }\
          $http.get("'+config.multipleDeleteRoute+'" + ids.join("&")).success(function () {\
            callback();\
          });\
        }\
        \n\
    }; \}]);}());';



//Make Tests

var testsCode = '';
testsCode += "var http = require('http');\
var config = require('" + emptySpace + "tests/tests-config.js');\
require('" + emptySpace + "tests/e2e/login-spec.js');\
var EC = protractor.ExpectedConditions;\
var th = require('" + emptySpace + "tests/helpers/form-utils.js').testHelper;\
var Dialog" + serviceName + " = require('./Dialog" + serviceName + ".js');"

testsCode += "describe('Adding new " + serviceName + "', function () {";
testsCode += "    it('going to " + serviceName + " grid', function (done) { \
th.navigateToEntity('" + serviceName + "'); \
th.waitForRedirect(/" + emptySpace + "/);\
        browser.driver.getCurrentUrl().then(function (url) {\
            expect(url).toContain('" + emptySpace + "');\
            done();\
        })        \
});";
testsCode += "    it('Calling for dialog', function () {\
        th.waitForRedirect(/" + emptySpace + "/);\
        browser.driver.sleep(1000);\
        browser.wait(EC.invisibilityOf($('.mask')), 5000);\
        var dialog = element(by.id('addEntityDialog'));\
        dialog.click();\
        var dialogsCount = element.all(by.id('EntityDialog')).count();\
        expect(dialogsCount).toBe(1);\
    });"

testsCode += "  it('Creating new Dialog" + serviceName + "', function (done) {\
        Dialog = new Dialog" + serviceName + "();\
        for (var e in Dialog.fields) {\
            th.fillField(Dialog.fields[e]);\
        }\
        element(by.id('saveEntityButton')).click().then(function () {\
            browser.driver.wait(function () {\
                return browser.driver.getCurrentUrl().then(function (url) {\
                    return /" + emptySpace + "/.test(url);\
                });\
            }, 10000);\
            done();\
        });});";

testsCode += "    it('Updating no changes in Dialog" + serviceName + "', function () {\
        element(by.css('ng-md-icon[icon=\"edit\"]')).click();\
        element(by.css('ng-md-icon[icon=\"check\"]')).click();\
        browser.wait(EC.presenceOf($('span[data-notify=\"message\"]')), 5000);\
        expect(element(by.css('span[data-notify=\"message\"]')).getText()).toEqual('Успешно сохранено в систему');\
    });"

testsCode += "    it('Updating fields in " + serviceName + "', function () {\
        var Entity = require('./" + serviceName + "Entity.js');\
        element(by.css('ng-md-icon[icon=\"edit\"]')).click();\
        var entity = new Entity();\
        for (var e in entity.fields) {\
                th.fillField(entity.fields[e]);\
        }\
        element(by.css('ng-md-icon[icon=\"check\"]')).click();\
        browser.wait(EC.presenceOf($('span[data-notify=\"message\"]')), 5000);\
        expect(element(by.css('span[data-notify=\"message\"]')).getText()).toEqual('Успешно сохранено в систему');\
    });"

var testEntity = 'var ' + serviceName + ' = function () {';
testEntity += 'this.fields = {';

fields.forEach(function(el) {
    testEntity += el.field + ' : ' + " { elem: element(by.className('form-field-" + el.field + "')).element(by.tagName('input')), type: 'input' },"
});
testEntity += "} return this; } module.exports = " + serviceName;

testsCode += "});";

var cardHtml = '';
cardHtml += '<div class="flex layout-row">\
        <div id="projects_card_page_content" class=\'page-content\'>\
            <div class="flex layout-row flex-wrap" style="justify-content:center" ng-class="{\'pure-text\' : !isCardEditing}">\
                <div class=\'group-element flex layout-column\'>' + '<h4><span class="header">' + emptySpace + '</span></h4><div class="padded-area">';

fields.forEach(function(el) {
    cardHtml += "<div class='row'>\
                            <div class='col-xs-12 form-field-" + el.field + "'>\
<md-input-container>\
                                    <label>" + emptySpace + "</label>\
                     <input ng-model='entity." + el.field + " '> </md-input-container></div></div>";
});

cardHtml += '</div></div> </div> </div> ';
cardHtml += "<div class=\"flex layout-column justify-end\" ng-class=\"{'invisible' : !isUserEditor()}\">\
            <burger-edit></burger-edit>\
        </div></div>";


var dialogHtml = '<div class="modal-header flex layout-row justify-between"  id="EntityDialog">\
 <h3 style="border-bottom:none; margin-left:20px;" class="modal-title">' + emptySpace + '</h3>\
 <ng-md-icon ng-click="cancel()" class="delete" icon="close" size="24px" style="position:absolute; cursor:pointer;\
            fill:#666666;position: absolute!important;right: 13px;"></ng-md-icon>\
</div>\
<div class="modal-body">\
    <div class=\'flex layout-column justify-between flex-wrap\'>\
<div class="padded-area">';

fields.forEach(function(el) {
    dialogHtml += "<div class='row'>\
                <div class='col-xs-12 form-field-" + el.field + "'>\
                    <md-input-container>\
                        <label>" + emptySpace + "</label>\
                        <input ng-model=\"entity." + el.field + "\">\
                    </md-input-container>\
                </div></div>";
});

dialogHtml += '            <div class=\'row\'>\
                <div class="col-xs-5">\
                    <md-button class="md-raised" style="width:100%; margin-left:0; margin-right:0"  ng-click="cancel()">Отменить</md-button>\
                </div>\
                <div class="col-xs-5 col-xs-offset-2">\
                    <md-button class="md-raised md-primary" style="width:100%; margin-left:0; margin-right:0" id="saveEntityButton" ng-click=" save()">Создать</md-button>\
                </div>\
            </div>        </div>\
    </div>\
</div>\
<div class="modal-footer">\
</div>';

var dialogControllerCode = "(function () {\
  angular.module('"+moduleName+"').controller('Dialog" + serviceName + "Controller', [\
  '$scope',\
  '$modalInstance',\
  '$routeParams',\
  '$" + serviceNameUnCapitalized + "',\
  '$controller',\
  'data',\
  function ($scope, $modalInstance, $params, " + serviceNameUnCapitalized + ", $controller, $data) {\
    var " + serviceNameUnCapitalized + " = " + serviceNameUnCapitalized + ".createNew();\
    window.currentEntity = " + serviceNameUnCapitalized + ";\
    $scope.cancel = function () {\
      $modalInstance.dismiss('Canceled');\
    };\
    var errorMixin = $controller('FormErrorsMixinController', { '$scope': $scope });\
    function validate() {\
      var errors = window.currentEntity.validate();\
      $scope.showErrors(errors);\
      return errors.length === 0;\
    }\
    function goTo(id) {\
      $data.navigateInEntity(id,'" + serviceName + "');\
      $modalInstance.dismiss('Saved');\
    }\
    $scope.save = function () {\
      if (validate()) {\
        window.currentDepartments.create(goTo);\
      }\
    };\
    $scope.entity = " + serviceNameUnCapitalized + ";\
  }\
]);}());";

var moduleCode = '';
moduleCode += "(function () {\
  'use strict';\
  angular.module('"+moduleName+"', []);\
}());";

fs.writeFileSync('./' + serviceName + '/services/' + serviceName + 'Service.js', beautify(generatedCode, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/tests/Add' + serviceName + 'Test-spec.js', beautify(testsCode, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/tests/' + serviceName + 'Entity.js', beautify(testEntity, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/tests/Dialog' + serviceName + '.js', beautify(testEntity, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/pages/' + serviceName + 'Card.html', beautify_html(cardHtml, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/pages/' + serviceName + 'Dialog.html', beautify_html(dialogHtml, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/controllers/Dialog' + serviceName + 'Controller.js', beautify(dialogControllerCode, {
    indent_size: 4
}), 'utf8');
fs.writeFileSync('./' + serviceName + '/modules/'+moduleName+'.js', beautify(moduleCode, {
    indent_size: 4
}), 'utf8');