module.exports = class {
    getAllUsers (Repository)  {
        return Repository.getAll()
    }
    addUser (userEntity, Repository) { 
        return Repository.add(userEntity)
    }
    updateUser (id, userEntity, Repository)  {
        return Repository.update(id,userEntity)
    }
    deleteUser (id, Repository)  {
        return Repository.delete(id)
    }
    
    findOne (userEntity, Repository) { 
        return Repository.findOne(userEntity)
    }

}