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

//io lang nghe su kien ket noi
io.on("connection", socket =>{
    console.log('co nguoi ket noi');
});

app.get('/',(req,res)=> {
 res.render('home');
});