const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module'); // Ensure this points to your compiled code

module.exports = async (req, res) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};


const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/guestbook', (req, res) => {
  res.json({ message: 'Guestbook API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;