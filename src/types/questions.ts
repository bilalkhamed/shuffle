export interface MCQ {
  type: 'MCQ';
  choices: Choice[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

interface TrueOrFalse {
  type: 'TF';
  correctAnswer: 'true' | 'false';
}

interface SAQ {
  type: 'SAQ'
}

interface Empty {
  type: ''
}

interface Choice {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
}


export type Question = (MCQ | TrueOrFalse | SAQ | Empty) & {
  id: number;
  text: string;
}