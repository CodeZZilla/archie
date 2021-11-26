import Backendless from "backendless";

const saveObject = async (tableName, object) => {
    return await Backendless.Data.of(tableName).save(object)
}

const getAllObject = async (tableName) => {
    return await Backendless.Data.of(tableName).find({})
}

const findObjectByObjectId = async (tableName, objectId) => {
    return await Backendless.Data.of(tableName).findById(objectId)
}

const getAllObjectByRelationField = async (fieldRel, tableName, object) => {
    let loadRelationsQuery = Backendless.LoadRelationsQueryBuilder.create()
    loadRelationsQuery.setRelationName(fieldRel)
    return await Backendless.Data.of(tableName).loadRelations(object, loadRelationsQuery)
}

// запись на пример: в компанию добавляем локацию (метод дописывает тот лист что уже там есть) whereObject=обьект куда пимем, whichObject=какой пишет
const setObjectRelationOneToMany = async (fieldRel, tableName, whereObject, whichObject) => {
    let loadRelations = Backendless.LoadRelationsQueryBuilder.create();
    loadRelations.setRelationName(fieldRel);
    let arrUsersRole = await Backendless.Data.of(tableName).loadRelations(
        {objectId: whereObject.objectId}, loadRelations)
    await Backendless.Data.of(tableName).setRelation(whereObject, fieldRel, [...arrUsersRole, whichObject])
}

const getRelObjectDepth1 = async (objectId, tableName) => {
    let queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setRelationsDepth(1);
    return await Backendless.Data.of(tableName).findById(objectId, queryBuilder)
    // let queryBuilder = Backendless.LoadRelationsQueryBuilder.create();
    // queryBuilder.setWhereClause("other_users")
    // //queryBuilder.setRelationName("other_users");
    // return await Backendless.Data.of("Users").loadRelations(object.objectId, queryBuilder)
}

const getRelObjectDepth1All = async (tableName) => {
    let queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setRelationsDepth(1);
    return await Backendless.Data.of(tableName).find(queryBuilder)
    // let queryBuilder = Backendless.LoadRelationsQueryBuilder.create();
    // queryBuilder.setWhereClause("other_users")
    // //queryBuilder.setRelationName("other_users");
    // return await Backendless.Data.of("Users").loadRelations(object.objectId, queryBuilder)
}



export {
    saveObject,
    getAllObject,
    getAllObjectByRelationField,
    setObjectRelationOneToMany,
    findObjectByObjectId,
    getRelObjectDepth1,
    getRelObjectDepth1All
}