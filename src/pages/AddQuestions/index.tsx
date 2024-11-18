/* FIX True or False Questions Line 143 */

import { Container, FormControl, InputLabel, MenuItem, Select, Typography, SelectChangeEvent, TextField, Box, List, ListItem, Button, IconButton, Tooltip, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useState } from 'react';
import { Question } from '../../types/questions';
import { Add, Check } from '@mui/icons-material';
import QuestionsList from './QuestionsList';
import { Link, useLocation } from 'react-router-dom';

export default function AddQuestions() {
  const { state } = useLocation();
  const questionsFromState: Question[] | undefined = state?.questions;

  const [questions, setQuestions] = useState<Question[]>(questionsFromState || []);
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: Date.now(),
    type: '',
    text: ''
  });
  const [numberOfForms, setNumberOfForms] = useState<number | ''>('');


  const handleTypeChange = (e: SelectChangeEvent<"MCQ" | "TF" | "SAQ">) => {
    const newType = e.target.value;
    setNewQuestion((prev) => {
      if (newType === prev.type) return prev;
      if (newType === 'MCQ') {
        return {
          ...prev,
          type: 'MCQ',
          choices: [{ id: 'a', text: '' }, { id: 'b', text: '' }, { id: 'c', text: '' }, { id: 'd', text: '' }],
          correctAnswer: 'a'
        }
      }
      if (newType === 'TF') {
        return {
          ...prev,
          type: 'TF',
          correctAnswer: 'true'
        }
      }
      return {
        ...prev,
        type: 'SAQ'
      }
    });

  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewQuestion((prev) => ({ ...prev, text: e.target.value }))
  }

  const handleChoiceChange = (choiceId: 'a' | 'b' | 'c' | 'd', choiceText: string) => {
    setNewQuestion((prev) => {
      if (prev.type !== 'MCQ') return prev;
      const newChoices = prev.choices.map((choice) => {
        if (choice.id === choiceId) {
          return {
            ...choice,
            text: choiceText
          }
        }
        return choice;
      });
      return {
        ...prev,
        choices: newChoices
      }
    })
  }

  const handleChangeMCQAnswer = (choiceId: 'a' | 'b' | 'c' | 'd') => {
    setNewQuestion((prev) => {
      if (prev.type !== 'MCQ') return prev;
      return {
        ...prev,
        correctAnswer: choiceId
      }
    })
  }

  const handleChangeTFAnswer = (answer: 'true' | 'false') => {
    setNewQuestion((prev) => {
      if (prev.type !== 'TF') return prev;
      return {
        ...prev,
        correctAnswer: answer
      }
    })
  }

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, newQuestion]);
    setNewQuestion({
      id: Date.now(),
      type: '',
      text: ''
    });
  }


  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = parseInt(value);

    if (!isNaN(numberValue)) {
      setNumberOfForms(numberValue);
    } else if (value === '') {
      setNumberOfForms('');
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant='h3' gutterBottom sx={{ textAlign: 'center' }}>
        Build your test
      </Typography>

      <Typography variant='h6' gutterBottom>
        Add a question
      </Typography>

      <FormControl fullWidth color='primary' sx={{ mb: 2 }}>
        <InputLabel>Question Type</InputLabel>
        <Select value={newQuestion.type} onChange={handleTypeChange} label="Question Type">
          <MenuItem value="MCQ">MCQ</MenuItem>
          <MenuItem value="SAQ">SAQ</MenuItem>
          <MenuItem value="TF">True or False</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth color='primary' sx={{ mb: 2 }}>
        <TextField
          label="Question's Text"
          onChange={handleTextChange}
          value={newQuestion.text}
          multiline
        />
      </FormControl>

      {newQuestion.type === 'MCQ' && (
        <Box>
          <Typography variant="subtitle1">Answer Choices</Typography>
          <List>
            {newQuestion.choices.map((choice) => (
              <ListItem key={choice.id}>
                <TextField
                  fullWidth
                  label={`Choice ${choice.id.toUpperCase()}`}
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
                  sx={{ marginRight: 1 }}
                />
                <Tooltip title="Mark as correct">

                  <IconButton color={choice.id === newQuestion.correctAnswer ? 'success' : 'inherit'} onClick={() => handleChangeMCQAnswer(choice.id)}>
                    <Check />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {newQuestion.type === 'TF' && (
        <Box>
          <Typography variant="subtitle1">Answer</Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="true"
              name="radio-buttons-group"
              onChange={(e) => handleChangeTFAnswer(e.target.value as 'true' | 'false')}
            >
              <FormControlLabel value="true" control={<Radio color='success' />} label="True" />
              <FormControlLabel value="false" control={<Radio color='error' />} label="False" />
            </RadioGroup>
          </FormControl>
        </Box>
      )}


      {validateQuestion(newQuestion) && (
        <Button variant='contained' sx={{ pl: 1, textAlign: 'left' }} color='primary' onClick={handleAddQuestion}>
          <Add /> Add Question
        </Button>
      )}

      <QuestionsList questions={questions} setQuestions={setQuestions} />

      {/* Shuffling Options */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Shuffling Options
        </Typography>
        <TextField label="Number of forms" type="number" onChange={handleNumberChange} value={numberOfForms} />
      </Box>
      <Button variant='contained' color='primary' sx={{ mt: 2 }}>
        <Link to='/preview' state={{ questions, numberOfForms }}>Preview</Link>
      </Button>
    </Container >
  )
}

function validateQuestion(question: Question) {
  if (question.text === '') {
    return false;
  }
  if (question.type === 'MCQ') {
    return question.choices.every((choice) => choice.text !== '');
  }
  return true;
}