const _serializeSinglePatient = (patient) => {
    return {
      'id': patient.id,
      'name': patient.name,
      'age': patient.age,
      'height':patient.height,
      'weight':patient.weight
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(patient => _serializeSinglePatient(patient));
      }
      return _serializeSinglePatient(data);
    }
  
  };