const {hash,compare} = require("bcrypt");
const {Patient,Doctor,Appointment} = require("../models");
module.exports = {
    login: async(req,res,next)=>{
        try {
            const {email,password} = req.body;
            if(!email){
                throw new Error("email is required");
            }

            if(!password){
                throw new Error("pasword is required");
            }
            const patient = await Patient.findOne({where:{email}});
            if(!Patient){
                throw new Error("Patient doesnt exist");
            }
            const isPasswordMatched = await compare(password,patient.password);
            if(!isPasswordMatched){
                throw new Error("invalid email/password")
            }
            req.session.user = {
                id:Patient.id,
                username:Patient.fullname,
            }
            res.json(patient);
        } catch (error) {
            next(error);
        }
    },
    signup: async(req,res,next)=>{
        try {
            const {username,email,password} = req.body;
            if(!username){
                throw new Error("field username is required");
            }
            if(!email){
                throw new Error("field email is required");
            }
            if(!password){
                throw new Error("field password is required");
            }
            const hashedPassword = await hash(password,10);
            const newUser = await Patient.create({
                username,email,
                password:hashedPassword,
            })
            req.session.user = {
                id:newUser.id,
                username:newUser.fullname,
            }
            res.json({
                message:"sign up successful"
            })
        } catch (error) {
            next(error)
        }
    },
    signupDoc: async(req,res,next)=>{
        try {
            const {fullname,specialty,email,password} = req.body;
            if(!fullname){
                throw new Error("field name is required");
            }
            if(!email){
                throw new Error("field email is required");
            }
            if(!specialty){
                throw new Error("field specialty is required");
            }
            if(!password){
                throw new Error("field password is required");
            }
            let doctor = await Doctor.findOne({where:{email}});

            if(doctor){
                throw new Error(" cannot signup this doctor");
            }
            const hashedPassword = await hash(password,10);
            doctor = await Doctor.create({
                fullname,email,
                specialty,
                password:hashedPassword,
            })
            req.session.user = {
                id:doctor.id,
                username:doctor.fullname,
            }
            res.json({
                message:"sign up successful"
            })
        } catch (error) {
            next(error)
        }
    },
    loginDoctor: async(req,res,next)=>{
        try {
            const {email, password} = req.body;
            if(!email){
                throw new Error("email is required");
            }
            if(!password){
                throw new Error("password is required");
            }
            const doctor = await Doctor.findOne({where:{email}});
            if(!doctor || doctor == undefined){
                throw new Error("invalid Patient");
            }
            const isPasswordMatched = await compare(password,doctor.password);
            if(!isPasswordMatched){
                throw new Error("invalid email/password");
            }
            req.session.user = {
                id:doctor.id,
                username:doctor.fullname,
            }
            res.json(doctor);
        } catch (error) {
            next(error)
        }
    },
    logout: async(req,res,next)=>{
        try {
            await req.session.destroy();
            res.json({
                message:"Patient logged out successfully"
            })
        } catch (error) {
            next(error)
        }
    },
    bookAppointment: async (req,res,next)=>{
        try {
            const {doctorId} = req.params;
            const {reason} = req.body;
            const {id} = req.session.user;
            if(!doctorId){                throw new Error("doctor is required")
            }
            if(!reason){
                throw new Error("a reason for appointment is required");
            }
            if(!id){
                throw new Error(" Patient unathuneticated");
            }
            const appointment = await Appointment.create({
                reason,
                DoctorId:doctorId,PatientId:id
            });
            if(!appointment){
                throw new Error("appointment cannot be made at the moment");
            }
            res.json({
                message:"appointment booked successfully"
            });
        } catch (error) {
            next(error)
        }
    },
    getDoctors: async(req,res,next)=>{
        try {
            const doctors = await Doctor.findAll();
            res.json(doctors);
        } catch (error) {
            next(error);
        }
    },
    getAllDoctorAppointments: async (req,res,next)=>{
        try {
            const doctorId = req.session.user.id;
            const appointments = await Appointment.findAll({where:{DoctorId:doctorId},include:[Doctor,Patient]});
            res.json(appointments);
        } catch (error) {
            next(error)
        }
    },
    getAllPatientAppointments: async(req,res,next)=>{
        try {
            const patientId = req.session.user.id;
            const appointments = await Appointment.findAll({where:{PatientId:patientId},include:[Doctor,Patient]});
            res.json(appointments);
        } catch (error) {
            next(error)
        }
    }

}