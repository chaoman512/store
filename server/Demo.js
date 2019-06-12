let user=require("./User");
console.log(`userName:${user.name}`);
console.log(`sayhello:${user.sayHello()}`);


let http=require('http');
let url=require('url');
let util=require('util');
let fs=require('fs');
let server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader("Content-Type","text/plain;charset=utf-8");
	console.log("url:"+req.url);
	console.log("parse:"+url.parse(req.url));
	console.log("util:"+util.inspect(url.parse(req.url)));
	res.end("end")
});

server.listen(3000,"127.0.0.1",()=>{
	console.log('服务器已经运行，输入http://127.0.0.1:3000');
})