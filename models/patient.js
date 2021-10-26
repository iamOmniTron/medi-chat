"use strict";

module.exports = (sequelize,DataTypes) =>{
    const Patient = sequelize.define("Patient",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        }, 
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },{
        freezeTableName:true,
        timeStamps:true,
    })
    Patient.associate = (models)=>{
        Patient.hasMany(models.Appointment);
    }

    return Patient;
}