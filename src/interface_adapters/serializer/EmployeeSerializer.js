const _serializeSingleEmployee = (employee) => {
    return {
      'id': employee.id,
      'name': employee.name,
      'age': employee.age,
      'salary':employee.salary
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(employee => _serializeSingleEmployee(employee));
      }
      return _serializeSingleEmployee(data);
    }
  
  };