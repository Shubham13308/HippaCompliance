const bcrypt = require("bcrypt");
const patienfieldValidator = require("../validator/userValidator");
var models = require("../models");

exports.roleModel = function (req, res) {
  const validationError = patienfieldValidator.patienfieldValidator(req.body);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  if (req.body.role === "Receptionist") {
    models.Patient.findOne({ where: { Email: req.body.Email } })
      .then((existingPatient) => {
        if (existingPatient) {
          return res.status(400).json({ error: "Email already exists" });
        }

        return Promise.all([
          bcrypt.hash(req.body.Email, 10),
          bcrypt.hash(req.body.IncPolicyNumber, 10),
          bcrypt.hash(req.body.Insurance_provider, 10),
        ]);
      })
      .then(([hashedEmail, hashedIncPolicyNumber, hashedInsuranceProvider]) => {
        return models.Patient.create({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          DOB: req.body.DOB,
          Gender: req.body.Gender,
          Address: req.body.Address,
          City: req.body.City,
          State: req.body.State,
          Zipcode: req.body.Zipcode,
          Phn_number: req.body.Phn_number,
          Email: hashedEmail,
          Insurance_provider: hashedInsuranceProvider,
          IncPolicyNumber: hashedIncPolicyNumber,
          EmergencyContactName: req.body.EmergencyContactName,
          EmergencyContactNumber: req.body.EmergencyContactNumber,
        });
      })
      .then((patient) => {
        return res
          .status(201)
          .json({ message: "Patient record created", data: patient });
      })
      .catch((error) => {
        console.error("Error creating patient record:", error);
        return res.status(500).json({
          error: "An error occurred while creating the patient record",
        });
      });
  } else {
    return res.status(403).json({ error: "Unauthorized Access" });
  }
};

exports.doctorDetails = function (req, res) {
  console.log(req.body);

  if (req.body.role === "Doctor") {
    models.Doctor.findOne({ where: { Email: req.body.Email } })
      .then((existingDoctor) => {
        if (existingDoctor) {
          return res.status(400).json({ error: "Email already exists" });
        }

        return bcrypt.hash(req.body.Email, 10);
      })
      .then((hashedEmail) => {
        if (!hashedEmail) {
          return res.status(500).json({ error: "Error hashing email" });
        }

        return models.Doctor.create({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Speciality: req.body.Speciality,
          Phn_Number: req.body.Phn_Number,
          Email: hashedEmail,
          License_no: req.body.License_no,
          NPI_no: req.body.NPI_no,
        });
      })
      .then((doctor) => {
        return res
          .status(201)
          .json({ message: "Doctor record created", data: doctor });
      })
      .catch((error) => {
        console.error("Error creating doctor record:", error);

        return res.status(500).json({
          error: "An error occurred while creating the doctor record",
        });
      });
  } else {
    return res.status(403).json({ error: "Unauthorized Access" });
  }
};

exports.viewPatient = function (req, res) {
  models.Patient.findAll({
    attributes: ["Patient_ID", "FirstName", "DOB", "Gender"],
    include: [
      {
        model: models.Medical_Records,
        as: "medicalRecords",
        attributes: [
          "Diagnosis",
          "Treatment_Plan",
          "Prescription",
          "Doctor_Notes",
          "Date_of_Visit",
        ],
      },
    ],
  })
    .then((patient) => {
      return res.status(200).json({ data: patient });
    })
    .catch((error) => {
      console.error("Error fetching patients:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching patients" });
    });
};

exports.registerMedical = function (req, res) {
  console.log(req.body);

  if (req.body.role === "Doctor") {
    models.Medical_Records.create({
      Patient_ID: req.body.Patient_ID,
      Diagnosis: req.body.Diagnosis,
      Treatment_Plan: req.body.Treatment_Plan,
      Prescription: req.body.Prescription,
      Doctor_Notes: req.body.Doctor_Notes,
      Date_of_Visit: req.body.Date_of_Visit,
    })
      .then((medical_records) => {
        return res
          .status(201)
          .json({ message: "Patient record created", data: medical_records });
      })
      .catch((error) => {
        console.error("Error creating patient record:", error);
        return res.status(500).json({
          error: "An error occurred while creating the patient record",
        });
      });
  } else {
    return res.status(403).json({ error: "Unauthorized Access" });
  }
};

exports.appointmentRegister = function (req, res) {
  console.log(req.body);

  if (
    !req.body.Patient_ID ||
    !req.body.Doctor_Id ||
    !req.body.Appointment_Date ||
    !req.body.ReasonForVisit
  ) {
    return res.status(400).json({ error: "Please Fill all the fields" });
  }

  if (req.body.role === "Doctor") {
    models.Appointment.create({
      Patient_ID: req.body.Patient_ID,
      Doctor_Id: req.body.Doctor_Id,
      Appointment_Date: req.body.Appointment_Date,
      ReasonForVisit: req.body.ReasonForVisit,
    })
      .then((appointment) => {
        return res
          .status(201)
          .json({ message: "Appointment Created", data: appointment });
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        return res.status(500).json({
          error: "An error occurred while creating the appointment record",
        });
      });
  } else {
    return res.status(403).json({ error: "Unauthorized Access" });
  }
};

exports.patientDetails = function (req, res) {
  if (req.body.role == "Doctor") {
    models.Patient.findAll({
      attributes: ["FirstName", "LastName"],
      include: [
        {
          model: models.Medical_Records,
          as: "medicalRecords",
          attributes: [
            "Diagnosis",
            "Treatment_Plan",
            "Prescription",
            "Doctor_Notes",
            "Date_of_Visit",
          ],
        },
        {
          model: models.Appointment,
          as: "appointments",
          attributes: ["Appointment_Date", "ReasonForVisit"],
        },
      ],
    })
      .then((patient_view) => {
        return res.status(200).json({ data: patient_view });
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching patient records" });
      });
  } else {
    return res.status(403).json({ error: "Unauthorized Access" });
  }
};
