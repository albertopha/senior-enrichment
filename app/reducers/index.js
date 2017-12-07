/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios';

//Initial State
const initialState = {
  students: [],
  campuses: [],
  newStudentEntry: '',
  newCampusEntry: '',
  selectedCampus: {},
  selectedStudent: {},    //DO I NEED THIS?!
  studentToDelete: {}
}

//Action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUSE = 'GET_CAMPUSE';
const WRITE_STUDENT = 'WRITE_STUDENT';
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SELECT_STUDENT = 'SELECT_STUDENT'; // DO I NEED THIS?!
const DELETE_STUDENT = 'DELETE_STUDENT';

//Action creators
export const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
}

export const getStudent = (student) => {
  return {
    type: GET_STUDENT,
    student
  }
}

export const writeStudent = (newStudentEntry) => {
  return {
    type: WRITE_STUDENT,
    newStudentEntry
  }
}

export const selectStudent = (selectedStudent) => {
  return {
    type: SELECT_STUDENT,
    selectedStudent
  }
}

export const deleteStudent = (studentToDelete) => {
  return {
    type: DELETE_STUDENT,
    studentToDelete
  }
}

export const getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
};

export const getCampus = (campus) => {
  return {
    type: GET_CAMPUSE,
    campus
  }
};

export const writeCampus = (newCampusEntry) => {
  return {
    type: WRITE_CAMPUS,
    newCampusEntry
  }
}

export const selectCampus = (selectedCampus) => {
  return {
    type: SELECT_CAMPUS,
    selectedCampus
  }
}



//Thunk Creator
export const fetchStudents = () => {
  return function thunk(dispatch){
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getStudents(students));
    });
  };
};

export const postStudents = (newStudent) => {
  return function thunk(dispatch){
    return axios.post('/api/students', newStudent)
    .then(res => res.data)
    .then(student => {
      dispatch(getStudent(student));
    });
  };
};

export const fetchStudent = (studentId, dispatch) => {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(studentToDelete => {
        console.log('student? ', studentToDelete);
        return dispatch(deleteStudent(studentToDelete));
      })
};

export const destroyStudent = (studentId) => {
  return function thunk(dispatch){
    fetchStudent(studentId, dispatch)
    .then(() => {
      axios.delete(`/api/students/${studentId}`)      
    })
  }
}


export const fetchCampuses = () => {
  return function thunk(dispatch){
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  };
};

export const fetchCampus = (campusId) => {
  return function thunk(dispatch){
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        dispatch(selectCampus(campus));
      })
  }
}

export const postCampus = (newCampus) => {
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
    case SELECT_CAMPUS:
      return { ...state, selectedCampus: action.selectedCampus};
    case SELECT_STUDENT:
      return { ...state, selectedStudent: action.selectedStudent};
    case DELETE_STUDENT:
      let studentsSoFar = [...state.students];
      studentsSoFar = studentsSoFar.filter(student => student.id !== action.studentToDelete.id);
      return { ...state, students: studentsSoFar};
    default: return state
  }
};

export default rootReducer
