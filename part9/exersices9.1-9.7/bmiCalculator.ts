interface BmiParameters {
    height: number,
    weight: number
}

const parseBmiArguments = (args: Array<string>): BmiParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (!isNaN(height) && !isNaN(weight)) {
        if (height <= 0 || weight <= 0) throw new Error('Height and weight can\'t be 0 or negative');
        return {
            height: height,
            weight: weight
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

const calculateBmi = (height: number, weight: number): string => {

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

try {
    console.log(process.argv);
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}