import express from 'express';
import { bmiParamCheck, calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    if (bmiParamCheck(height) && bmiParamCheck(weight)) {
        const bmi = calculateBmi(Number(height), Number(weight));
        res.json({ weight: Number(weight), height: Number(height), bmi: bmi })
    } else {
        res.status(400).json({ error: "malformatted parameters" });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});