type Rating = 1 | 2 | 3;

interface Return {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating;
    ratingDescription: string
    target: number,
    average: number,
}
//bugs if array is empty, but cant return error as args should be checked outside
const calculateExercises = (args: Array<number>, target: number): Return => {

    const periodLength: number = args.length;
    const trainingDays: number = args.filter(hours => hours > 0).length;
    const average: number = args.reduce((a, b) => (a + b), 0) / periodLength;
    const success = average > target ?? false;
    let rating: Rating;
    let ratingDescription = '';

    if (average <= target * 0.5) {
        rating = 1;
        ratingDescription = 'not even half the target'
    }
    else if (average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better!'
    }
    else {
        rating = 3;
        ratingDescription = 'Target is achieved!'
    }

    return {
        periodLength,
        trainingDays,
        success,
        average,
        rating,
        target,
        ratingDescription
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
