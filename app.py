from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

app = Flask(__name__)
CORS(app)

# Define categorical columns and their possible values
CATEGORICAL_COLUMNS = {
    'sex': [0, 1],
    'cp': [0, 1, 2, 3],
    'fbs': [0, 1],
    'restecg': [0, 1, 2],
    'exang': [0, 1],
    'slope': [0, 1, 2],
    'ca': [0, 1, 2, 3],
    'thal': [1, 2, 3]
}

# Load and preprocess data
def load_and_preprocess_data():
    df = pd.read_csv('heart.csv')
    
    # Create dummy variables for categorical features
    dataset = pd.get_dummies(df, columns=['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal'])
    
    # Scale numerical features
    scaler = StandardScaler()
    columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    dataset[columns_to_scale] = scaler.fit_transform(dataset[columns_to_scale])
    
    # Save scaler and feature names for later use
    joblib.dump(scaler, 'scaler.joblib')
    
    # Save feature names excluding target
    feature_names = [col for col in dataset.columns if col != 'target']
    joblib.dump(feature_names, 'feature_names.joblib')
    
    return dataset

# Create dummy variables consistently
def create_dummy_variables(df):
    # Create a copy of the input dataframe
    df_dummy = df.copy()
    
    # Create dummy variables for each categorical column
    for col, values in CATEGORICAL_COLUMNS.items():
        # Create dummy variables
        dummies = pd.get_dummies(df_dummy[col], prefix=col)
        
        # Ensure all possible values are present
        for val in values:
            col_name = f'{col}_{val}'
            if col_name not in dummies.columns:
                dummies[col_name] = 0
        
        # Drop the original column and add the dummy variables
        df_dummy = df_dummy.drop(col, axis=1)
        df_dummy = pd.concat([df_dummy, dummies], axis=1)
    
    return df_dummy

# Train model
def train_model():
    if not os.path.exists('heart.csv'):
        return None
    
    dataset = load_and_preprocess_data()
    y = dataset['target']
    X = dataset.drop(['target'], axis=1)
    
    # Train Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Save model
    joblib.dump(model, 'heart_disease_model.joblib')
    return model

# Initialize model
model = train_model()
scaler = joblib.load('scaler.joblib') if os.path.exists('scaler.joblib') else None
feature_names = joblib.load('feature_names.joblib') if os.path.exists('feature_names.joblib') else None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None or feature_names is None:
        return jsonify({'error': 'Model not trained'}), 500
    
    try:
        data = request.get_json()
        
        # Create a DataFrame with the input data
        input_data = pd.DataFrame([{
            'age': float(data['age']),
            'trestbps': float(data['trestbps']),
            'chol': float(data['chol']),
            'thalach': float(data['thalach']),
            'oldpeak': float(data['oldpeak']),
            'sex': int(data['sex']),
            'cp': int(data['cp']),
            'fbs': int(data['fbs']),
            'restecg': int(data['restecg']),
            'exang': int(data['exang']),
            'slope': int(data['slope']),
            'ca': int(data['ca']),
            'thal': int(data['thal'])
        }])
        
        # Create dummy variables
        input_data = create_dummy_variables(input_data)
        
        # Scale numerical features
        columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
        input_data[columns_to_scale] = scaler.transform(input_data[columns_to_scale])
        
        # Ensure all feature names are present
        for col in feature_names:
            if col not in input_data.columns:
                input_data[col] = 0
        
        # Reorder columns to match training data
        input_data = input_data[feature_names]
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability)
        })
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")  # Add logging
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 