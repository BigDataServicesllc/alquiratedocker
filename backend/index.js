const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend de AlquiRate' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
