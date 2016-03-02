var http = require('http');
var config = require('------------------tests/tests-config.js');
require('------------------tests/e2e/login-spec.js');
var EC = protractor.ExpectedConditions;
var th = require('------------------tests/helpers/form-utils.js').testHelper;
var DialogContacts = require('./DialogContacts.js');
describe('Adding new Contacts', function() {
    it('going to Contacts grid', function(done) {
        th.navigateToEntity('Contacts');
        th.waitForRedirect(/------------------/);
        browser.driver.getCurrentUrl().then(function(url) {
            expect(url).toContain('------------------');
            done();
        })
    });
    it('Calling for dialog', function() {
        th.waitForRedirect(/------------------/);
        browser.driver.sleep(1000);
        browser.wait(EC.invisibilityOf($('.mask')), 5000);
        var dialog = element(by.id('addEntityDialog'));
        dialog.click();
        var dialogsCount = element.all(by.id('EntityDialog')).count();
        expect(dialogsCount).toBe(1);
    });
    it('Creating new DialogContacts', function(done) {
        Dialog = new DialogContacts();
        for (var e in Dialog.fields) {
            th.fillField(Dialog.fields[e]);
        }
        element(by.id('saveEntityButton')).click().then(function() {
            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return /------------------/.test(url);
                });
            }, 10000);
            done();
        });
    });
    it('Updating no changes in DialogContacts', function() {
        element(by.css('ng-md-icon[icon="edit"]')).click();
        element(by.css('ng-md-icon[icon="check"]')).click();
        browser.wait(EC.presenceOf($('span[data-notify="message"]')), 5000);
        expect(element(by.css('span[data-notify="message"]')).getText()).toEqual('Успешно сохранено в систему');
    });
    it('Updating fields in Contacts', function() {
        var Entity = require('./ContactsEntity.js');
        element(by.css('ng-md-icon[icon="edit"]')).click();
        var entity = new Entity();
        for (var e in entity.fields) {
            th.fillField(entity.fields[e]);
        }
        element(by.css('ng-md-icon[icon="check"]')).click();
        browser.wait(EC.presenceOf($('span[data-notify="message"]')), 5000);
        expect(element(by.css('span[data-notify="message"]')).getText()).toEqual('Успешно сохранено в систему');
    });
});