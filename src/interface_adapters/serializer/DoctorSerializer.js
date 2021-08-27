const _serializeSingleDoctor = (doctor) => {
    return {
      'id': doctor.id,
      'name': doctor.name,
      'age': doctor.age,
      'spelization':doctor.spelization
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(doctor => _serializeSingleDoctor(doctor));
      }
      return _serializeSingleDoctor(data);
    }
  
  };