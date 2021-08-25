const express = require('express')
const app = express()
const morgan = require('morgan')
const serveIndex = require('serve-index')
// const bodyParser= require('body-parser')
// const fileUpload = require('express-fileupload');


// Middlewares
const tokenChecker = require('../../interface_adapters/middlewares/TokenChecker')
const studentRoutes = require('../../interface_adapters/controllers/StudentController')
const doctorRoutes = require('../../interface_adapters/controllers/DoctorController')
const patientRoutes = require('../../interface_adapters/controllers/PatientController')
const employeeRoutes = require('../../interface_adapters/controllers/EmployeeController')
const imageuploadRoutes = require('../../interface_adapters/controllers/ImageUploadController')
const imageRoutes = require('../../interface_adapters/controllers/ImageController')
const mailRoutes = require('../../interface_adapters/controllers/MailController')
const userRoutes = require('../../interface_adapters/controllers/UserController')







// Logger
app.use(morgan("dev"))
app.use('/upload',express.static('upload'),serveIndex('upload',{'icons': true}));
// Body Parser
app.use(express.urlencoded({ limit: '50mb', extended: false }))
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
// app.use(fileUpload());


// handle cors Errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// routes to be published here
app.use('/api/v1/student',studentRoutes)
app.use('/doctor',doctorRoutes)
app.use('/doctor',doctorRoutes)


app.use('/patient',patientRoutes)
app.use('/employee',employeeRoutes)
app.use('/image',imageuploadRoutes)
app.use('/api/v1/image',imageRoutes)
app.use('/api/v1/image',imageRoutes)
app.use('/api/v1/updatestatus',imageRoutes)
app.use('/api/v1/mail',mailRoutes)
app.use('/api/v1/user',userRoutes)



















// Error Handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app