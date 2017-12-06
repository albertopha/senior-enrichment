const { db, Student, Campus } = require('./server/db/models')

const students = [
    {firstName: 'Albert', lastName: 'Oh', email: 'albertopha@hotmail.com', gpa: 4.0},
    {firstName: 'Steve', lastName: 'Chaing', email: 'stevechaing@hotmail.com', gpa: 2.0},
    {firstName: 'Andy', lastName: 'Yoon', email: 'andyyoon@hotmail.com', gpa: 3.5},
    {firstName: 'Sepand', lastName: 'Molaj', email: 'smolaj@hotmail.com', gpa: 3.8},
    {firstName: 'Ha-Ram', lastName: 'Jung', email: 'haramopha@hotmail.com', gpa: 3.7},
    {firstName: 'Ji-Hyo', lastName: 'Lee', email: 'jihyoopha@hotmail.com', gpa: 3.95},
    {firstName: 'Eric', lastName: 'Lee', email: 'ericlee@hotmail.com', gpa: 3.1},
    {firstName: 'William', lastName: 'Yoon', email: 'williamyoon@hotmail.com', gpa: 2.2},
    {firstName: 'Bin', lastName: 'Lim', email: 'bin@hotmail.com', gpa: 2.75},
    {firstName: 'Sarah', lastName: 'Choi', email: 'sranchoi@hotmail.com', gpa: 2.8}
]

const campuses = [
    {name: 'UBC', description: "University of British Columbia"},
    {name: 'TOLEDO', description: "University of Toledo"},
    {name: 'Drury', description: "University of Drury"},
    {name: 'MIAMI', description: "University of Miami"}
  ];

const seed = () =>
Promise.all(campuses.map(campus =>
  Campus.create(campus))
)
.then(() =>
Promise.all(students.map(student =>
  Student.create({...student, campusId: Math.floor((Math.random() * 4) + 1)}))
));

const main = () => {
console.log('Syncing db...');
db.sync({ force: true })
  .then(() => {
    console.log('Seeding databse...');
    return seed();
  })
  .catch(err => {
    console.log('Error while seeding');
    console.log(err.stack);
  })
  .then(() => {
    db.close();
    return null;
  });
};

main();