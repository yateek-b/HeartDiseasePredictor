# Heart Disease Prediction

This is a full-stack application that uses machine learning to predict the likelihood of heart disease based on various medical parameters.

## Deployment
https://heart-disease-predictor-sandy.vercel.app/

## Features

- Machine learning model using Random Forest Classifier
- Modern React frontend with Material-UI
- RESTful API using Flask
- Real-time predictions with probability scores

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd heart-disease-prediction
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
npm install
```

4. Download the dataset:
- Download the heart disease dataset from [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/heart+disease)
- Save it as `heart.csv` in the root directory

5. Start the backend server:
```bash
python app.py
```

6. In a new terminal, start the frontend development server:
```bash
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Fill in the form with the patient's medical information
2. Click the "Predict" button
3. View the prediction result and probability score

## Model Details

The application uses a Random Forest Classifier with the following features:
- Age
- Sex
- Chest Pain Type
- Resting Blood Pressure
- Cholesterol
- Fasting Blood Sugar
- Resting ECG
- Maximum Heart Rate
- Exercise Induced Angina
- ST Depression
- Slope
- Number of Major Vessels
- Thalassemia

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios

- Backend:
  - Flask
  - scikit-learn
  - pandas
  - numpy

## License

MIT 
