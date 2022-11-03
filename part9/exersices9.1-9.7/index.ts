/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi, bmiParamCheck } from './modules/bmiCalculator';
import { calculateExercises } from './modules/exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    if (bmiParamCheck(height) && bmiParamCheck(weight)) {
        const bmi = calculateBmi(Number(height), Number(weight));
        res.json({ weight: Number(weight), height: Number(height), bmi: bmi });
    } else {
        res.status(400).json({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const daily_exercises: Array<any> = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const target: any = req.body.target;

    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }
    if (isNaN(Number(target)) || Number(target) < 0 || !daily_exercises.length || daily_exercises.find(nan => isNaN(Number(nan)))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    return res.json(calculateExercises(daily_exercises.map(n => Number(n)), Number(target)));

});
const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});