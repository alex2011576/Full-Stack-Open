// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

// export interface PatientEntry {
//     id: string,
//     name: string,
//     dateOfBirth: string,
//     ssn: string,
//     gender: Gender,
//     occupation: string
// }

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

// export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}