const router = require('express').Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwtKey='its a secret'

const _ = require('lodash')
const UserSerializer = require('../serializer/UserSerializer')
const UserUseCases = require('../../application_business_rules/use_cases/UserUseCases')
const UserRepositoryMyql = require('../storage/UserRepositoryMysql')
const UserRepository = require('../../application_business_rules/repositories/UserRepository');
const { get, isMatch } = require('lodash');


// initializing city repository 
const userRepository = new UserRepository(new UserRepositoryMyql())
const userUseCases = new UserUseCases()



// router.post('/login', async (req, res) => {
//     // inputs
//     const { user_email,user_password } = req.body
//     const u1 = await user.findOne({ user_email });
//   //Decrypt user password
//   if (u1 && (await bcrypt.compare(user_password, user_password))) {
//     // Create token
//     const token1 = jwt.sign(
//       { user_name: user_name,user_email },
//       jwtKey,
//       {
//         expiresIn: "2h",
//       }
    // );
   
    // }
    // router.post('/login',async (req,res)=>{
    //     const { user_email, user_password  } = req.body
    //     const result = await userUseCases.findOne({ user_email, user_password  }, userRepository)
    //     if (result == 0) res.json({ status: 'Failed', message: 'Invalid Credintials' })
    //     bcrypt.compare(user_password,user_password).then(isMatch=>{
    //         if(isMatch){
                
    //          const token1= jwt.sign(
    //                 { user_name: user_name, user_email },
    //                 jwtKey,
    //                 {
    //                   expiresIn: "2h",
    //                 },
                   
    //             );
    //             // const result = await userUseCases.addUser({ user_name,user_age,user_gender,user_email:loweremail,user_dob,user_password:encryptedPassword,user_mobileno,user_city,token:token1 }, userRepository)

    // // output
    // if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    // else {
    //     const userSerializer = new UserSerializer()
    //     res.status(201).json({
    //         status: 'success',
    //         message: 'User created successfully',
    //         token:token1,
    //         user: userSerializer.serialize(result)
    //     })
    // }
    //         }
    //     })


    // })
////////////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/login', async (req, res) => {
        console.log('coming to login')
        const { user_email, user_password  } = req.body
        // treatment
        const result = await userUseCases.findOne({ user_email, user_password  }, userRepository)
        if (result == 0) res.json({ status: 'Failed', message: 'Invalid Credintials' })
        else {
            console.log("else funtion")
        //   const decryptpassword=  async (user_password) => {
        //     try {
        //         // Compare password
                // return await bcrypt.compareSync(user_password, user_password);
        //     } catch (error) {
        //         console.log(error);
        //     }
        
        //     // Return false if error
        //     return false;
        // };
          
          
        //   (await bcrypt.compare(user_password,user_password)) {


        //    exports.getsaltHash = (user_password, saltString, staticSalt) => {
        //         let hash = crypto.createHmac('sha512', saltString + staticSalt);
        //         hash.update(user_password);
        //         return {
        //             salt: saltString,
        //             passwordHash: hash.digest('hex')
                    
        //         };
                
                
        //     };
    
        const comparison = await bcrypt.compare(user_password, result[0].user_password)
        if(!comparison){
                res.json({ status: 'Failed', message: 'password does not match' })
            }
        
          
            else{
                // console.log("token verify")
                // console.log(result[0].customer_id)
         //res.json({ status: 'Success', message: 'OTP Matched,Registration Successful' })
        //console.log("token:", token)
            //const userRegisterSerializer = new UserRegisterSerializer()
            res.status(200).json({
                status: '200',
                message: 'login successful',
                profile: [{
                 user_name: result[0].user_name,
                 age: result[0].user_age,
                 email: result[0].user_email,
                 mobileno: result[0].user_mobileno,
                 city: result[0].user_city,
                 dob: result[0].user_dob,
                 password: result[0].user_password,

                 token: result[0].token,
                 }]
               // customer: {"customerid":result[0].customer_id}
            })
        
        }
        }
    })
    
  ////////////////////////////////////////////////////////////////////////////////////  




    //     User.findOne({user_email: req.body.user_email})
    //         .then(user => {
    //           if (user) {
    //             user.passwordComparison(req.body.password)
    //                 .then(passwordsMatch => {
    //                   if (passwordsMatch) {
    //                     res.locals.redirect = `/users/dashboard`;
    //                     req.flash("success", `${user_name}'s logged in successfully!`);
    //                     res.locals.user = user;
    //                   } else {
    //                     req.flash("error", "Failed to log in user account: Incorrect Password.");
    //                     res.locals.redirect = "/users/login";
    //                   }
    //                   next();
    //                 });
    //           } else {
    //             req.flash("error", "Failed to log in user account: User account not found.");
    //             res.locals.redirect = "/users/login";
    //             next();
    //       }
    //     })
    //         .catch(error => {
    //           console.log(`Error logging in user: ${error.message}`);
    //           next(error);
    //         });
    //   }
    // )
      





    
    

  
  

    // const result = await userUseCases.addUser({ user_name,user_age,user_gender,user_email:loweremail,user_dob,user_password:encryptedPassword,user_mobileno,user_city,token:token1 }, userRepository)

    // if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    // else {
    //     const userSerializer = new UserSerializer()
    //     res.status(201).json({
    //         status: 'success',
    //         message: 'User created successfully',
    //         token:token1,
    //         user: userSerializer.serialize(result)
    //     })
    // }




router.post('/register', async (req, res) => {
    // inputs
    const { user_name,user_age,user_gender,user_email,user_dob,user_password,user_mobileno,user_city } = req.body
   
  //Encrypt user password
  encryptedPassword = await bcrypt.hash(user_password, 10);
  //  convert email to lowercase
  loweremail=user_email.toLowerCase()

   // Create token
   const token1 = jwt.sign(
    { user_name: user_name, user_email },
    jwtKey,
    {
      expiresIn: "2h",
    }
  );
  // save user token
 //user.token = token1;
 // console.log(user.token)


    // treatment
    const result = await userUseCases.addUser({ user_name,user_age,user_gender,user_email:loweremail,user_dob,user_password:encryptedPassword,user_mobileno,user_city,token:token1 }, userRepository)

    // output
    if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const userSerializer = new UserSerializer()
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            token:token1,
            user: userSerializer.serialize(result)
        })
    }
})


router.put('/', async (req, res) => {
    // input
    const { id, student_name, student_mark } = req.body

    // treatment
    const result = await studentUseCases.updateStudent(id, { student_name, student_mark }, studentRepository)
    // output
    if (result[0] == 0) res.json({ status: 'failed', message: 'failed to update Student', error: 'could not find the student with the id given' })
    if (result[0] == 1) res.json({ status: 'success', message: 'student updated successfully' })
    res.json({ status: 'Failed', message: 'error occured', error: result })

})

router.get('/', async (req, res) => {
    // treatment
    const result = await userUseCases.getAllUsers(studentRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no students in the database' })
    else {
        const userSerializer = new UserSerializer()
        res.json({
            status: 'success',
            message: 'user found',
            result: userSerializer.serialize(result)
        })
    }
})

router.delete('/', async (req, res) => {
    // input
    const { id } = req.body

    // treatment 
    const result = await userUseCases.deleteUser(id, userRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the student with given Id' })
    else res.json({ status: 'success', message: 'user deleted successfully' })
})


module.exports = router