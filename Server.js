const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure AWS SDK with your credentials
AWS.config.update({
  region: 'your_dynamodb_region',
  accessKeyId: 'your_access_key_id',
  secretAccessKey: 'your_secret_access_key',
});

// Create a DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// DynamoDB table name
const tableName = 'Customer_Details';

// Middleware for parsing JSON
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const params = {
      TableName: tableName,
      Item: req.body,
    };
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const params = {
      TableName: tableName,
      Key: { username, password },
    };
    const result = await dynamoDB.get(params).promise();

    if (result.Item) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
