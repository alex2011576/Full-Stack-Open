// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bmiParamCheck = (param: any): boolean => {
    if (param) {
        if (typeof param === 'string') {
            if (!isNaN(Number(param)) && Number(param) > 0) {
                return true;
            }
        }
    }
    return false;
};

export const calculateBmi = (height: number, weight: number): string => {

    const bmi = weight / height / height * 10000;

    if (bmi < 16)
        return ('Underweight (Severe thinness)');
    else if (bmi < 17)
        return ('Underweight (Moderate thinness)');
    else if (bmi < 18.5)
        return ('Underweight (Mild thinness)');
    else if (bmi < 25)
        return ('Normal (healthy weight)');
    else if (bmi < 30)
        return ('Overweight (Pre-obese)');
    else if (bmi < 35)
        return ('Obese (Class I)');
    else if (bmi < 40)
        return ('Obese (Class II)');
    else if (bmi >= 40)
        return ('Obese (Class III)');
    else
        return ('Some error occured');
};