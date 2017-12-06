'use strict';

const db = require('../index');
const Sequelize = db.Sequelize;

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: true,
        notEmpty: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: true,
        isEmail: true
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: { min: 0.0, max: 4.0 }
    },
    name: {
        type: Sequelize.VIRTUAL,
        get () {
           return this.getDataValue('firstName') + this.getDataValue('lastName'); 
        }
    },
    
});

module.exports = Student;