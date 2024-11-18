import { Box, Divider, Typography } from '@mui/material';
import { Question } from '../../types/questions';

const LABELS = {
  MCQ: 'Multiple Choice',
  TF: 'True or False',
  SAQ: 'Short Answer'
};

export default function DisplayQuestions({ questions }: { questions: Question[] }) {
  const mcqQuestions = questions.filter((q) => q.type === 'MCQ');
  const tfQuestions = questions.filter((q) => q.type === 'TF');
  const saqQuestions = questions.filter((q) => q.type === 'SAQ');
  return (
    <>
      {/* Display MCQ Questions */}
      {mcqQuestions.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            First: {LABELS.MCQ}
          </Typography>

          <Typography variant="subtitle2" color='text.secondary' gutterBottom>
            Read the following questions and circle the choice that best answers the question. Only <b>one</b> answer is correct.
          </Typography>

          <Box sx={{ padding: 2 }}>

            {mcqQuestions.map((question, i) => (
              <Box key={question.id} sx={{ marginBottom: 3 }}>
                <Typography variant="body1">
                  {i + 1}. {question.text}
                </Typography>
                <Box sx={{ marginBottom: 1 }}>
                  <ol type='a'>
                    {question.choices.map((choice) => (
                      <li key={choice.id}>{choice.text}</li>
                    ))}
                  </ol>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Divider sx={{ my: 1 }} />


      {/* Display True/False Questions */}
      {tfQuestions.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Second: {LABELS.TF}
          </Typography>
          <Box sx={{ padding: 2 }}>
            {tfQuestions.map((question, i) => (
              <Box key={question.id} sx={{ marginBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1" maxWidth={'90%'}>
                  {i + 1}. {question.text}
                </Typography>
                <Box sx={{ width: 35, height: 19, border: '1px solid black' }}>

                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}


      <Divider sx={{ my: 1 }} />

      {/* Display Short Answer Questions */}
      {saqQuestions.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Third: {LABELS.SAQ}
          </Typography>
          <Box sx={{ padding: 2 }}>
            {saqQuestions.map((question, i) => (
              <Box key={question.id} sx={{ marginBottom: 3 }}>
                <Typography variant="body1">
                  {i + 1}. {question.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  )
}