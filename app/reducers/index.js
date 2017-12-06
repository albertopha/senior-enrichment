/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios';

//Initial State
const initialState = {
  students: [],
  campuses: [],
  newStudentEntry: '',
  newCampusEntry: ''
}

//Action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUSE = 'GET_CAMPUSE';
const WRITE_STUDENT = 'WRITE_STUDENT';
const WRITE_CAMPUS = 'WRITE_CAMPUS';

//Action creators
const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
}

const getStudent = (student) => {
  return {
    type: GET_STUDENT,
    student
  }
}

const writeStudent = (newStudentEntry) => {
  return {
    type: WRITE_STUDENT,
    newStudentEntry
  }
}

const getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
};

const getCampus = (campus) => {
  return {
    type: GET_CAMPUSE,
    campus
  }
};

const writeCampus = (newCampusEntry) => {
  return {
    type: WRITE_CAMPUS,
    newCampusEntry
  }
}

//Thunk Creator
const fetchStudents = () => {
  return function thunk(dispatch){
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getStudents(students));
    });
  };
};

const postStudents = (newStudent) => {
  return function thunk(dispatch){
    return axios.post('/api/students', newStudent)
    .then(res => res.data)
    .then(student => {
      dispatch(getStudent(student));
    });
  };
};

const fetchCampuses = () => {
  return function thunk(dispatch){
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  };
};

const postCampus = (newCampus) => {
  return function thunk(dispatch){
    return axios.post('/api/campuses', newCampus)
      .then(res => res.data)
      .then(campus => {
        dispatch(getCampus(campus));
      });
  };
};

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return { ...state, students: action.students };
    case GET_STUDENT:
      return { ...state, students: [...state.students, action.newStudentEntry]};
    case WRITE_STUDENT:
      return { ...state, newStudentEntry: action.newStudentEntry};
    case GET_CAMPUSES:
      return { ...state, campuses: action.campuses};
    case GET_CAMPUSE:
      return { ...state, campuses: [...state.campuses, action.campus]};
    case WRITE_CAMPUS:
      return { ...state, newCampusEntry: action.newCampusEntry};
    default: return state
  }
};

export default rootReducer
