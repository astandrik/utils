app.factory('$organizations', ['$http', '$filter', '$resource', '$odataresource', function($http, $filter, $resource, $odataresource) {
    function Organizations(data) {
        this.setEmpty = function() {
            this.organizations_name = null;
            this.organizations_shortName = null;
            this.organizations_fullName = null;
            this.organizations_locatedGazette = null;
            this.organizations_form = null;
            this.organizations_licenseNumber = null;
            this.organizations_dateTimeLicenseStartDate = null;
            this.organizations_dateTimeLicenseEndDate = null;
            this.organizations_licenseLocatedGazetteName = null;
            this.organizations_documentLicenseId = null;
            this.organizations_catalogContactManager = null;
            this.organizations_legalAddress = null;
            this.organizations_factAddress = null;
            this.organizations_telegraph = null;
            this.organizations_fax = null;
            this.organizations_phone = null;
            this.organizations_email = null;
            this.organizations_organizationNumber = null;
            this.organizations_iNN = null;
            this.organizations_kPP = null;
            this.organizations_checkingАccount = null;
            this.organizations_bankName = null;
            this.organizations_bankAddress = null;
            this.organizations_bIK = null;
            this.organizations_oKPO = null;
            this.organizations_cashAccount = null;
            this.organizations_oKONH = null;
            this.organizations_oKFS = null;
            this.organizations_oKATO = null;
            this.organizations_oKVED = null;
            this.organizations_pZ = null;
            this.organizations_isSelfOrganization = false;
            this.organizations_note = null;
            this.organizations_dateTimeCreateDate = null;
            this.organizations_createUserName = null;
            this.organizations_dateTimeLastEditDate = null;
            this.organizations_lastEditUserName = null;
        }
        this.setEmpty();
        this.getCopy = function() {
            var serv = new Organizations();
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
            tmp.Name = this.organizations_name || null;
            tmp.ShortName = this.organizations_shortName || null;
            tmp.FullName = this.organizations_fullName || null;
            tmp.LocatedGazette = this.organizations_locatedGazette || null;
            tmp.Form = this.organizations_form || null;
            tmp.LicenseNumber = this.organizations_licenseNumber || null;
            tmp.DateTimeLicenseStartDate = this.organizations_dateTimeLicenseStartDate || null;
            tmp.DateTimeLicenseEndDate = this.organizations_dateTimeLicenseEndDate || null;
            tmp.LicenseLocatedGazetteName = this.organizations_licenseLocatedGazetteName || null;
            tmp.DocumentLicenseId = this.organizations_documentLicenseId || null;
            tmp.CatalogContactManager = this.organizations_catalogContactManager || null;
            tmp.LegalAddress = this.organizations_legalAddress || null;
            tmp.FactAddress = this.organizations_factAddress || null;
            tmp.Telegraph = this.organizations_telegraph || null;
            tmp.Fax = this.organizations_fax || null;
            tmp.Phone = this.organizations_phone || null;
            tmp.Email = this.organizations_email || null;
            tmp.OrganizationNumber = this.organizations_organizationNumber || null;
            tmp.INN = this.organizations_iNN || null;
            tmp.KPP = this.organizations_kPP || null;
            tmp.CheckingАccount = this.organizations_checkingАccount || null;
            tmp.BankName = this.organizations_bankName || null;
            tmp.BankAddress = this.organizations_bankAddress || null;
            tmp.BIK = this.organizations_bIK || null;
            tmp.OKPO = this.organizations_oKPO || null;
            tmp.CashAccount = this.organizations_cashAccount || null;
            tmp.OKONH = this.organizations_oKONH || null;
            tmp.OKFS = this.organizations_oKFS || null;
            tmp.OKATO = this.organizations_oKATO || null;
            tmp.OKVED = this.organizations_oKVED || null;
            tmp.PZ = this.organizations_pZ || null;
            tmp.IsSelfOrganization = this.organizations_isSelfOrganization || false;
            tmp.Note = this.organizations_note || null;
            tmp.DateTimeCreateDate = this.organizations_dateTimeCreateDate || null;
            tmp.CreateUserName = this.organizations_createUserName || null;
            tmp.DateTimeLastEditDate = this.organizations_dateTimeLastEditDate || null;
            tmp.LastEditUserName = this.organizations_lastEditUserName || null;
            return tmp;
        }
        if (data == "new") {
            this.setEmpty.call(this);
        }
        if (data && data != "new") {
            this.rawData = data;
            this.organizations_name = data.Name || this.organizations_name || null;
            this.organizations_shortName = data.ShortName || this.organizations_shortName || null;
            this.organizations_fullName = data.FullName || this.organizations_fullName || null;
            this.organizations_locatedGazette = data.LocatedGazette || this.organizations_locatedGazette || null;
            this.organizations_form = data.Form || this.organizations_form || null;
            this.organizations_licenseNumber = data.LicenseNumber || this.organizations_licenseNumber || null;
            this.organizations_dateTimeLicenseStartDate = data.DateTimeLicenseStartDate || this.organizations_dateTimeLicenseStartDate || null;
            this.organizations_dateTimeLicenseEndDate = data.DateTimeLicenseEndDate || this.organizations_dateTimeLicenseEndDate || null;
            this.organizations_licenseLocatedGazetteName = data.LicenseLocatedGazetteName || this.organizations_licenseLocatedGazetteName || null;
            this.organizations_documentLicenseId = data.DocumentLicenseId || this.organizations_documentLicenseId || null;
            this.organizations_catalogContactManager = data.CatalogContactManager || this.organizations_catalogContactManager || null;
            this.organizations_legalAddress = data.LegalAddress || this.organizations_legalAddress || null;
            this.organizations_factAddress = data.FactAddress || this.organizations_factAddress || null;
            this.organizations_telegraph = data.Telegraph || this.organizations_telegraph || null;
            this.organizations_fax = data.Fax || this.organizations_fax || null;
            this.organizations_phone = data.Phone || this.organizations_phone || null;
            this.organizations_email = data.Email || this.organizations_email || null;
            this.organizations_organizationNumber = data.OrganizationNumber || this.organizations_organizationNumber || null;
            this.organizations_iNN = data.INN || this.organizations_iNN || null;
            this.organizations_kPP = data.KPP || this.organizations_kPP || null;
            this.organizations_checkingАccount = data.CheckingАccount || this.organizations_checkingАccount || null;
            this.organizations_bankName = data.BankName || this.organizations_bankName || null;
            this.organizations_bankAddress = data.BankAddress || this.organizations_bankAddress || null;
            this.organizations_bIK = data.BIK || this.organizations_bIK || null;
            this.organizations_oKPO = data.OKPO || this.organizations_oKPO || null;
            this.organizations_cashAccount = data.CashAccount || this.organizations_cashAccount || null;
            this.organizations_oKONH = data.OKONH || this.organizations_oKONH || null;
            this.organizations_oKFS = data.OKFS || this.organizations_oKFS || null;
            this.organizations_oKATO = data.OKATO || this.organizations_oKATO || null;
            this.organizations_oKVED = data.OKVED || this.organizations_oKVED || null;
            this.organizations_pZ = data.PZ || this.organizations_pZ || null;
            this.organizations_isSelfOrganization = data.IsSelfOrganization || this.organizations_isSelfOrganization || false;
            this.organizations_note = data.Note || this.organizations_note || null;
            this.organizations_dateTimeCreateDate = data.DateTimeCreateDate || this.organizations_dateTimeCreateDate || null;
            this.organizations_createUserName = data.CreateUserName || this.organizations_createUserName || null;
            this.organizations_dateTimeLastEditDate = data.DateTimeLastEditDate || this.organizations_dateTimeLastEditDate || null;
            this.organizations_lastEditUserName = data.LastEditUserName || this.organizations_lastEditUserName || null;
        }

    }
    Organizations.prototype = {
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
            if (!this.organizations_name) {
                res.push({
                    "organizations_name": "------------------"
                });
            }
            if (!this.organizations_note) {
                res.push({
                    "organizations_note": "------------------"
                });
            }
            return res;
        },
    }
    return {
        createNew: function() {
            return new Organizations("new")
        },
        list: function(id) {
            return $odataresource("------------------");
        },
        getById: function(id, callBack, serverForced) {
            if (!serverForced && window.currentOrganizations && window.currentOrganizations.id && window.currentOrganizations.id == id) {
                callBack(window.currentOrganizations);
            } else {
                $http.get("------------------" + id).success(function(serv) {
                    window.currentOrganizations = new Organizations(serv);
                    window.OrganizationsCopy = new Organizations(serv);
                    callBack(window.currentOrganizations);
                })
            }
        },
        delete: {}
    };
}]);