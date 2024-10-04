"use client";
import { Button, TextField, Typography, Box, Link } from '@mui/material';

export default function SignupPage() {
  return (
    <div>
      {/* Main Content */}
      <main>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            backgroundColor: '#f6f8ff',
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
            <form>
              <TextField
                label="Email"
                name="email"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Confirm Email"
                name="confirmEmail"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                margin="normal"
              />
              <Button
                type="button"
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
      </main>
    </div>
  );
};

