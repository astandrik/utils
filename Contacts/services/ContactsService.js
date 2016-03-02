app.factory('$contacts', ['$http', '$filter', '$resource', '$odataresource', function($http, $filter, $resource, $odataresource) {
    function Contacts(data) {
        this.setEmpty = function() {
            this.contacts_name = null;
            this.contacts_shortName = null;
            this.contacts_fullName = null;
            this.contacts_locatedGazette = null;
            this.contacts_form = null;
            this.contacts_licenseNumber = null;
            this.contacts_dateTimeLicenseStartDate = null;
            this.contacts_dateTimeLicenseEndDate = null;
            this.contacts_licenseLocatedGazetteName = null;
            this.contacts_documentLicenseId = null;
            this.contacts_catalogContactManager = null;
            this.contacts_legalAddress = null;
            this.contacts_factAddress = null;
            this.contacts_telegraph = null;
            this.contacts_fax = null;
            this.contacts_phone = null;
            this.contacts_email = null;
            this.contacts_organizationNumber = null;
            this.contacts_iNN = null;
            this.contacts_kPP = null;
            this.contacts_checkingАccount = null;
            this.contacts_bankName = null;
            this.contacts_bankAddress = null;
            this.contacts_bIK = null;
            this.contacts_oKPO = null;
            this.contacts_cashAccount = null;
            this.contacts_oKONH = null;
            this.contacts_oKFS = null;
            this.contacts_oKATO = null;
            this.contacts_oKVED = null;
            this.contacts_pZ = null;
            this.contacts_isSelfOrganization = false;
            this.contacts_note = null;
            this.contacts_dateTimeCreateDate = null;
            this.contacts_createUserName = null;
            this.contacts_dateTimeLastEditDate = null;
            this.contacts_lastEditUserName = null;
        }
        this.setEmpty();
        this.getCopy = function() {
            var serv = new Contacts();
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
            tmp.Name = this.contacts_name || null;
            tmp.ShortName = this.contacts_shortName || null;
            tmp.FullName = this.contacts_fullName || null;
            tmp.LocatedGazette = this.contacts_locatedGazette || null;
            tmp.Form = this.contacts_form || null;
            tmp.LicenseNumber = this.contacts_licenseNumber || null;
            tmp.DateTimeLicenseStartDate = this.contacts_dateTimeLicenseStartDate || null;
            tmp.DateTimeLicenseEndDate = this.contacts_dateTimeLicenseEndDate || null;
            tmp.LicenseLocatedGazetteName = this.contacts_licenseLocatedGazetteName || null;
            tmp.DocumentLicenseId = this.contacts_documentLicenseId || null;
            tmp.CatalogContactManager = this.contacts_catalogContactManager || null;
            tmp.LegalAddress = this.contacts_legalAddress || null;
            tmp.FactAddress = this.contacts_factAddress || null;
            tmp.Telegraph = this.contacts_telegraph || null;
            tmp.Fax = this.contacts_fax || null;
            tmp.Phone = this.contacts_phone || null;
            tmp.Email = this.contacts_email || null;
            tmp.OrganizationNumber = this.contacts_organizationNumber || null;
            tmp.INN = this.contacts_iNN || null;
            tmp.KPP = this.contacts_kPP || null;
            tmp.CheckingАccount = this.contacts_checkingАccount || null;
            tmp.BankName = this.contacts_bankName || null;
            tmp.BankAddress = this.contacts_bankAddress || null;
            tmp.BIK = this.contacts_bIK || null;
            tmp.OKPO = this.contacts_oKPO || null;
            tmp.CashAccount = this.contacts_cashAccount || null;
            tmp.OKONH = this.contacts_oKONH || null;
            tmp.OKFS = this.contacts_oKFS || null;
            tmp.OKATO = this.contacts_oKATO || null;
            tmp.OKVED = this.contacts_oKVED || null;
            tmp.PZ = this.contacts_pZ || null;
            tmp.IsSelfOrganization = this.contacts_isSelfOrganization || false;
            tmp.Note = this.contacts_note || null;
            tmp.DateTimeCreateDate = this.contacts_dateTimeCreateDate || null;
            tmp.CreateUserName = this.contacts_createUserName || null;
            tmp.DateTimeLastEditDate = this.contacts_dateTimeLastEditDate || null;
            tmp.LastEditUserName = this.contacts_lastEditUserName || null;
            return tmp;
        }
        if (data == "new") {
            this.setEmpty.call(this);
        }
        if (data && data != "new") {
            this.rawData = data;
            this.contacts_name = data.Name || this.contacts_name || null;
            this.contacts_shortName = data.ShortName || this.contacts_shortName || null;
            this.contacts_fullName = data.FullName || this.contacts_fullName || null;
            this.contacts_locatedGazette = data.LocatedGazette || this.contacts_locatedGazette || null;
            this.contacts_form = data.Form || this.contacts_form || null;
            this.contacts_licenseNumber = data.LicenseNumber || this.contacts_licenseNumber || null;
            this.contacts_dateTimeLicenseStartDate = data.DateTimeLicenseStartDate || this.contacts_dateTimeLicenseStartDate || null;
            this.contacts_dateTimeLicenseEndDate = data.DateTimeLicenseEndDate || this.contacts_dateTimeLicenseEndDate || null;
            this.contacts_licenseLocatedGazetteName = data.LicenseLocatedGazetteName || this.contacts_licenseLocatedGazetteName || null;
            this.contacts_documentLicenseId = data.DocumentLicenseId || this.contacts_documentLicenseId || null;
            this.contacts_catalogContactManager = data.CatalogContactManager || this.contacts_catalogContactManager || null;
            this.contacts_legalAddress = data.LegalAddress || this.contacts_legalAddress || null;
            this.contacts_factAddress = data.FactAddress || this.contacts_factAddress || null;
            this.contacts_telegraph = data.Telegraph || this.contacts_telegraph || null;
            this.contacts_fax = data.Fax || this.contacts_fax || null;
            this.contacts_phone = data.Phone || this.contacts_phone || null;
            this.contacts_email = data.Email || this.contacts_email || null;
            this.contacts_organizationNumber = data.OrganizationNumber || this.contacts_organizationNumber || null;
            this.contacts_iNN = data.INN || this.contacts_iNN || null;
            this.contacts_kPP = data.KPP || this.contacts_kPP || null;
            this.contacts_checkingАccount = data.CheckingАccount || this.contacts_checkingАccount || null;
            this.contacts_bankName = data.BankName || this.contacts_bankName || null;
            this.contacts_bankAddress = data.BankAddress || this.contacts_bankAddress || null;
            this.contacts_bIK = data.BIK || this.contacts_bIK || null;
            this.contacts_oKPO = data.OKPO || this.contacts_oKPO || null;
            this.contacts_cashAccount = data.CashAccount || this.contacts_cashAccount || null;
            this.contacts_oKONH = data.OKONH || this.contacts_oKONH || null;
            this.contacts_oKFS = data.OKFS || this.contacts_oKFS || null;
            this.contacts_oKATO = data.OKATO || this.contacts_oKATO || null;
            this.contacts_oKVED = data.OKVED || this.contacts_oKVED || null;
            this.contacts_pZ = data.PZ || this.contacts_pZ || null;
            this.contacts_isSelfOrganization = data.IsSelfOrganization || this.contacts_isSelfOrganization || false;
            this.contacts_note = data.Note || this.contacts_note || null;
            this.contacts_dateTimeCreateDate = data.DateTimeCreateDate || this.contacts_dateTimeCreateDate || null;
            this.contacts_createUserName = data.CreateUserName || this.contacts_createUserName || null;
            this.contacts_dateTimeLastEditDate = data.DateTimeLastEditDate || this.contacts_dateTimeLastEditDate || null;
            this.contacts_lastEditUserName = data.LastEditUserName || this.contacts_lastEditUserName || null;
        }

    }
    Contacts.prototype = {
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
            if (!this.contacts_name) {
                res.push({
                    "contacts_name": "------------------"
                });
            }
            if (!this.contacts_note) {
                res.push({
                    "contacts_note": "------------------"
                });
            }
            return res;
        },
    }
    return {
        createNew: function() {
            return new Contacts("new")
        },
        list: function(id) {
            return $odataresource("------------------");
        },
        getById: function(id, callBack, serverForced) {
            if (!serverForced && window.currentContacts && window.currentContacts.id && window.currentContacts.id == id) {
                callBack(window.currentContacts);
            } else {
                $http.get("------------------" + id).success(function(serv) {
                    window.currentContacts = new Contacts(serv);
                    window.ContactsCopy = new Contacts(serv);
                    callBack(window.currentContacts);
                })
            }
        },
        delete: {}
    };
}]);