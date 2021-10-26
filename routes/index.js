const {login,signup,loginDoctor,signupDoc,logout,bookAppointment,getDoctors,getAllDoctorAppointments,getAllPatientAppointments,} = require("../controllers");
const {Router} = require("express");

const router = Router();

router.post("/auth/login/user",login);
router.get("/auth/login/user",(_,res,__)=>{
    res.render("login");
})
router.post("/auth/signup/user",signup);
router.get("/auth/signup/user",(_,res,__)=>{
    res.render("signup");
})
router.post("/auth/login/doctor",loginDoctor);
router.post("/auth/signup/doctor",signupDoc);
router.get("/auth/logout",logout);
router.get("/users/doctors",getDoctors);
router.get("/user/doctor/appointments",getAllDoctorAppointments);
router.get("/user/patient/appointments",getAllPatientAppointments);
router.post("/appointment/doctor/:doctorId",bookAppointment)


module.exports = router;