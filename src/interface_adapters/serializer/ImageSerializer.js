const _serializeSingleImage = (image) => {
    return {
      'id': image.id,
      'image_filename': image.image_filename,
      'image_filepath': image.image_filepath,
      'image_mimetype': image.image_mimetype,
      'image_size': image.image_size,
      'textarea':image.textarea,
      'status':image.status
      // 'Approved':image.Approved,
      // 'Denied':image.Denied,
      // 'Cleared':image.Cleared
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(image => _serializeSingleImage(image));
      }
      return _serializeSingleImage(data);
    }
  
  };