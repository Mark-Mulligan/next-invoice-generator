// React
import React, { FC, useState, useEffect } from 'react';

// libraries
import axios from 'axios';

// MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

// Types
import { Student } from '../types/customTypes';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  showModal: boolean;
  onClose: () => void;
  selectedStudent: Student | null;
}

const StudentModal: FC<IProps> = ({ showModal, onClose, selectedStudent }) => {
  const [name, setName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [lessonAmount, setLessonAmount] = useState('24');

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) {
      handleAddStudent();
    }
  };

  const handleAddStudent = async () => {
    let student = {
      name,
      parentName,
      parentEmail,
      parentPhone,
      lessonAmount: Number(lessonAmount),
    };

    try {
      let result = await axios.post('/api/students', { student });
      console.log('result', result.data);
    } catch (err) {
      console.log(err);
    }

    onClose();
  };

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setParentName(selectedStudent.parentName);
      setParentEmail(selectedStudent.parentEmail);
      setParentPhone(selectedStudent.parentPhone);
      setLessonAmount(selectedStudent.lessonAmount.toString());
    } else {
      setName('');
      setParentName('');
      setParentEmail('');
      setParentPhone('');
      setLessonAmount('24');
    }
  }, [selectedStudent]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleFormSubmit}>
        <Box sx={modalStyle}>
          <Typography variant="h4" align="center" sx={{ marginBottom: '2rem' }}>
            {selectedStudent ? 'Edit Student' : 'Add Student'}
          </Typography>
          <TextField
            id="studentName"
            label="Student Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: '1.4rem' }}
          />
          <TextField
            id="parentName"
            label="Parent Name"
            variant="outlined"
            size="small"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: '1.4rem' }}
          />
          <TextField
            id="parentEmail"
            label="Parent Email"
            variant="outlined"
            size="small"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: '1.4rem' }}
          />
          <TextField
            id="parentPhone"
            label="Parent Phone"
            variant="outlined"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            size="small"
            fullWidth
            sx={{ marginBottom: '1.4rem' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '1.4rem' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Lesson Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={lessonAmount}
              onChange={(e) => setLessonAmount(e.target.value)}
              type="number"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Lesson Amount"
              size="small"
            />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" type="button" onClick={(e) => handleCancel(e)}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add Student
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default StudentModal;