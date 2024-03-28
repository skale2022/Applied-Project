// app.js
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); // Point to your generated Swagger JSON file

app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello, Swagger!' });
});

app.get('/api/morning',(req, res) => {
    res.json({ message: 'Hello Good Morning!' });
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*',function (req, res) {
  res.redirect('/api-docs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
