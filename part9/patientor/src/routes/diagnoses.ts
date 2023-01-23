import express from 'express';
import getDiagnoses from '../services/diagnosesService';
const router = express.Router();

router.get('/', (_req, res) => {

    res.send(getDiagnoses());
});

// router.post('/', (_req, res) => {
//     res.send('Saving a diary!');
// });

export default router;

