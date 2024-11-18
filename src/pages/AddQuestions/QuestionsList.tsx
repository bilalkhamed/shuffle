import { Box, List, ListItem, Typography, Tabs, Tab, TextField, IconButton, RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Question } from '../../types/questions';

const LABELS = {
  MCQ: 'Multiple Choice',
  TF: 'True or False',
  SAQ: 'Short Answer'
};

type SetQuestionsStateAction = React.Dispatch<React.SetStateAction<Question[]>>;

export default function QuestionsList({ questions, setQuestions }: { questions: Question[], setQuestions: SetQuestionsStateAction }) {
  // Filter questions by type
  const mcqQuestions = questions.filter((q) => q.type === 'MCQ');
  const tfQuestions = questions.filter((q) => q.type === 'TF');
  const saqQuestions = questions.filter((q) => q.type === 'SAQ');

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Added Questions
      </Typography>

      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="question type tabs">
        <Tab label={LABELS.MCQ} />
        <Tab label={LABELS.TF} />
        <Tab label={LABELS.SAQ} />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {/* Display questions based on the selected tab */}
        {selectedTab === 0 && mcqQuestions.length > 0 && (
          <Box>
            {mcqQuestions.map((question) => (
              <QuestionBox key={question.id} question={question} setQuestions={setQuestions} />
            ))}
          </Box>
        )}
        {selectedTab === 1 && tfQuestions.length > 0 && (
          <Box>
            {tfQuestions.map((question) => (
              <QuestionBox key={question.id} question={question} setQuestions={setQuestions} />
            ))}
          </Box>
        )}
        {selectedTab === 2 && saqQuestions.length > 0 && (
          <Box>
            {saqQuestions.map((question) => (
              <QuestionBox key={question.id} question={question} setQuestions={setQuestions} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Component to render individual question boxes with edit mode functionality
function QuestionBox({ question, setQuestions }: { question: Question, setQuestions: SetQuestionsStateAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);

  // Handle changes to question text or choice
  const handleChange = (newValue: string, field: string) => {
    setEditedQuestion({ ...editedQuestion, [field]: newValue });
  };

  const handleChangeCorrectAnswer = (choiceId: 'a' | 'b' | 'c' | 'd') => {
    if (editedQuestion.type !== 'MCQ') return;
    setEditedQuestion({ ...editedQuestion, correctAnswer: choiceId });
  };

  const handleChoiceChange = (choiceId: 'a' | 'b' | 'c' | 'd', choiceText: string) => {
    if (editedQuestion.type !== 'MCQ') return;
    const newChoices = editedQuestion.choices.map((choice) => {
      if (choice.id === choiceId) {
        return { ...choice, text: choiceText };
      }
      return choice;
    });
    setEditedQuestion({ ...editedQuestion, choices: newChoices });
  };

  // Handle saving the question
  const handleSave = () => {
    console.log('Saved Question:', editedQuestion);
    setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === editedQuestion.id ? editedQuestion : q)));
    setIsEditing(false); // Exit edit mode after saving
  };

  // Handle deleting the question
  const handleDelete = () => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== editedQuestion.id));
    setIsEditing(false); // Exit edit mode after deleting
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 1,
        marginBottom: 2,
        '&:hover': {
          borderColor: 'primary.main', // Highlight on hover
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {isEditing ? (
            <TextField
              fullWidth
              variant="standard"
              value={editedQuestion.text}
              onChange={(e) => handleChange(e.target.value, 'text')}
              sx={{ mb: 2 }}
            />
          ) : (
            editedQuestion.text
          )}
        </Typography>

        {/* Edit, Save, and Delete buttons */}
        {isEditing ? (
          <Box>
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>


      {/* MCQ choices edit */}
      {isEditing && editedQuestion.type === 'MCQ' && (
        <List>
          {editedQuestion.choices.map((choice) => (
            <ListItem key={choice.id}>
              <Typography onClick={() => handleChangeCorrectAnswer(choice.id)} color={editedQuestion.correctAnswer === choice.id ? 'success' : 'text.secondary'} sx={{ mr: 1, cursor: 'pointer' }}>
                {choice.id})
              </Typography>
              <TextField
                variant="standard"
                value={choice.text}
                onChange={(e) => handleChoiceChange(choice.id, e.target.value)} // Update choice text
                sx={{ flex: 1 }}
              />
            </ListItem>
          ))}

          <Typography variant="subtitle1" color='text.secondary' sx={{ mt: 1 }}>Click on a letter to change the correct answer</Typography>
        </List>
      )}

      {/* MCQ choices view */}
      {!isEditing && editedQuestion.type === 'MCQ' && (
        <List>
          {editedQuestion.choices.map((choice) => (
            <ListItem key={choice.id}>
              <Typography color="text.secondary" sx={{ mr: 1 }}>
                {choice.id})
              </Typography>
              <Typography>
                {choice.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {/* TF answer edit */}
      {(question.type === 'TF' && isEditing) && (
        <Box>
          <Typography variant="subtitle1">Edit Answer</Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="true"
              name="radio-buttons-group"
              onChange={(e) => handleChange(e.target.value, 'correctAnswer')}
            >
              <FormControlLabel value="true" control={<Radio color='success' />} label="True" />
              <FormControlLabel value="false" control={<Radio color='error' />} label="False" />
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      {/* Correct Answer view */}
      {((question.type === 'MCQ' || question.type === 'TF') && !isEditing) && (
        <Typography variant="subtitle2" color="success">
          Correct Answer: {question.correctAnswer}
        </Typography>
      )}
    </Box>
  );
}
