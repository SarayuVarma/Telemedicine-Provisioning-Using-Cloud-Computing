const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure AWS SDK with your credentials
AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: 'AKIATM5LB5VV564UGBFA',
  secretAccessKey: 'HJOJfSVQgyXrcPiS8hhUW8+Ls6+ewKGTQpGqfYYD',
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
    
    // Redirect to the login page after successful signup
    res.redirect('/login'); // Adjust the URL if needed
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
