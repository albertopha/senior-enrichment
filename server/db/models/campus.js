'use strict';
const Student = require('./student');

const images = [
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
    'https://static.pexels.com/photos/2422/sky-earth-galaxy-universe.jpg',
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
},{
    defaultScope: {
        include: [Student]
    }
});

module.exports = Campus;

