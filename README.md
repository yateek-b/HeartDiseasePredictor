Heart Disease Prediction
This is a full-stack application that uses machine learning to predict the likelihood of heart disease based on various medical parameters.
Features
Machine learning model using Random Forest Classifier
Modern React frontend with Material-UI
RESTful API using Flask
Real-time predictions with probability scores
Prerequisites
Python 3.8+
Node.js 14+
npm or yarn
Setup Instructions
Clone the repository:
git clone <repository-url>
cd heart-disease-prediction
Install Python dependencies:
pip install -r requirements.txt
Install frontend dependencies:
npm install
Download the dataset:
Download the heart disease dataset from UCI Machine Learning Repository
Save it as heart.csv in the root directory
Start the backend server:
python app.py
In a new terminal, start the frontend development server:
npm start
Open your browser and navigate to http://localhost:3000
Usage
Fill in the form with the patient's medical information
Click the "Predict" button
View the prediction result and probability score
Model Details
The application uses a Random Forest Classifier with the following features:
Age
Sex
Chest Pain Type
Resting Blood Pressure
Cholesterol
Fasting Blood Sugar
Resting ECG
Maximum Heart Rate
Exercise Induced Angina
ST Depression
Slope
Number of Major Vessels
Thalassemia
Technologies Used
Frontend:
React
Material-UI
Axios
Backend:
Flask
scikit-learn
pandas
numpy
License
MIT

