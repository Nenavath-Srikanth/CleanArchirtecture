module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(imageuploadEntity){
        return this.repository.add(imageuploadEntity)
    }

    // update existing city
    update(id,imageuploadEntity){
        return this.repository.update(id, imageuploadEntity)
    }

    // delete existing city
    delete(id){
        return this.repository.delete(id)
    }

    // get all cities
    getAll(){
        return this.repository.getAll()
    }
}