// import patients from '../../data/patientsData';
import raw_patients from '../../data/patientData2';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';

//for additional validation (maybe better be placed in the data file)
const patients: Patient[] = raw_patients.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

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

