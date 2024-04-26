const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors'); 
const app = express();
const PORT = 5000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

app.use(bodyParser.json());
app.use(cors()); 

const swaggerDocument = YAML.load('./swagger.yaml');

// Serve Swagger UI at the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', todoRoutes);

app.get('*',function (req, res) {
  res.redirect('/api-docs');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
