import patientsData from '../../data/patientsData.json';
import { NonSensitivePatientEntry, PatientEntry } from '../types';


// const patients: Array<PatientEntry> = patientsData;

// const nonSensitivePatients: Array<NonSensitivePatientEntry> = patients.map(({id, name, dateOfBirth, ssn, gender, occupation}) => ())

const getPatients = (): Array<PatientEntry> => {
    return patientsData;
};

const getNonSensitivePatients = (): Array<NonSensitivePatientEntry> => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};

