import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/add-questions');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Quiz Forms Generator
      </Typography>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          What is this app?
        </Typography>
        <Typography variant="body1">
          This app allows teachers to generate multiple versions of quizzes by shuffling questions and answers. Teachers can create question banks with different types of questions (MCQ, true-or-false, SAQ) and automatically generate and print quiz versions for students.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          How to use it?
        </Typography>
        <Typography variant="body1" paragraph>
          Start by adding questions to your question bank, specify the number of quiz versions, and preview the generated quizzes. Once you’re satisfied, use the print feature to print all versions at once.
        </Typography>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNextPage}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
