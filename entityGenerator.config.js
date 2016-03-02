var config = {
    entityName: 'OrderType',
    requiredFields: ['Name'],
    moduleName: 'orderType',
    listRoute: 'api/SimpleCatalogOrderTypes',
    addRoute: 'CatalogOrderTypes/Add',
    updateRoute: 'CatalogOrderTypes/Update',
    deleteRoute: 'CatalogOrderTypes/Delete/',
    multipleDeleteRoute: 'CatalogOrderTypes/MultipleDelete',
    rootRoute: 'CatalogOrderTypes/'
}

module.exports = config


/*
Вручную:
1) прописать роуты
2) прописать гриды
3) прописать диалоги

*/