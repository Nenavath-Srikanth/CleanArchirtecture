const router = require('express').Router()
// var otpGenerator = require('otp-generator')
const axios = require('axios');
const multer = require('multer');
const path = require('path');
//const knex = require('knex');
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../../../config')
const message = require('../../../message')
const ImageSerializer = require('../serializer/ImageSerializer')

const ImageUseCases = require('../../application_business_rules/use_cases/ImageUseCases')
const ImageRepositoryMyql = require('../storage/ImageRepositoryMySql')
const ImageRepository = require('../../application_business_rules/repositories/ImageRepository')
const jwtKey = "It's a secret"
const jwtExpirySeconds = 300
////main
// initializing city repository 
const imageRepository = new ImageRepository(new ImageRepositoryMyql())
const imageUseCases = new ImageUseCases()
//////signup
// const imageUpload = multer({
//   dest: 'images',
// });
const serveIndex = require("serve-index");
const { response } = require('express');

//will be using this for uplading
//const upload = multer({ storage: storage })

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
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Only image files are allowed!!!";
      //return cb(new Error('Invalid file format'),false) ;
      return cb(new Error("Invalid File Format"), false);
    }
    cb(null, true);
  },
});

//will be using this for uplading
//const upload = multer({ storage: storage })
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//       req.fileValidationError = "Only image files are allowed!!!";
//       //return cb(new Error('Invalid file format'),false) ;
//       return cb(new Error("Invalid File Format"), false);
//     }
//     cb(null, true);
//   },
// });
router.get('/displayimage', async (req, res) => {
  console.log("coming to all display")
const result = await imageUseCases.getAllImages(imageRepository)
// output
if (result.length < 1) res.json({ status: 'failure', message: 'There are no image in the database' })
else {
 const imageSerializer = new ImageSerializer()
 res.json({
     status: 'success',
     message: 'image found',
     result: imageSerializer.serialize(result)
 })
 
}
})
////////////convert string to boolean////////////
// var parseBool = function(str) 
// {
//     // console.log(typeof str);
//     // strict: JSON.parse(str)

//     if(str == null)
//         return false;

//     if (typeof str === 'boolean')
//     {
//         return (str === true);
//     } 

//     if(typeof str === 'string')
//     {
//         if(str == "")
//             return false;

//         str = str.replace(/^\s+|\s+$/g, '');
//         if(str.toLowerCase() == 'true' || str.toLowerCase() == 'yes')
//             return true;

//         str = str.replace(/,/g, '.');
//         str = str.replace(/^\s*\-\s*/g, '-');
//     }

//     // var isNum = string.match(/^[0-9]+$/) != null;
//     // var isNum = /^\d+$/.test(str);
//     if(!isNaN(str))
//         return (parseFloat(str) != 0);

//     return false;
// }


router.post('/uploadimage', upload.single('image'), async (req, res) => {

 console.log("coming to images")
//  const test=otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false });
//  console.log(test)
 console.log(req.body)
//  const { textarea,pending,approved,denied,cleared } = req.body;


 const textarea=req.body.textarea
 const status=req.body.pending
//  const approved2=parseBool(req.body.approved)
//  const denied2=parseBool(req.body.denied)
//  const cleared2=parseBool(req.body.cleared)
//  console.log(pending2)
//  console.log(approved2)
//  console.log(denied2)
//  console.log(cleared2)



 console.log(textarea)
//  console.log(userid)
    // inputs
    console.log(req.file);
    // console.log("coming to images")
const { filename, mimetype, size, path } = req.file;
const filepath = req.file.path;
// const {textarea}=req.body;
//   let emp = req.body;
        const image_filename = filename
        // console.log("coming to images")                
        console.log(image_filename)
         const image_filepath = path
          const image_size = size
           const image_mimetype = path

         console.log(filename)

   const result = await imageUseCases.addImage({ image_filename, image_filepath, image_size, image_mimetype,textarea,status }, imageRepository)

    if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const imageSerializer = new ImageSerializer()
        res.status(201).json({
            status: 'success',
            message: 'Image upload Successful',
            Image: imageSerializer.serialize(result)
        })
    }
})
// router.post('/addpunchout', async (req, res) => {
//     // inputs
//     console.log("coming to punchout")
//     console.log(req.body)
//     const { employee_email, employee_time, employee_location } = req.body
// //console.log(req.body)
//     // treatment
//     const result = await punchInUseCases.addPunchIn({ employee_email, employee_time, employee_location }, punchInRepository)

