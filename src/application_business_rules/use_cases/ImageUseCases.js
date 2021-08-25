module.exports = class {
    getAllImages (Repository)  {
        return Repository.getAll()
    }
    addImage (imageEntity, Repository) { 
        return Repository.add(imageEntity)
    }
    // addPunchOut (punchOutEntity, Repository) { 
    //     return Repository.addOut(punchOutEntity)
    // }
    updateImage (id, imageEntity, Repository)  {
        return Repository.update(id,imageEntity)
    }
    // deletePunchIn (id, Repository)  {
    //     return Repository.delete(id)
    // }
    // getPunchInById (id, Repository)  {
    //     return Repository.getById(id)
    // }
    // getSinglePunchIn (employee_email, Repository)  {
    //     return Repository.get(employee_email)
    // }
    // logincheck (punchInEntity, Repository)  {
    //     return Repository.login(punchInEntity)
    // }

}