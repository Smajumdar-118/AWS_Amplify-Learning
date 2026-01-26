const express = require('express');
const aws = require('aws-sdk');
const app = express();

app.use(express.json());

const dynamoDb = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.STORAGE_USERTABLE_NAME;

// GET users
app.get('/users', async (req, res) => {
  try {
    const data = await dynamoDb.scan({
      TableName: TABLE_NAME,
    }).promise();

    res.json(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  const item = {
    id: Date.now().toString(),
    name,
    email,
  };

  try {
    await dynamoDb.put({
      TableName: TABLE_NAME,
      Item: item,
    }).promise();

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

module.exports = app;
