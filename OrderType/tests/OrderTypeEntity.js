var OrderType = function() {
    this.fields = {
        orderType_name: {
            elem: element(by.className('form-field-orderType_name')).element(by.tagName('input')),
            type: 'input'
        },
        orderType_note: {
            elem: element(by.className('form-field-orderType_note')).element(by.tagName('input')),
            type: 'input'
        },
    }
    return this;
}
module.exports = OrderType