# Quiz Forms Generator

A web app for teachers to create and shuffle quiz versions efficiently. Teachers can input questions, shuffle them (and their options), generate multiple quiz versions, and print them all automatically using a streamlined workflow.

---

## Features

- **Question Bank Input**:  
  Teachers can input:
  - Multiple Choice Questions (MCQs) with options.
  - True/False questions.
  - Short-Answer Questions (SAQs).

- **Shuffling**:  
  - Questions are shuffled randomly across versions.
  - MCQ options are also shuffled for each version.
  - Question types are ordered as:
    1. MCQs
    2. True/False
    3. SAQs.

- **Multiple Quiz Versions**:  
  Teachers can specify the number of quiz versions to generate (matching the number of students).

- **Automatic Printing**:  
  - All quiz versions are formatted and prepared for printing.
  - Uses the browser's built-in `window.print()` function for simplicity and efficiency.

---

## Tech Stack

- **Frontend**:  
  - React with TypeScript for robust and type-safe UI development.

- **Styling**:  
  - Material-UI (MUI) for consistent and modern design.

---

## Screens

### **First Screen: Input Questions**
- Input a question bank with:
  - Question type (MCQ, True/False, SAQ).
  - Number of questions to include.
  - Number of quiz versions to generate.
- Proceed to view the generated quiz versions.

### **Second Screen: View & Print Versions**
- View all generated quiz versions.
- Each version has:
  - Shuffled questions and MCQ options.
  - Question types in the order: MCQs → True/False → SAQs.
- Option to print all versions using `window.print()`.

---

## File Structure
```
src/
|-- assets/css/        # Global styles
|   |-- index.css      # Main CSS file
|-- context/           # Context for managing global state
|   |-- theme.ts       # Theme configuration (MUI theme)
|-- pages/             # Screens
|   |-- AddQuestions/  # Page for adding questions
|   |-- Home/          # Landing page
|   |-- Preview/       # Page for viewing and printing quiz versions
|-- types/             # TypeScript types
|   |-- questions.ts   # Types for questions and quizzes
|-- utils/             # Utility functions
|   |-- shuffle.ts     # Logic for shuffling questions and options
|-- App.tsx            # Main app component
|-- main.tsx           # Entry point of the application
```