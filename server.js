import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
