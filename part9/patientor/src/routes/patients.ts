import express from 'express';


const router = express.Router();

router.get('/', (_req, res) => {
    console.log('fdsfasf');

    res.send('Fetching patients!');
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;


