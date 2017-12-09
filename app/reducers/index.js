/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios';

//Initial State
const initialState = {
  students: [],
  campuses: [],
  selectedCampus: {},
  selectedStudent: {},
  studentToDelete: {},
  campusToDelete: {}
}

//Action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUSE = 'GET_CAMPUSE';
// const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SELECT_STUDENT = 'SELECT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

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

// export const updateStudent = (updateStudentEntry) => {
//   return {
//     type: UPDATE_STUDENT,
//     updateStudentEntry
//   }
// }

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

export const updateCampus = (updateCampusEntry) => {
  return {
    type: UPDATE_CAMPUS,
    updateCampusEntry
  }
}

export const selectCampus = (selectedCampus) => {
  return {
    type: SELECT_CAMPUS,
    selectedCampus
  }
}

export const deleteCampus = (campusToDelete) => {
  return {
    type: DELETE_CAMPUS,
    campusToDelete
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

export const fetchStudent = (studentId) => {
  return function thunk(dispatch){
    return axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(selectedStudent => {
      dispatch(selectStudent(selectedStudent));
    });
  };
};

//helper function for destroyStudent to find specific student
const fetchStudentTodelete = (studentId, dispatch) => {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(studentToDelete => {
        return dispatch(deleteStudent(studentToDelete));
      })
};

export const destroyStudent = (studentId) => {
  return function thunk(dispatch){
    fetchStudentTodelete(studentId, dispatch)
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

//helper function for fetching campus to delete
const fetchCampusToDelete = (campusId, dispatch) => {
  return axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then(campusToDelete => {
      return dispatch(deleteCampus(campusToDelete));
    })
};

export const destroyCampus = (campusId) => {
  return function thunk(dispatch){
    fetchCampusToDelete(campusId, dispatch)
    .then(() => {
      axios.delete(`/api/campuses/${campusId}`)      
    })
  }
}


export const putCampus = (campusId, updateCampusEntry) => {
  return function thunk(dispatch){
    return axios.put(`/api/campuses/${campusId}`, updateCampusEntry)
      .then(res => {
        return res.data})
      .then(updateCampusEntry => {
        dispatch(updateCampus(updateCampusEntry));
      })
      .catch(console.error);
  };
};

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return { ...state, students: action.students };
    case GET_STUDENT:
      return { ...state, students: [...state.students, action.student]};
    // case UPDATE_STUDENT:
    //   return { ...state, newStudentEntry: action.newStudentEntry};
    case GET_CAMPUSES:
      return { ...state, campuses: action.campuses};
    case GET_CAMPUSE:
      return { ...state, campuses: [...state.campuses, action.campus]};
    case UPDATE_CAMPUS:
      const campusToUpdate = action.updateCampusEntry;
      let newCampuses = state.campuses.map(camp => {
        if(campusToUpdate.id === camp.id) return campusToUpdate;
        else return camp;
      });
      return { ...state, campuses: newCampuses};
    case SELECT_CAMPUS:
      return { ...state, selectedCampus: action.selectedCampus};
    case SELECT_STUDENT:
      return { ...state, selectedStudent: action.selectedStudent};
    case DELETE_STUDENT:
      let studentsSoFar = [...state.students];
      studentsSoFar = studentsSoFar.filter(student => student.id !== action.studentToDelete.id);
      return { ...state, students: studentsSoFar};
    case DELETE_CAMPUS:
      let campusSoFar = [...state.campuses];
      campusSoFar = campusSoFar.filter(campus => campus.id !== action.campusToDelete.id);
      return { ...state, campuses: campusSoFar};
    default: return state
  }
};

export default rootReducer
