# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report
# from sklearn.preprocessing import LabelEncoder
# import pandas as pd

# # Load the dataset
# data = pd.read_csv("ez_data.csv")

# # Separate features (X) and target variable (y)
# X = data.drop(columns=["Experience Level"])
# y = data["Experience Level"]

# # Encoding categorical features
# label_encoder = LabelEncoder()
# for column in X.columns:
#     if X[column].dtype == 'object':
#         X[column] = label_encoder.fit_transform(X[column])

# # Splitting data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Training level prediction model
# level_classifier = RandomForestClassifier()
# level_classifier.fit(X_train, y_train)

# # Making predictions
# y_pred = level_classifier.predict(X_test)

# # Evaluating model performance
# accuracy = accuracy_score(y_test, y_pred)
# print("Level Prediction Accuracy:", accuracy)
# print("Classification Report for Level Prediction:")
# print(classification_report(y_test, y_pred))

# # Example usage of the trained model for prediction
# new_data = pd.DataFrame({"Years of Experience": [3], "Familiarity with Concepts": ["High"]})
# for column in new_data.columns:
#     if new_data[column].dtype == 'object':
#         new_data[column] = label_encoder.transform(new_data[column])

# predicted_level = level_classifier.predict(new_data)
# print("Predicted Level for new data:", predicted_level[0])




#######

# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report
# from sklearn.preprocessing import LabelEncoder
# import pandas as pd
# import joblib


# # Load the dataset
# data = pd.read_csv("ez_data.csv")

# # Separate features (X) and target variable (y)
# X = data.drop(columns=["Experience Level"])
# y = data["Experience Level"]

# # Encoding categorical features
# label_encoder = LabelEncoder()
# for column in X.columns:
#     if X[column].dtype == 'object':
#         X[column] = label_encoder.fit_transform(X[column])

# # Splitting data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Training level prediction model
# level_classifier = RandomForestClassifier()
# level_classifier.fit(X_train, y_train)

# # Save the trained model and label encoder
# joblib.dump(level_classifier, 'trained_model.pkl')
# joblib.dump(label_encoder, 'label_encoder.pkl')

# # Making predictions on the test set
# y_pred = level_classifier.predict(X_test)

# # Evaluating model performance
# accuracy = accuracy_score(y_test, y_pred)
# print("Level Prediction Accuracy:", accuracy)
# print("Classification Report for Level Prediction:")
# print(classification_report(y_test, y_pred))

# # Example usage of the trained model for prediction
# new_data = pd.DataFrame({"Years of Experience": [3], "Familiarity with Concepts": ["High"]})
# for column in new_data.columns:
#     if new_data[column].dtype == 'object':
#         new_data[column] = label_encoder.transform(new_data[column])

# predicted_level = level_classifier.predict(new_data)
# print("Predicted Level for new data:", predicted_level[0])


from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import joblib

# Load the dataset
data = pd.read_csv("ez_data.csv")

# Separate features (X) and target variable (y)
X = data.drop(columns=["Experience Level"])
y = data["Experience Level"]

# Encoding categorical features
label_encoder = LabelEncoder()
for column in X.columns:
    if X[column].dtype == 'object':
        X[column] = label_encoder.fit_transform(X[column])

# Splitting data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Training level prediction model
level_classifier = RandomForestClassifier()
level_classifier.fit(X_train, y_train)

# Save the trained model and label encoder
joblib.dump(level_classifier, 'trained_model.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

# Making predictions on the test set
y_pred = level_classifier.predict(X_test)

# Evaluating model performance
accuracy = accuracy_score(y_test, y_pred)
print("Level Prediction Accuracy:", accuracy)
print("Classification Report for Level Prediction:")
print(classification_report(y_test, y_pred))

# Example usage of the trained model for prediction
new_data = pd.DataFrame({"Years of Experience": [5], "Familiarity with Concepts": ["Low"]})
for column in new_data.columns:
    if new_data[column].dtype == 'object':
        new_data[column] = label_encoder.transform(new_data[column])

predicted_level = level_classifier.predict(new_data)
print("Predicted Level for new data:", predicted_level[0])
