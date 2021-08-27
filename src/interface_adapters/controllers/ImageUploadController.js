const router = require('express').Router()
const _ = require('lodash')
const multer = require('multer');
const path = require('path');
const ImageUploadSerializer = require('../serializer/ImageUploadSerializer')

const ImageUploadUseCases = require('../../application_business_rules/use_cases/ImageUploadUseCases')
const ImageUploadRepositoryMyql = require('../storage/ImageUploadRepositoryMysql')
const ImageUploadRepository = require('../../application_business_rules/repositories/ImageUploadRepository')


// initializing city repository 
const imageuploadRepository = new ImageUploadRepository(new ImageUploadRepositoryMyql())
const imageuploadUseCases = new ImageUploadUseCases()

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log("DocumentType:"+documenttypeid+":"+userinfoid)
     // console.log("Parameter to set destination:" + req.params.type);
       cb(null, "./upload");
      //TODO Based on Document Type we can set different paths below 'change ./uploads for different conditon
      // cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      //console.log(req)
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      console.log('Inside Upload mmulter');
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!!!";
        //return cb(new Error('Invalid file format'),false) ;
        return cb(new Error("Invalid File Format"), false);
      }
      cb(null, true);
    },
  });


  router.post('/uploadimage', upload.single('image'), async (req, res) => {
    console.log("coming to images")
    // console.log(req.body)
  
    console.log(req.body)
    const usermail=req.body.email
    const userid=req.body.userid
    console.log(usermail)
    console.log(userid)
       // inputs
       console.log(req.file);
       // console.log("coming to images")
   const { filename, mimetype, size, path } = req.file;
   const filepath = req.file.path;
   //   let emp = req.body;
           const image_filename = filename
           // console.log("coming to images")
           console.log(image_filename)
            const image_filepath = path
             const image_size = size
              const image_mimetype = path
            console.log(filename)
      const result = await imageuploadUseCases.addImageUpload({ image_filename, image_filepath, image_size, image_mimetype }, imageuploadRepository)
       if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
       else {
           const imageuploadSerializer = new ImageUploadSerializer()
           res.status(201).json({
               status: 'success',
               message: 'Image upload Successful',
               Image: imageuploadSerializer.serialize(result)
           })
       }
   })
// router.post('/', async (req, res) => {
//     // inputs
//     const { filename,filepath,mimetype,imagesize,username,emailid,textarea  } = req.body
   
//     // treatment
//     const result = await imageuploadUseCases.addImageUpload({ filename,filepath,mimetype,imagesize,username,emailid,textarea }, imageuploadRepository)

//     // output
//     if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
//     else {
//         const imageuploadSerializer = new ImageUploadSerializer()
//         res.status(201).json({
//             status: 'success',
//             message: 'image created successfully',
//             image: imageuploadSerializer.serialize(result)
//         })
//     }
// })
// router.post('/', upload.single("file"), async (req, res) => {
// console.log("comig to image upload")

// if(req.file){
//   console.log('Image Receievd')
// }else{
//   console.log('Image Not Rceievd');
// }
//    // console.log('File:'+req.image.name)
// //  const s1=req.body.email
// //  const s2=req.body.username
// //  const s3=req.body.textarea
// //  console.log(usermail)
// //  console.log(username)
//     // inputs
//     // console.log(req.file);
//     // console.log("coming to images")
//   //  const { name,size,mimetype } = req.files;
//     // console.log('Line 74'+req.files.name)
//     // const filepath = req.file.path;
//     //   let emp = req.body;
//             // const name = name
//    //         console.log("coming to images"+file.name)
//             //console.log(image_filename)
//             //  const imagefilepath = path
//               // const size = size
//               // const type=type
//               //  const imagemimetype = path
// // const filepath = req.file.path;
//   //let emp = req.body;
//   //  const email=emp.email
//   //  const username=emp.username
//   //  const textarea=emp.textarea
//   //  console.log(email)
//   //  console.log(username)
//   //  console.log(textarea)
//         // const image_filename = filename
//         // console.log("coming to images")
//         // console.log(image_filename)
//         //  const image_filepath = filepath
//         //   const image_size = imagesize
//         //    const image_mimetype = filepath
//          //console.log(filename)
// //    const result = await imageuploadUseCases.addImageUpload({ name:name, size:size,mimetype:mimetype }, imageuploadRepository)
// //     if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
// //     else {
// //         const imageuploadSerializer = new ImageUploadSerializer()
// //         res.status(201).json({
// //             status: 'success',
// //             message: 'Image upload Successful',
// //             Image: imageuploadSerializer.serialize(result)
// //         })
// //     }
// })





// // Upload Endpoint
// router.post('/upload', async (req, res) => {
//   console.log(req.filePath);
//   console.log("coming to image upload")
//   if (req.files === null) {
//  return res.status(400).json({ msg: 'No file uploaded' });
//   }
//  const file = req.files.file;
//  file.mv(`${__dirname}/upload${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
//   });
// });







router.put('/updatedoctor', async (req, res) => {
    console.log("step1")
    // input
    const { id, name,age, spelization } = req.body

    // treatment
    const result = await doctorUseCases.updateDoctor(id, { name,age, spelization }, doctorRepository)
    // output
    if (result[0] == 0) res.json({ status: 'failed', message: 'failed to update Doctor', error: 'could not find the doctor with the id given' })
    if (result[0] == 1) res.json({ status: 'success', message: 'doctor updated successfully' })
    res.json({ status: 'Failed', message: 'error occured', error: result })

})

router.get('/', async (req, res) => {
    // treatment
    const result = await doctorUseCases.getAllDoctors(doctorRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no doctors in the database' })
    else {
        const doctorSerializer = new DoctorSerializer()
        res.json({
            status: 'success',
            message: 'doctor found',
            result: doctorSerializer.serialize(result)
        })
    }
})

router.delete('/', async (req, res) => {
    // input
    const { id } = req.body

    // treatment 
    const result = await doctorUseCases.deleteDoctor(id, doctorRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the doctor with given Id' })
    else res.json({ status: 'success', message: 'doctor deleted successfully' })
})


module.exports = router