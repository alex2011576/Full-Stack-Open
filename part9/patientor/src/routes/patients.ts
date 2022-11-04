import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patients!');

    res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.PatientById(String(req.params.id));
    console.log('Fetching patients!');
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});



router.post('/', (req, res) => {
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;


