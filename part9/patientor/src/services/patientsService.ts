import patients from '../../data/patientsData';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const PatientById = (id: string): Patient | undefined => {
    return patients.find(entry => entry.id === id);
};

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
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

