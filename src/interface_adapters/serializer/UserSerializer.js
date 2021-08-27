const _serializeSingleUser = (user) => {
    return {
      'id': user.id,
      'user_name': user.user_name,
      'user_age': user.user_age,
      'user_gender': user.user_gender,
      'user_email': user.user_email,
      'user_password': user.user_password,
      'user_mobileno': user.user_mobileno,
      'user_city': user.user_city
      //'token':user.token


    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(user => _serializeSingleUser(user));
      }
      return _serializeSingleUser(data);
    }
  
  };