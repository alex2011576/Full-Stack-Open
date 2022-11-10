import { Fields, NewPatientEntry, Gender, Entry, TypeOfEntry, EntryWithoutId, FieldsForEntry, HealthCheckRating, Diagnosis, SickLeave, Discharge } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return (Object.values(TypeOfEntry).includes(entry.type));
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (entries: any): entries is Entry[] => {

    for (let i = 0; i < entries.length; i++) {
        if (!isEntry(entries[i])) {
            return false;
        }
    }
    return true;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTypeOfEntry = (type: any): type is TypeOfEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return (Object.values(TypeOfEntry).includes(type));
};

const parseType = (type: unknown): TypeOfEntry => {
    if (!type || !isTypeOfEntry(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error(`Invalid or missing field descripton: ${description}`);
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Invalid or missing field specialist: ${specialist}`);
    }
    return specialist;
};

const parseEmployer = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Invalid or missing fild employer: ${employerName}`);
    }
    return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseAnyDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const start = sickLeave.startDate;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const end = sickLeave.endDate;
    if (!start || !end) {
        return false;
    }
    if (!parseAnyDate(start) || !parseAnyDate(end)) {
        return false;
    }
    return true;
};
const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if (!sickLeave) {
        return undefined;
    }
    if (!isSickLeave(sickLeave)) {
        throw new Error(`Invalid field sick leave: ${sickLeave}`);
    }
    return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(rating);
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Invalid or missing health rating:' + healthCheckRating);
    }
    return healthCheckRating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCodes = (codes: any): codes is Array<Diagnosis['code']> => {

    for (let i = 0; i < codes.length; i++) {
        if (!isString(codes[i])) {
            return false;
        }
    }
    return true;
};
const parseCodes = (codes: unknown): Array<Diagnosis['code']> | undefined => {
    if (!codes) {
        return undefined;
    } else if (!isCodes(codes)) {
        throw new Error('Invalid codes:' + codes);
    }
    return codes;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (codes: any): codes is Discharge => {

    for (let i = 0; i < codes.length; i++) {
        if (!isString(codes[i])) {
            return false;
        }
    }
    if (!parseAnyDate(codes["date"])) {
        throw new Error(`Invalid formatting fields discharge.date: ${codes["date"]}`);
    }
    return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge) {
        throw new Error(`Missing fields discharge: ${discharge}`);
    } else if (!isDischarge(discharge)) {
        throw new Error(`Invalid formatting fields discharge: ${discharge}`);
    }
    return { criteria: discharge.criteria, date: discharge.date };
};



const parseHealthCheckEntry = ({
    description,
    date,
    specialist,
    diagnosisCodes,
    healthCheckRating
}: FieldsForEntry): EntryWithoutId => {

    const newEntry: EntryWithoutId = {
        type: "HealthCheck",
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)

    };
    return newEntry;
};

const parseOccupationalHealthcareEntry = ({
    description,
    date,
    specialist,
    diagnosisCodes,
    employerName,
    sickLeave
}: FieldsForEntry): EntryWithoutId => {

    const newEntry: EntryWithoutId = {
        type: "OccupationalHealthcare",
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseCodes(diagnosisCodes),
        employerName: parseEmployer(employerName),
        sickLeave: parseSickLeave(sickLeave)

    };
    return newEntry;
};

const parseHospitalEntry = ({
    description,
    date,
    specialist,
    diagnosisCodes,
    discharge
}: FieldsForEntry): EntryWithoutId => {

    const newEntry: EntryWithoutId = {
        type: "Hospital",
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseCodes(diagnosisCodes),
        discharge: parseDischarge(discharge)

    };
    return newEntry;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewEntry = ({
    description,
    date,
    specialist,
    type,
    diagnosisCodes,
    discharge,
    employerName,
    sickLeave,
    healthCheckRating }: FieldsForEntry): EntryWithoutId => {

    const confirmedType = parseType(type);
    switch (confirmedType) {
        case (TypeOfEntry.HealthCheckEntry):
            return parseHealthCheckEntry({
                type,
                description,
                date,
                specialist,
                diagnosisCodes,
                healthCheckRating
            });
        case (TypeOfEntry.OccupationalHealthcareEntry):
            return parseOccupationalHealthcareEntry({
                type,
                description,
                date,
                specialist,
                diagnosisCodes,
                employerName,
                sickLeave
            });
        case (TypeOfEntry.HospitalEntry):
            return parseHospitalEntry({
                type,
                description,
                date,
                specialist,
                diagnosisCodes,
                discharge
            });
        default:
            return assertNever(confirmedType);

    }
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