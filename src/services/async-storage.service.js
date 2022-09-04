import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save
}

function query(entityType, filterBy = {}, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, entity) {
    const newEntity = { ...entity }
    newEntity._id = utilService.makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity)
            save(entityType, entities)
            return entities
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            save(entityType, entities)
            return entities
        })
}


function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}