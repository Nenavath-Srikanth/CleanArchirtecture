module.exports = class {
    getAllImageUpload (Repository)  {
        return Repository.getAll()
    }
    addImageUpload (imageuploadEntity, Repository) { 
        return Repository.add(imageuploadEntity)
    }
    updateDoctor (id, doctorEntity, Repository)  {
        return Repository.update(id,doctorEntity)
    }
    deleteDoctor (id, Repository)  { // delete doctor
        return Repository.delete(id)
    }
getDoctor (id,Repository) {
    return Repository.getDoctor(id)
}
}