//     // output
//     if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
//     else {
//         const punchInSerializer = new PunchInSerializer()
//         res.status(201).json({
//             status: 'success',
//             message: 'Punch out Successful',
//             PunchIn: punchInSerializer.serialize(result)
//         })
//     }
// })
//////signup

////update by id
router.put('/put/:id', async (req, res) => {
    // input
    console.log('put method called')
   const {id,status} = req.body
   console.log(req.body);
  //  const{id}=req.params
   console.log(req.params)
   console.log('coming here')

    // treatment
    const result = await imageUseCases.updateImage(id, {status}, imageRepository)
    // output
    // if (result[0] == 0) res.json({ status: 'failed', message: 'failed to update Leave', error: 'could not find the Leave with the id given' })
    // if (result[0] == 1) res.json({ status: 'success', message: 'Leave updated successfully' })
    if ((result.length<1)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const imageSerializer = new ImageSerializer()
        res.status(201).json({
            status: '200',
            message: 'Status Updated Successfully',
        })
    }
})

//     res.json({ status: 'Failed', message: 'error occured', error: result })

// })
////update by id



/////get all
router.get('/allpunchin', async (req, res) => {
         console.log("coming to all punch")
    const result = await punchInUseCases.getAllPunchin(punchInRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no punchins in the database' })
    else {
        const punchInSerializer = new PunchInSerializer()
        res.json({
            status: 'success',
            message: 'Punchins found',
            result: punchInSerializer.serialize(result)
        })
    }
})

/////get all

////delete by id
router.delete('/', async (req, res) => {
    // input
    const { id } = req.body

    // treatment 
    const result = await leaveUseCases.deleteLeave(id, punchInRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the punchins with given Id' })
    else res.json({ status: 'success', message: 'Leave deleted successfully' })
})

////delete by id



/////get by id
router.get('/email', async (req, res) => {
    // input
    
    const { employee_email } = req.body
 console.log(req.body)
 console.log("getting punch in details by  here")
 console.log(employee_email)
    // treatment 
    const result = await punchInUseCases.getSinglePunchIn(employee_email, punchInRepository)
    console.log(result)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not fetch the punchins with given Id' })
    else res.json({ status: 'success', message: result })
})

/////get by id



/////login
router.post('/login', async (req, res) => {
    // inputs
    console.log("coming to login method")
    const { Leave_name, Leave_email } = req.body
console.log(req.body)
    
    const result = await LeaveUseCases.logincheck({ Leave_name, Leave_email }, LeaveRepository)

  if (result == 0) res.json({ status: 'Failed', message: 'Invalid credintials' })
    else {
        if (Leave_email != result[0].Leave_email){
            res.json({ status: 'Failed', message: 'Invalid credintials' })
        }
        else{
            const token = jwt.sign({ Leave_name }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
	console.log("token:", token)
        const LeaveSerializer = new LeaveSerializer()
        res.status(200).json({
            status: 'success',
            message: 'login successful',
            doctor: {"token":token}
        })
    }
    }
})

/////login
// router.post('/uploadimage', upload.single('image'), async (req, res) => {
//  console.log("coming to react code")
//    const article = { image_filename: 'React POST Request Example', image_filepath: 'path test', image_size: '2222', image_mimetype: '111111' };
//     axios.post('http://localhost:3000/api/v1/image/uploadimage', article)
// try {
//   //console.log(response.data.id)
// } catch (error) {
//  // console.log(error)
// }
//        // .then(response => console.log(response));
// //  console.log(req.body)
// //  const usermail=req.body.email
// //  const userid=req.body.userid
// //  console.log(usermail)
// //  console.log(userid)
// //     // inputs
// //     console.log(req.file);
// //     // console.log("coming to images")
// // const { filename, mimetype, size, path } = req.file;
// // const filepath = req.file.path;
// // //   let emp = req.body;
// //         const image_filename = filename
// //         // console.log("coming to images")                
// //         console.log(image_filename)
// //          const image_filepath = path
// //           const image_size = size
// //            const image_mimetype = path

// //          console.log(filename)

// //    const result = await imageUseCases.addImage({ image_filename, image_filepath, image_size, image_mimetype }, imageRepository)

// //     if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
// //     else {
// //         const imageSerializer = new ImageSerializer()
// //         res.status(201).json({
// //             status: 'success',
// //             message: 'Image upload Successful',
// //             Image: imageSerializer.serialize(result)
// //         })
// //     }
// })

module.exports = router






