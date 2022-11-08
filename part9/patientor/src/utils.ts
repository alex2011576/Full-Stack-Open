import { Fields, NewPatientEntry, Gender, Entry, TypeOfEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTypeOfEntry = (entry: any): entry is Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return (Object.values(TypeOfEntry).includes(entry.type));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (entries: any): entries is Entry[] => {

    for (let i = 0; i < entries.length; i++) {
        if (!isTypeOfEntry(entries[i])) {
            return false;
        }
    }
    return true;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};


export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    let newPatient: NewPatientEntry;
    //this is not necessary because TypeScript will automatically check types of entries in local DataFile, 
    // but I tried to improve it anyways to understand TypeScript safeguarding better and for external Patients Data
    if (entries) {
        newPatient = {
            name: parseName(name),
            dateOfBirth: parseDate(dateOfBirth),
            ssn: parseSsn(ssn),
            gender: parseGender(gender),
            occupation: parseOccupation(occupation),
            entries: parseEntries(entries)
        };
    } else {
        newPatient = {
            name: parseName(name),
            dateOfBirth: parseDate(dateOfBirth),
            ssn: parseSsn(ssn),
            gender: parseGender(gender),
            occupation: parseOccupation(occupation),
            entries: []
        };
    }
    return newPatient;
};