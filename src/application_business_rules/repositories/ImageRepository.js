module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(imageEntity){
        return this.repository.add(imageEntity)
    }
    // addOut(punchOutEntity){
    //     return this.repository.addOut(punchOutEntity)
    // }

    // // update existing city
    update(id,imageEntity){
        return this.repository.update(id, imageEntity)
    }

    // // delete existing city
    // delete(id){
    //     return this.repository.delete(id)
    // }

    // // get all cities
    getAll(){
        return this.repository.getAll()
    }
    // getById(id){
    //     return this.repository.getAll(id)
    // }
    // get(employee_email){
    //     return this.repository.get(employee_email)
    // }
    // login(punchInEntity){
    //     return this.repository.check(punchInEntity)
    // }
}