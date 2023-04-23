var express = require('express');
var bodyParser = require('body-parser');
const {Server} = require("socket.io");
var app = express();
var cors = require('cors');
const connect = require('./config/database/database');
//setup socket.io
const http = require('http');
const  userServices  = require('./services/userServices.js');
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
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

io.on('connection', (socket) => {
	console.log('a user connected', socket.id);
	socket.on('share', async (msg) => {
		let getUserIdShares;
		const dataNotification = JSON.parse(msg);
		// Lấy user id để tìm kiếm những người đã follow
		const getUserId = dataNotification && Number(dataNotification.userId);
		const getUserFollowerId = await userServices.getUserFollower(getUserId);
		if (getUserFollowerId.code === 1) {
			const getDataFollows = getUserFollowerId.data;
			if (getDataFollows && getDataFollows.length > 0) {
				getDataFollows.forEach(async(item,index) => {
					getUserIdShares = Number(item.dataValues.user_id);
					io.emit(`result ${getUserIdShares}`, msg);
					await userServices.saveNotificationUser(getUserIdShares, msg);
				});
			}
			console.log("getUserIdShares", getUserIdShares);
		}
	});
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
io.listen(4000);
// connect database
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
require('./routes/notifications')(app);

app.use(function (err, req, res, next) {
  	res.status(500).send(err);
});
//connect server
app.listen(process.env.PORT || 666, () => {
  	console.log(`Chào mừng bạn đến với Backend với PORT ${process.env.PORT || 666}`);
});
