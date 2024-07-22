const app = require('./src/app');
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Renegotiation service running on port ${PORT}`));
