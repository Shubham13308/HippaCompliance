exports.patienfieldValidator = (data) => {
  if (
    !data.FirstName ||
    !data.LastName ||
    !data.DOB ||
    !data.Gender ||
    !data.Address ||
    !data.City ||
    !data.State ||
    !data.Zipcode ||
    !data.Phn_number ||
    !data.Email ||
    !data.Insurance_provider ||
    !data.IncPolicyNumber ||
    !data.EmergencyContactName ||
    !data.EmergencyContactNumber
  ) {
    return "Please fill all the fields";
  }

  const dob = new Date(data.DOB);
  if (isNaN(dob.getTime())) {
    return "Invalid Date of Birth";
  }

  if (!/^\d+$/.test(data.Zipcode)) {
    return "Zipcode must be a valid integer";
  }

  if (!/^\d{10}$/.test(data.Phn_number)) {
    return "Phone number must be a valid 10-digit number";
  }

  if (!/\S+@\S+\.\S+/.test(data.Email)) {
    return "Email must contain a valid '@' format";
  }

  if (!data.Insurance_provider.trim()) {
    return "Insurance provider must be provided";
  }

  return null;
};

exports.userValidator = (data) => {
  if (!Username || !Password || !Role) {
    return "Please fill all the fields";
  }
  if (!/[A-Z]/.test(data.Username) || !/_/.test(data.Username)) {
    return "Username must contain at least one capital letter and an underscore (_)";
  }
  if (
    data.Password.length > 6 ||
    !/[A-Z]/.test(data.Password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(data.Password)
  ) {
    return "Password must be at least 6 characters long, with one capital letter and one special character";
  }
  const validRoles = ["Admin", "Doctor", "Receptionist"];
  if (!validRoles.includes(data.Role)) {
    return "Role must be either 'Admin', 'Doctor', or 'Receptionist'";
  }
  return null;
};

exports.doctorValidator = (data)=> {
  if (
    !data.FirstName ||
    !data.LastName ||
    !data.Speciality ||
    !data.Phn_Number ||
    !data.Email ||
    !data.License_no ||
    !data.NPI_no ||
    !data.role
  ) {
    return "Please fill all the fields";
  }
  if(!/^\d{10}$/.test(data.Phn_Number)){
    return "Phone number must be a valid 10-digit number";
  }
  if (!/\S+@\S+\.\S+/.test(data.Email)) {
    return "Email must contain a valid '@' format";
  }
  return null;
};
exports.registermedicalValidator=(data)=>{
    if(!data.Patient_ID || !data.Diagnosis || ! data.Treatment_Plan || ! data. Prescription || ! data. Doctor_Notes || ! data. Date_of_Visit ){
        return "Email must contain a valid '@' format";
    }
    const dob=new Date(data.Date_of_Visit);
    if(isNaN(dob.getDate())){
        return "Date of visit must be a valid date";
    }
    return null;
}


