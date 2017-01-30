var sql = require("sqlite3").verbose();
var db = new sql.Database('./plusone.db');


function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
	router.get("/",function(req,res){
           res.json({"Message" : "Hello World !"});
    });

	
	router.get ("/chatroom",function(req,res){
		var query = "SELECT * FROM Chat_Room";
		db.serialize(function () {
			db.each(query,function(err,row){
				if(err) {
					res.json({"Message":"Error executing MySQL query"});
				}else{
					//res.json ({"Message":"Success"})
					console.log (row);
				}
			});
		});
	});

	router.post ("/chatroom",function(req,res){
		var query = "INSERT INTO Chat_Room (Chat_Room_Id, Chat_Room_Name) VALUES (?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatRoomId, req.body.chatRoomName).finalize (function(err,row){
				if(err) {
					res.json({"Message":"Error executing MySQL query"});
				}else{
					res.json({"Message":"Success","Users":row});
				}
			});	
		});
	});
}

module.exports = REST_ROUTER;