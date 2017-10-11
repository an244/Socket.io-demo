//Server Express
const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');


const server = require("http").Server(app);
//socket io
const io = require("socket.io")(server);

//server lang nghe port 3000
server.listen(3000,()=>console.log('server started'));

//io lang nghe su kien ket noi hoặc ngắt kết nối giữa client và server
//tất cả các emit từ client sẽ dc 'on' ở chỗ này và có 1 socket riêng với message riêng
io.on("connection", socket =>{
    //mỗi khi có 1 kết nối lên server đều tạo 1 socket riêng biệt khác nhau cho từng kết nối
    console.log('co nguoi ket noi: '+ socket.id);

  //socket lắng nghe sự kiện ngắt kết nối
  socket.on('disconnect', () =>{
   console.log('dã Thoát: ' + socket.id ); 
  });

  //'Client-send-data' phải khớp với 'emit' bên home.ejs
  socket.on('Client-send-data', (data)=>{
    console.log(data);
  });

});

app.get('/',(req,res)=> {
 res.render('home');
});