import Backendless from "backendless";

const saveObject = async (tableName, object) => {
    return await Backendless.Data.of(tableName).save(object)
}

const getAllObject = async (tableName) => {
    return await Backendless.Data.of(tableName).find({})
}

const getAllObjectByRelationField = async (fieldRel, tableName, object) => {
    let loadRelationsQuery = Backendless.LoadRelationsQueryBuilder.create()
    loadRelationsQuery.setRelationName(fieldRel)
    return await Backendless.Data.of(tableName).loadRelations(object, loadRelationsQuery)
}

export {saveObject, getAllObject, getAllObjectByRelationField}