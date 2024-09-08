var express = require('express');
var router = express.Router();
var userController=require('../controllers/userController')
var roleController=require('../controllers/roleController')
var authMiddleware=require('../middleware/authMiddleware')

router.post('/user-register',userController.registerUser);

router.get('/userlogin',authMiddleware.VerifyToken,userController.registerLogin);

router.get('/dashboard',authMiddleware.VerifyToken,userController.dashboard);

router.post('/patient-records',authMiddleware.VerifyToken,roleController.roleModel)

router.post('/doctor-details',authMiddleware.VerifyToken,roleController.doctorDetails)

router.get('/viewpatient',authMiddleware.VerifyToken,roleController.viewPatient)

router.post('/medical-register',authMiddleware.VerifyToken,roleController.registerMedical)

router.post('/appointment-register',authMiddleware.VerifyToken,roleController.appointmentRegister)

router.get('/patientDetails',authMiddleware.VerifyToken,roleController.patientDetails)

module.exports = router;
