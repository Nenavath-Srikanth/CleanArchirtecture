const router = require('express').Router()
const _ = require('lodash')
const nodemailer = require("nodemailer");
const MailSerializer = require('../serializer/MailSerializer')

const MailUseCases = require('../../application_business_rules/use_cases/MailUseCases')
const MailRepositoryMyql = require('../storage/MailRepositoryMysql')
const MailRepository = require('../../application_business_rules/repositories/MailRepository')


// initializing city repository 
const mailRepository = new MailRepository(new MailRepositoryMyql())
const mailUseCases = new MailUseCases()

router.post('/send', async (req, res) => {
    const { email,text } = req.body
    console.log(req.body)
    const result = await mailUseCases.addMail({ email ,text }, mailRepository)


        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
          auth: {
            user: 'nenavath.srikanth29@gmail.com', // generated ethereal user
            pass: '1629cd143', // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'nenavath.srikanth29@gmail.com', // sender address
          to: req.body.email, // list of receivers
          subject: "Hello message from Srikanth", // Subject line
          text: req.body.text, // plain text body
        //   html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // fs.readFile('template.html', {encoding: 'utf-8'}, function (err, html) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'nenavath.srikanth29@gmail.com',
    //       pass: '1629cd143',
    //     },
    //   });
    //     transporter.sendMail({
    //     from: '"arun" <nenavath.srikanth29@gmail.com>', // sender address
    //     to: req.body.mail, // list of receivers
    //     subject: "Testing email", // Subject line
    //     text: "Testing", // plain text body
    //     html: html, // html body
    //   }).then(info => {
    //     console.log({info});
    //     res.send({ Success: 'Email Sent Successfully' });
    //   }).catch(console.error);
    //     } });



      })
      
    


    







    // inputs
   
   
    // treatment

    // output
    // if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    // else {
    //     const mailSerializer = new MailSerializer()
    //     res.status(201).json({
    //         status: 'success',
    //         message: 'Student created successfully',
    //         student: mailSerializer.serialize(result)
       
    



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
    const result = await studentUseCases.getAllStudents(studentRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no students in the database' })
    else {
        const studentSerializer = new StudentSerializer()
        res.json({
            status: 'success',
            message: 'student found',
            result: studentSerializer.serialize(result)
        })
    }
})

router.delete('/', async (req, res) => {
    // input
    const { id } = req.body

    // treatment 
    const result = await studentUseCases.deleteStudent(id, studentRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the student with given Id' })
    else res.json({ status: 'success', message: 'student deleted successfully' })
})


module.exports = router