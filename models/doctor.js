"use strict";

module.exports = (sequelize,DataTypes) =>{
    const Doctor = sequelize.define("Doctor",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        fullname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        specialty:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timeStamps:true,
    })
    Doctor.associate = (models)=>{
        Doctor.hasMany(models.Appointment)
    }

    return Doctor;
}