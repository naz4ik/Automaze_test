import { app } from './app.js';
import { client } from './db.js';

const PORT = process.env.PORT || 4000;

client.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});