const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));
 // Serve static files from 'build'

// The crucial change: Handle all GET requests by serving index.html
app.get('/*', (req, res) => {  // Match ALL get routes (*)
  res.sendFile(path.join(__dirname, '../dist/client/index.html'), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  });
});

// 404 handler (optional, but good practice)
// app.use('*', (req, res) => { // Remove or comment out this 404 handler. It interferes.
//   res.status(404).send('Not Found');
// });

// Default middleware error handler (keep this for debugging)
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Look at this --> Server is running @ ${PORT}`);
});