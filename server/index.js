const io=require("./io");
const {getNetworkIPv4}=require("./utils");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.use("/",express.static('dist'));
app.use("/assets/images",express.static('upload'));

const cors = require("cors")
app.use(cors())

// 上传文件功能
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
app.post('/upload', upload.single('Uploader'), function (req, res, next) {
    console.log(req.file.originalname);
})

// 下载文件功能
app.get('/download', function(req, res) {
  console.log(req.file);
  // res.download('./uploads/'+req.file.originalname);
});

const PORT=3000;
io.attach(server);
//启动服务器
server.listen(PORT,()=> {
  const address=getNetworkIPv4().address;
  console.info("- Local:   http://localhost:"+PORT);
  console.info(`- Network: http://${address}:`+PORT)
});
