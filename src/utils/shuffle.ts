import { MCQ, Question } from '../types/questions';

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {

    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]]
  }

  return shuffledArray;
}

function shuffleMCQs(questions: (Question & MCQ)[]): (Question & MCQ)[] {

  const shuffledOrder = shuffle(questions);

  const shuffledChoices = shuffledOrder.map((question) => ({
    ...question,
    choices: shuffle(question.choices)
  }));

  return shuffledChoices;
}


export default function shuffleQuestions(questions: Question[]): Question[] {
  const mcqQuestions = questions.filter((q) => q.type === 'MCQ');
  const tfQuestions = questions.filter((q) => q.type === 'TF');
  const saqQuestions = questions.filter((q) => q.type === 'SAQ');

  const shuffledMCQs = shuffleMCQs(mcqQuestions);
  const shuffledTFs = shuffle(tfQuestions);
  const shuffledSAQs = shuffle(saqQuestions);

  return [...shuffledMCQs, ...shuffledTFs, ...shuffledSAQs];
}