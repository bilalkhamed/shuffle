import { Box, Typography, Button, Divider } from '@mui/material';
import { Question } from '../../types/questions';
import { Link, useLocation } from 'react-router-dom';
import DisplayQuestions from './DisplayQuestions';
import shuffleQuestions from '../../utils/shuffle';

export default function Preview() {
  const { state } = useLocation();
  const questions: Question[] | undefined = state?.questions;
  const numberOfForms: number = state?.numberOfForms || 1;
  if (!questions) {
    return <Typography variant="body1">No questions added yet. <Link to="/add-questions">Add from here</Link></Typography>;
  }

  const handlePrint = (): void => {
    window.print();
  }

  return (
    <Box sx={{ marginTop: 4 }}>

      {/* Buttons */}
      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
          <Link to="/add-questions" state={{ questions }}>Back</Link>
        </Button>
      </Box>

      {/* Display MCQ Questions */}
      {[...Array(numberOfForms)].map((_, index) => (
        <div className='quiz'>
          <Typography variant="h3" color='text.primary' align='center' mb={2}>
            SA History Quiz
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>

            <Typography variant="h5" color='text.primary' >
              Name: _______________
            </Typography>
            <Typography variant="h5" color='text.primary' >
              Form #{index + 1}
            </Typography>
            <Typography variant="h5" color='text.primary' >
              Date: {new Date().toLocaleDateString()}
            </Typography>
          </Box>

          <DisplayQuestions questions={shuffleQuestions(questions)} key={index} />
          <Divider sx={{ borderWidth: 2 }} className='quiz-divider' />
        </div>
      ))}

    </Box>
  );
}
