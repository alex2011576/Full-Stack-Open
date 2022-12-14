import { State } from './state';
import { Diagnosis, FetchedPatient, Patient } from '../types';

export type Action =
  | {
    type: 'SET_PATIENT_LIST';
    payload: Patient[];
  }
  | {
    type: 'SET_DIAGNOSES_LIST';
    payload: Diagnosis[];
  }
  | {
    type: 'ADD_PATIENT';
    payload: Patient;
  }
  | {
    type: 'ADD_FETCHED_PATIENT';
    payload: FetchedPatient;
  };

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: payload
  };
};
export const setDiagnosesList = (payload: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: payload
  };
};
export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: payload
  };
};
export const addFetchedPatient = (payload: FetchedPatient): Action => {
  return {
    type: 'ADD_FETCHED_PATIENT',
    payload: payload
  };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'SET_PATIENT_LIST':
    return {
      ...state,
      patients: {
        ...action.payload.reduce(
          (memo, patient) => ({ ...memo, [patient.id]: patient }),
          {}
        ),
        ...state.patients
      }
    };
  case 'SET_DIAGNOSES_LIST':
    return {
      ...state,
      diagnoses: {
        ...action.payload.reduce(
          (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
          {}
        ),
        ...state.diagnoses
      }
    };
  case 'ADD_PATIENT':
    return {
      ...state,
      patients: {
        ...state.patients,
        [action.payload.id]: action.payload
      }
    };
  case 'ADD_FETCHED_PATIENT':
    // console.log("ADD_F_PATIENT");
    return {
      ...state,
      fetchedPatients: {
        ...state.fetchedPatients,
        [action.payload.id]: action.payload
      }
    };

  default:
    return state;
  }
};
