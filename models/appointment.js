"use strict";

module.exports = (sequelize,DataTypes)=>{
    const Appointment = sequelize.define("Appointment",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        reason:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cancelled:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        resolved:{
            type:DataTypes.ENUM,
            values:["pending","resolved"],
            defaultValue:"pending"
        }
    },{
        freezeTableName:true,
        timeStamps:true,
    })
    Appointment.associate = (models)=>{
        Appointment.belongsTo(models.Doctor);

        Appointment.belongsTo(models.Patient);
    }

    return Appointment;
}