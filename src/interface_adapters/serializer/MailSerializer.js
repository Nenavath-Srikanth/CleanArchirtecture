const _serializeSingleStudent = (mail) => {
    return {
      'id': mail.id,
      'email': mail_name,
      'text': mail_mark
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(mail => _serializeSingleMail(mail));
      }
      return _serializeSingleMail(data);
    }
  
  };