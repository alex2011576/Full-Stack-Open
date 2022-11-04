import diagnosesData from '../../data/diagnosesData';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

export default getDiagnoses;