export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}