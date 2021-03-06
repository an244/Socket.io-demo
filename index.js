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
  socket.on('Client-send-data', (Hello)=>{
    //Bước 1B
    console.log(Hello + " from " + socket.id );
    
    //server gửi trả lời về cho tất cả clients đag kết nối tới server
    //"Server-send-data" phải trùng khớp với "on" bên home.ejs
    //Bước 1C
    //io.sockets.emit("Server-send-data", HelloFromClient+" from Server for " + socket.id);
  
    //server chỉ trả lời với 1 client nào click send thôi, ko gửi cho tất cả client đag kết nối server nữa
    //Bước 1C2
    //socket.emit("Server-send-data", Hello+" from Server for " + socket.id);

    //server chỉ KO trả lời với 1 client nào click send thôi, NHƯNG gửi cho tất cả client đag kết nối server đó
    //Bước 1C3
    socket.broadcast.emit("Server-send-data", Hello+" from Server for " + socket.id);
  });

});

app.get('/',(req,res)=> {
 res.render('home');
});