import patients from '../../data/patientsData';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const PatientById = (id: string): PatientEntry | undefined => {
    return patients.find(entry => entry.id === id);
};

const getPatients = (): Array<PatientEntry> => {
    return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = String(uuid());
    const NewPatientEntry = {
        id: id,
        ...patient
    };

    patients.push(NewPatientEntry);
    return NewPatientEntry;
};

export default {
    getPatients,
    getNonSensitivePatients,
    PatientById,
    addPatient
};

