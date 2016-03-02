var OrderTypes = function() {
    this.fields = {
        orderTypes_name: {
            elem: element(by.className('form-field-orderTypes_name')).element(by.tagName('input')),
            type: 'input'
        },
        orderTypes_note: {
            elem: element(by.className('form-field-orderTypes_note')).element(by.tagName('input')),
            type: 'input'
        },
    }
    return this;
}
module.exports = OrderTypes