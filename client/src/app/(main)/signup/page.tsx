"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Typography, Box, Link } from '@mui/material';

interface FormState {
  email: string;
  confirmEmail: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    email: '',
    confirmEmail: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add form validation and backend logic here
    console.log(form);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: 3,
          textAlign: 'center',
          width: '400px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Let’s Get Started.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '20px' }} />}
          fullWidth
          sx={{ mb: 3 }}
        >
          Sign up with Google
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          or
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Confirm Email"
            name="confirmEmail"
            value={form.confirmEmail}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Confirm
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link href="/login" color="inherit">
            Logging in?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;