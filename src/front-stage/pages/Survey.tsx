import { Box, Button, FormControl, TextField, Typography, Paper, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { survey } from './fakedata';

// 定義獨立的樣式元件
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

// 定義重複利用的 LabeledTextField 元件
function LabeledTextField({
  label,
  id,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <StyledFormControl fullWidth>
      <Typography sx={{ minWidth: '4rem' }}>{label}:</Typography>
      <TextField id={id} value={value} onChange={onChange} type={type} required size="small" />
    </StyledFormControl>
  );
}

function Answer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <Paper sx={{ p: 5 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
        {survey.title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 5 }}>
        {survey.description}
      </Typography>

      {/* 必填欄位 */}
      <form onSubmit={handleFormSubmit}>
        <LabeledTextField
          label="姓名"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="手機"
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="年齡"
          id="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
        />

        <Box textAlign="right">
          <Button type="submit" variant="contained" color="secondary">
            送出
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Answer;
