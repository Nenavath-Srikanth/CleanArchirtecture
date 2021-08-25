module.exports = class {
    getAllMail (Repository)  {
        return Repository.getAll()
    }
    addMail (mailEntity, Repository) { 
        return Repository.add(mailEntity)
    }
    updateMail (id, mailEntity, Repository)  {
        return Repository.update(id,mailEntity)
    }
    deleteMail (id, Repository)  {
        return Repository.delete(id)
    }

}