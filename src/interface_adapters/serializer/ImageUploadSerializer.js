const _serializeSingleImageUpload = (imageupload) => {
    return {
      // 'id': imageupload.id,
      // 'filename': imageupload.filename,
      // 'filepath': imageupload.filepath,
      // 'mimetype': imageupload.mimetype,
      // 'imagesize': imageupload.imagesize,
      // 'username': imageupload.username,
      // 'email': imageupload.email,
      // 'textarea':imageupload.textarea
      'id': imageupload.id,
      'image_filename': imageupload.image_filename,
      'image_filepath':imageupload.image_filepath,
      'image_mimetype':imageupload.image_mimetype,
      'image_size':imageupload.image_size
      
    };
  };
  
  module.exports = class {
  
    serialize(data) {
      if (!data) {
        throw new Error('Expect data to be not undefined nor null');
      }
      if (Array.isArray(data)) {
        return data.map(imageupload => _serializeSingleImageUpload(imageupload));
      }
      return _serializeSingleImageUpload(data);
    }
  
  };