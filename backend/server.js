const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const conversationRoutes = require("./routes/conversationRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/conversations", conversationRoutes);
app.use("/api/chat", messageRoutes);


  (async () => {
    try {
      await connectDB();

      app.get('/health', (req, res) => {
        res.send('Server is healthy and DB connected.');
      });

      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to DB:', error);
      process.exit(1);
    }
  })();