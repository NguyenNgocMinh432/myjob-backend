var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
const connect = require('./config/database/database');

const http = require('http');
const {Server} = require("socket.io");
const server = http.createServer(app)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('<h1>Chào tất cả các bạn đến với api jobIt!</h1>');
});

//setup socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:6666",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`user connected to ${socket.id}`)
})

connect();
require('./routes/loginCompany')(app);
require('./routes/loginUser')(app);
require('./routes/Tag')(app);
require('./routes/Company')(app);
require('./routes/CheckCompany')(app);
require('./routes/Work')(app);
require('./routes/User')(app);
require('./routes/Role')(app);
require('./routes/Contact')(app);
require('./routes/TypeOfWork')(app);
require('./routes/New')(app);
require('./routes/SocialNetwork')(app);
require('./routes/Candidate')(app);
require('./routes/Recruiment')(app);
require('./routes/TagNew')(app);
require('./routes/UserTag')(app);
require('./routes/SaveWork')(app);
require('./routes/WordId')(app);
require('./routes/CheckLogin')(app);
require('./routes/DeleteSaveWork')(app);
require('./routes/UserTypeOfWork')(app);
require('./routes/GetUserSaveWork')(app);
require('./routes/GetCompanySaveUser')(app);
require('./routes/WorkApply')(app);
require('./routes/CheckWorkApply')(app);
require('./routes/CheckUserApply')(app);
require('./routes/FormCV')(app);
require('./routes/TagFormCV')(app);
require('./routes/GetCategoriHome')(app);
require('./routes/SearchWork')(app);
require('./routes/UserRole')(app);
require('./routes/follows')(app);
require('./routes/feedbacks')(app);

app.use(function (err, req, res, next) {
  res.status(500).send(err);
});

app.listen(process.env.PORT || 666, () => {
  console.log('Chào mừng bạn đến với Backend');
});
