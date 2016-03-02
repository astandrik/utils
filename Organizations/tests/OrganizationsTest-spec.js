var http = require('http');
var config = require('------------------tests/tests-config.js');
require('------------------tests/e2e/login-spec.js');
var EC = protractor.ExpectedConditions;
var th = require('------------------tests/helpers/form-utils.js').testHelper;
var DialogOrganizations = require('./DialogOrganizations.js');
describe('Adding new Organizations', function() {
    it('going to Organizations grid', function(done) {
        th.navigateToEntity('Organizations');
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
    it('Creating new DialogOrganizations', function(done) {
        Dialog = new DialogOrganizations();
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
    it('Updating no changes in DialogOrganizations', function() {
        element(by.css('ng-md-icon[icon="edit"]')).click();
        element(by.css('ng-md-icon[icon="check"]')).click();
        browser.wait(EC.presenceOf($('span[data-notify="message"]')), 5000);
        expect(element(by.css('span[data-notify="message"]')).getText()).toEqual('Успешно сохранено в систему');
    });
    it('Updating fields in Organizations', function() {
        var Entity = require('./OrganizationsEntity.js');
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