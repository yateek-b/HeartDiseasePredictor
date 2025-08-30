import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Heart Disease Prediction
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">Male</MenuItem>
                <MenuItem value="0">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Chest Pain Type"
                name="cp"
                value={formData.cp}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Typical Angina</MenuItem>
                <MenuItem value="1">Atypical Angina</MenuItem>
                <MenuItem value="2">Non-anginal Pain</MenuItem>
                <MenuItem value="3">Asymptomatic</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Resting Blood Pressure"
                name="trestbps"
                type="number"
                value={formData.trestbps}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cholesterol"
                name="chol"
                type="number"
                value={formData.chol}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Fasting Blood Sugar"
                name="fbs"
                value={formData.fbs}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">{'>'} 120 mg/dl</MenuItem>
                <MenuItem value="0">≤ 120 mg/dl</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Resting ECG"
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Normal</MenuItem>
                <MenuItem value="1">ST-T Wave Abnormality</MenuItem>
                <MenuItem value="2">Left Ventricular Hypertrophy</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Maximum Heart Rate"
                name="thalach"
                type="number"
                value={formData.thalach}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Exercise Induced Angina"
                name="exang"
                value={formData.exang}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="0">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ST Depression"
                name="oldpeak"
                type="number"
                value={formData.oldpeak}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Slope"
                name="slope"
                value={formData.slope}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Upsloping</MenuItem>
                <MenuItem value="1">Flat</MenuItem>
                <MenuItem value="2">Downsloping</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Number of Major Vessels"
                name="ca"
                value={formData.ca}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Thalassemia"
                name="thal"
                value={formData.thal}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">Normal</MenuItem>
                <MenuItem value="2">Fixed Defect</MenuItem>
                <MenuItem value="3">Reversible Defect</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Predict
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Box mt={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {prediction && (
          <Box mt={3}>
            <Alert severity={prediction.prediction === 1 ? 'error' : 'success'}>
              {prediction.prediction === 1
                ? `High risk of heart disease (${(prediction.probability * 100).toFixed(2)}% probability)`
                : `Low risk of heart disease (${(prediction.probability * 100).toFixed(2)}% probability)`}
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App; 