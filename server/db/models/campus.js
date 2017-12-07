'use strict';

const images = [
    'http://med-fom-prep.sites.olt.ubc.ca/files/2013/07/UBC-logo1.jpg',
    'http://www.utoledo.edu/offices/marketing/toolkit/images/UT-logo-horizontal-color-gold-rgb-300.jpg',
    'http://www.drury.edu/uc/logo/DruryVerticalCrest1.jpg',
    'https://www.miamioh.edu/_files/images/ucm/resources/logo/FSL_186K.jpg',
  ];

let count = -1;
const getImages = () => images[count];

const db = require('../index');
const Sequelize = db.Sequelize;

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        notEmpty: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue () {
            count++;
            return getImages();
        }
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = Campus;
