const _serializeSingleStudent = (student) => {
    return {
      'id': student.id,
      'student_name': student.student_name,
      'student_mark': student.student_mark
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(student => _serializeSingleStudent(student));
      }
      return _serializeSingleStudent(data);
    }
  
  };