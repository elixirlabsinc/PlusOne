var sql = require ("sqlite3").verbose();
var db = new sql.Database ('./plusone.db');


function REST_ROUTER (router,connection,md5) {
    var self = this;
    self.handleRoutes (router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function (router,connection,md5) {

	/*** USERS
	{"userId":"1", "userType":"Newcomer", "userEmail":"ron@nair.com", "userFacebookId":"ronnie", "userTwitterId":"ronnie", "userPinterestId":"ronnie", "userPassword":"lol"}
	{
      "User_Id": "1",
      "User_Type": "Newcomer",
      "User_Email": "ron@nair.com",
      "User_FacebookId": "ronnie",
      "User_TwitterId": "ronnie",
      "User_PinterestId": "ronnie",
      "User_Password": "lol",
      "User_DateCreated": "2017-01-31",
      "User_DateUpdated": "2017-01-31"
    }
    ***/
	router.post ("/user",function (req,res) {
		var query = "INSERT INTO User (User_Id, User_Type, User_Email, User_FacebookId, User_TwitterId, User_PinterestId, User_Password, User_DateCreated, User_DateUpdated) VALUES (?,?,?,?,?,?,?,date('now'),date('now'))";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.body.userType, req.body.userEmail, req.body.userFacebookId, req.body.userTwitterId, req.body.userPinterestId, req.body.userPassword).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","User":{"User_Id":req.body.userId,"User_Type":req.body.userType,"User_Email":req.body.userEmail,"User_FacebookId":req.body.userFacebookId,"User_TwitterId":req.body.userTwitterId,"User_PinterestId":req.body.userPinterestId,"User_Password":req.body.userPassword}});//,"User_DateCreated":date('now'),"User_DateUpdated":date('now')}});
				}
			});	
		});
	});

	router.get ("/users",function (req,res) {
		var query = "SELECT * FROM User";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Users":rows});
				}
			});
		});
	});

	router.get ("/user/id/:id",function(req,res){
		var query = "SELECT * FROM User WHERE User_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","User":row});
				}
			});
		});
	});

	/*
	//example get by more than id
	router.get ("/user/email/:email",function(req,res){
		var query = "SELECT * FROM User WHERE User_Email = ?";
		db.serialize (function () {
			db.all (query, req.params.email, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","User":row});
				}
			});
		});
	});*/

	router.put ("/user/id/:id",function (req,res) {
		var query = "UPDATE User SET User_Email = ?, User_DateUpdated = date('now') WHERE User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userEmail, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","User":{"User_Id":req.params.id,"User_Email":req.body.userEmail}});
				}
			});	
		});
	});


	router.delete ("/chatroom/id/:id",function (req,res) {
		var query = "DELETE FROM User WHERE User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});

	
	/*** Interest 
	{"interestId":1,"interestName":"Sports"}
	{
      "Interest_Id": "1",
      "Interest_Name": "Sports",
      "Interest_DateCreated": "2017-01-31",
      "Interest_DateUpdated": "2017-01-31"
    }
	***/
	router.post ("/interest",function (req,res) {
		var query = "INSERT INTO Interest (Interest_Id, Interest_Name, Interest_DateCreated, Interest_DateUpdated) VALUES (?,?,date('now'),date('now'))";
		db.serialize(function () {
			db.prepare (query).run (req.body.interestId, req.body.interestName).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Interest":{"Interest_Id":req.body.interestId,"Interest_Name":req.body.interestName}});
				}
			});	
		});
	});

	router.get ("/interests",function (req,res) {
		var query = "SELECT * FROM Interest";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Interests":rows});
				}
			});
		});
	});

	router.get ("/interest/id/:id",function(req,res){
		var query = "SELECT * FROM Interest WHERE Interest_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Interest":row});
				}
			});
		});
	});

	router.put ("/interest/id/:id",function (req,res) {
		var query = "UPDATE Interest SET Interest_Name = ?,Interest_DateUpdated = date('now') WHERE Interest_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.interestName, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Interest":{"Interest_Id":req.params.id,"Interest_Name":req.body.interestName}});
				}
			});	
		});
	});

	router.delete ("/interest/id/:id",function (req,res) {
		var query = "DELETE FROM Chat_Room WHERE Chat_Room_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** USER INTEREST
	{"userInterestId":1, "userId":1,"interestId":1}
	{
      "User_Interest_Id": "1",
      "User_Id": "1",
      "Interest_Id": "1",
      "User_Interest_DateCreated": "2017-01-31",
      "User_Interest_DateUpdated": "2017-01-31"
    }
    ***/
	router.post ("/userinterest",function (req,res) {
		var query = "INSERT INTO User_Interest (User_Interest_Id, User_Id, Interest_Id, User_Interest_DateCreated, User_Interest_DateUpdated) VALUES (?,?,?,date('now'),date('now'))";
		db.serialize(function () {
			db.prepare (query).run (req.body.userInterestId, req.body.userId, req.body.interestId).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","UserInterest":{"User_Interest_Id":req.body.userInterestId,"User_Id":req.body.userId, "Interest_Id":req.body.interestId}});
				}
			});	
		});
	});
	
	router.get ("/userinterests",function (req,res) {
		var query = "SELECT * FROM User_Interest";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","UserInterest":rows});
				}
			});
		});
	});

	router.get ("/userinterest/id/:id",function(req,res){
		var query = "SELECT * FROM User_Interest WHERE User_Interest_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","UserInterest":row});
				}
			});
		});
	});

	router.put ("/userinterest/id/:id",function (req,res) {
		var query = "UPDATE User_Interest SET User_Id = ?, Interest_Id = ?, User_Interest_DateUpdated = date('now') WHERE User_Interest_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.body.interestId, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","UserInterest":{"User_Id":req.body.userId,"Interest_Id":req.body.interestId}});
				}
			});	
		});
	});

	router.delete ("/userinterest/id/:id",function (req,res) {
		var query = "DELETE FROM User_Interest WHERE User_Interest_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** CHAT ROOMS
	{"chatRoomId":1,"chatRoomName":"Ron's Room"}
	{
      "Chat_Room_Id": "1",
      "Chat_Room_Name": "Ron's Room"
    }
    ***/
	router.post ("/chatroom",function (req,res) {
		var query = "INSERT INTO Chat_Room (Chat_Room_Id, Chat_Room_Name) VALUES (?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatRoomId, req.body.chatRoomName).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","ChatRoom":{"Chat_Room_Id":req.body.chatRoomId,"Chat_Room_Name":req.body.chatRoomName}});
				}
			});	
		});
	});

	router.get ("/chatrooms",function (req,res) {
		var query = "SELECT * FROM Chat_Room";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","ChatRooms":rows});
				}
			});
		});
	});

	router.get ("/chatroom/id/:id",function(req,res){
		var query = "SELECT * FROM Chat_Room WHERE Chat_Room_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","ChatRoom":row});
				}
			});
		});
	});

	router.put ("/chatroom/id/:id",function (req,res) {
		var query = "UPDATE Chat_Room SET Chat_Room_Name = ? WHERE Chat_Room_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatRoomName, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","ChatRoom":{"Chat_Room_Id":req.body.chatRoomId,"Chat_Room_Name":req.body.chatRoomName}});
				}
			});	
		});
	});

	router.delete ("/chatroom/id/:id",function (req,res) {
		var query = "DELETE FROM Chat_Room WHERE Chat_Room_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** CHAT USERS
	{"chatUserId":1,"chatRoomId":"1","userId":"1"}
	{
      "Chat_User_Id": "1",
      "Chat_Room_Id": "2",
      "User_Id": "5"
    }
    ***/
	router.post ("/chatuser",function (req,res) {
		var query = "INSERT INTO Chat_User (Chat_User_Id, Chat_Room_Id, User_Id) VALUES (?,?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatUserId, req.body.chatRoomId, req.body.userId).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","ChatUser":{"Chat_User_Id":req.body.chatUserId,"Chat_Room_Id":req.body.chatRoomId,"User_Id":req.body.userId}});
				}
			});	
		});
	});

	router.get ("/chatusers",function (req,res) {
		var query = "SELECT * FROM Chat_User";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","ChatUsers":rows});
				}
			});
		});
	});

	router.get ("/chatuser/id/:id",function(req,res){
		var query = "SELECT * FROM Chat_User WHERE Chat_User_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","ChatUser":row});
				}
			});
		});
	});

	router.put ("/chatuser/id/:id",function (req,res) {
		var query = "UPDATE Chat_User SET Chat_Room_Id = ?, User_Id = ? WHERE Chat_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatRoomId, req.body.userId, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","ChatUser":{"Chat_User_Id":req.params.id,"Chat_Room_Id":req.body.chatRoomId,"User_Id":req.body.userId}});
				}
			});	
		});
	});

	router.delete ("/chatuser/id/:id",function (req,res) {
		var query = "DELETE FROM Chat_User WHERE Chat_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** CHAT MESSAGES
	{"chatMessageId":1,"userId":"1","chatRoomId":"1","message":"Message1","mediaURL":"www.google.com"}	
	{
      "Chat_Message_Id": "3",
      "User_Id": "1",
      "Chat_Room_Id": "1",
      "Message": "Message1",
      "Media_Url": "www.google.com"
    }
    ***/
	router.post ("/chatmessage",function (req,res) {
		var query = "INSERT INTO Chat_Message (Chat_Message_Id, User_Id, Chat_Room_Id, Message, Media_Url) VALUES (?,?,?,?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatMessageId, req.body.userId, req.body.chatRoomId, req.body.message, req.body.mediaURL).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Chat_Message":{"Chat_Message_Id":req.body.chatMessageId,"User_Id":req.body.userId,"Chat_Room_Id":req.body.chatRoomId,"Message":req.body.message,"Media_Url":req.body.mediaURL}});
				}
			});	
		});
	});

	router.get ("/chatmessages",function (req,res) {
		var query = "SELECT * FROM Chat_Message";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Chat_Messages":rows});
				}
			});
		});
	});

	router.get ("/chatmessage/id/:id",function(req,res){
		var query = "SELECT * FROM Chat_Message WHERE Chat_Message_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Chat_Message":row});
				}
			});
		});
	});

	router.put ("/chatmessage/id/:id",function (req,res) {
		var query = "UPDATE Chat_Message SET User_Id = ?, Chat_Room_Id = ?, Message = ?, Media_Url = ? WHERE Chat_Message_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.body.chatRoomId, req.body.message, req.body.mediaURL, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Chat_Message":{"Chat_Message_Id":req.params.id,"User_Id":req.body.userId,"Chat_Room_Id":req.body.chatRoomId,"Message":req.body.message,"Media_Url":req.body.mediaURL}});
				}
			});	
		});
	});

	router.delete ("/chatmessage/id/:id",function (req,res) {
		var query = "DELETE FROM Chat_Message WHERE Chat_Message_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** CHAT MESSAGES
	{"chatMessageId":1,"userId":"1","chatRoomId":"1","message":"Message1","mediaURL":"www.google.com"}	
	{
      "Chat_Message_Id": "3",
      "User_Id": "1",
      "Chat_Room_Id": "1",
      "Message": "Message1",
      "Media_Url": "www.google.com"
    }
    ***/
	router.post ("/chatmessage",function (req,res) {
		var query = "INSERT INTO Chat_Message (Chat_Message_Id, User_Id, Chat_Room_Id, Message, Media_Url) VALUES (?,?,?,?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.chatMessageId, req.body.userId, req.body.chatRoomId, req.body.message, req.body.mediaURL).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Chat_Message":{"Chat_Message_Id":req.body.chatMessageId,"User_Id":req.body.userId,"Chat_Room_Id":req.body.chatRoomId,"Message":req.body.message,"Media_Url":req.body.mediaURL}});
				}
			});	
		});
	});

	router.get ("/chatmessages",function (req,res) {
		var query = "SELECT * FROM Chat_Message";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Chat_Messages":rows});
				}
			});
		});
	});

	router.get ("/chatmessage/id/:id",function(req,res){
		var query = "SELECT * FROM Chat_Message WHERE Chat_Message_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Chat_Message":row});
				}
			});
		});
	});

	router.put ("/chatmessage/id/:id",function (req,res) {
		var query = "UPDATE Chat_Message SET User_Id = ?, Chat_Room_Id = ?, Message = ?, Media_Url = ? WHERE Chat_Message_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.body.chatRoomId, req.body.message, req.body.mediaURL, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Chat_Message":{"Chat_Message_Id":req.params.id,"User_Id":req.body.userId,"Chat_Room_Id":req.body.chatRoomId,"Message":req.body.message,"Media_Url":req.body.mediaURL}});
				}
			});	
		});
	});

	router.delete ("/chatmessage/id/:id",function (req,res) {
		var query = "DELETE FROM Chat_Message WHERE Chat_Message_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** MATCHES
	{"matchId":1,"matchName":"1"}	
	{
      "Match_Id": "1",
      "Match_Name": "Match One"
    }
    ***/
	router.post ("/match",function (req,res) {
		var query = "INSERT INTO Match (Match_Id, Match_Name) VALUES (?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.matchId, req.body.matchName).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Match":{"Match_Id":req.body.matchId,"Match_Name":req.body.matchName}});
				}
			});	
		});
	});

	router.get ("/matches",function (req,res) {
		var query = "SELECT * FROM Match";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Matches":rows});
				}
			});
		});
	});

	router.get ("/match/id/:id",function(req,res){
		var query = "SELECT * FROM Match WHERE Match_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Match":row});
				}
			});
		});
	});

	router.put ("/match/id/:id",function (req,res) {
		var query = "UPDATE Match SET Match_Name = ? WHERE Match_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.matchName, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Match":{"Match_Id":req.params.id,"Match_Name":req.body.matchName}});
				}
			});	
		});
	});

	router.delete ("/match/id/:id",function (req,res) {
		var query = "DELETE FROM Match WHERE Match_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** MATCH USERS
	{"matchUserId":1,"userId":"1"}	
	{
      "Match_User_Id": "1",
      "User_Id": "1"
    }
    ***/
	router.post ("/matchuser",function (req,res) {
		var query = "INSERT INTO Match_User (Match_User_Id, User_Id) VALUES (?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.matchUserId, req.body.userId).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Match_User":{"Match_User_Id":req.body.matchUserId,"User_Id":req.body.userId}});
				}
			});	
		});
	});

	router.get ("/matchusers",function (req,res) {
		var query = "SELECT * FROM Match_User";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Match_Users":rows});
				}
			});
		});
	});

	router.get ("/matchuser/id/:id",function(req,res){
		var query = "SELECT * FROM Match_User WHERE Match_User_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Match_User":row});
				}
			});
		});
	});

	router.put ("/matchuser/id/:id",function (req,res) {
		var query = "UPDATE Match_User SET User_Id = ? WHERE Match_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Match_User":{"Match_User_Id":req.params.id,"User_Id":req.body.userId}});
				}
			});	
		});
	});

	router.delete ("/matchuser/id/:id",function (req,res) {
		var query = "DELETE FROM Match_User WHERE Match_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** REPORTS
	{"reportId":1,"reportMessage":"1"}	
	{
      "Report_Id": "1",
      "Report_Message": "Report One"
    }
    ***/
	router.post ("/report",function (req,res) {
		var query = "INSERT INTO Report (Report_Id, Report_Message) VALUES (?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.reportId, req.body.reportMessage).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Report":{"Report_Id":req.body.reportId,"Report_Message":req.body.reportMessage}});
				}
			});	
		});
	});

	router.get ("/reports",function (req,res) {
		var query = "SELECT * FROM Report";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Reports":rows});
				}
			});
		});
	});

	router.get ("/report/id/:id",function(req,res){
		var query = "SELECT * FROM Report WHERE Report_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Report":row});
				}
			});
		});
	});

	router.put ("/report/id/:id",function (req,res) {
		var query = "UPDATE Report SET Report_Message = ? WHERE Report_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.reportMessage, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Report":{"Report_Id":req.params.id,"Report_Message":req.body.reportMessage}});
				}
			});	
		});
	});

	router.delete ("/report/id/:id",function (req,res) {
		var query = "DELETE FROM Report WHERE Report_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** REPORT USERS
	{"reportUserId":1,"userId":"1","reportUserType":"Reporter"}	
	{
      "Report_User_Id": "1",
      "User_Id": "1",
      Report_User_Type:"Reporter"
    }
    ***/
	router.post ("/reportuser",function (req,res) {
		var query = "INSERT INTO Report_User (Report_User_Id, User_Id, Report_User_Type) VALUES (?,?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.reportUserId, req.body.userId, req.body.reportUserType).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Report_User":{"Report_User_Id":req.body.reportUserId,"User_Id":req.body.userId,"Report_User_Type":req.body.reportUserType}});
				}
			});	
		});
	});

	router.get ("/reportusers",function (req,res) {
		var query = "SELECT * FROM Report_User";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Report_Users":rows});
				}
			});
		});
	});

	router.get ("/reportuser/id/:id",function(req,res){
		var query = "SELECT * FROM Report_User WHERE Report_User_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Report_User":row});
				}
			});
		});
	});

	router.put ("/reportuser/id/:id",function (req,res) {
		var query = "UPDATE Report_User SET User_Id = ?, Report_User_Type = ? WHERE Report_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.body.reportUserType, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Report_User":{"Report_User_Id":req.params.id,"User_Id":req.body.userId,"Report_User_Type":req.body.reportUserType}});
				}
			});	
		});
	});

	router.delete ("/reportuser/id/:id",function (req,res) {
		var query = "DELETE FROM Report_User WHERE Report_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** LOGS
	{"logId":1,"logMessage":"Message One","userId":1,"Action":"Created User"}	
	{
      "Log_Id": "1",
      "Log_Message": "User has been created",
      "UserId": "User One",
      "Action:" "Created User"
    }
    ***/
	router.post ("/log",function (req,res) {
		var query = "INSERT INTO Log (Log_Id, Log_Message, User_Id, Action) VALUES (?,?,?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.logId, req.body.logMessage, req.body.userId, req.body.action).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Log":{"Log_Id":req.body.logId,"Log_Message":req.body.logMessage,"User_Id":req.body.userId, "Action":req.body.action}});
				}
			});	
		});
	});

	router.get ("/logs",function (req,res) {
		var query = "SELECT * FROM Log";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Logs":rows});
				}
			});
		});
	});

	router.get ("/log/id/:id",function(req,res){
		var query = "SELECT * FROM Log WHERE Log_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Log":row});
				}
			});
		});
	});

	router.put ("/log/id/:id",function (req,res) {
		var query = "UPDATE Log SET Log_Message = ?, User_Id = ?, Action = ? WHERE Log_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.logMessage, req.body.userId, req.body.action, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Log":{"Log_Id":req.params.id,"Log_Message":req.body.logMessage,"User_Id":req.body.userId, "Action":req.body.action}});
				}
			});	
		});
	});

	router.delete ("/log/id/:id",function (req,res) {
		var query = "DELETE FROM Log WHERE Log_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** SCHEDULES
	{"scheduleId":1,"scheduleName":"Schedule One","scheduleMessage":"Message One"}	
	{
      "Schedule_Id": "1",
      "scheduleName": "Schedule One",
      "Schedule_Message": "Report One"
    }
    ***/
	router.post ("/schedule",function (req,res) {
		var query = "INSERT INTO Schedule (Schedule_Id, Schedule_Name, Schedule_Message) VALUES (?,?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.scheduleId, req.body.scheduleName, req.body.scheduleMessage).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Schedule":{"Schedule_Id":req.body.scheduleId,"Schedule_Name":req.body.scheduleName,"Schedule_Message":req.body.scheduleMessage}});
				}
			});	
		});
	});

	router.get ("/schedules",function (req,res) {
		var query = "SELECT * FROM Schedule";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Schedules":rows});
				}
			});
		});
	});

	router.get ("/schedule/id/:id",function(req,res){
		var query = "SELECT * FROM Schedule WHERE Schedule_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Schedule":row});
				}
			});
		});
	});

	router.put ("/schedule/id/:id",function (req,res) {
		var query = "UPDATE Schedule SET Schedule_Name = ?, Schedule_Message = ? WHERE Schedule_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.scheduleName, req.body.scheduleMessage, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Schedule":{"Schedule_Id":req.params.id,"Schedule_Name":req.body.scheduleName,"Schedule_Message":req.body.scheduleMessage}});
				}
			});	
		});
	});

	router.delete ("/schedule/id/:id",function (req,res) {
		var query = "DELETE FROM Schedule WHERE Schedule_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});


	/*** SCHEDULE USERS
	{"scheduleUserId":1,"userId":"1"}	
	{
      "Schedule_User_Id": "1",
      "User_Id": "1"
    }
    ***/
	router.post ("/scheduleuser",function (req,res) {
		var query = "INSERT INTO Schedule_User (Schedule_User_Id, User_Id) VALUES (?,?)";
		db.serialize(function () {
			db.prepare (query).run (req.body.scheduleUserId, req.body.userId).finalize (function (err,row){
				if(err) {
					res.json ({"Message":"Failure"});
				}else{
					res.json ({"Message":"Success","Schedule_User":{"Schedule_User_Id":req.body.scheduleUserId,"User_Id":req.body.userId}});
				}
			});	
		});
	});

	router.get ("/scheduleusers",function (req,res) {
		var query = "SELECT * FROM Schedule_User";
		db.serialize (function () {
			db.all (query,function (err,rows) {
				if (err) {
					res.json({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Schedule_Users":rows});
				}
			});
		});
	});

	router.get ("/scheduleuser/id/:id",function(req,res){
		var query = "SELECT * FROM Schedule_User WHERE Schedule_User_Id = ?";
		db.serialize (function () {
			db.all (query, req.params.id, function (err, row) {
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Schedule_User":row});
				}
			});
		});
	});

	router.put ("/scheduleuser/id/:id",function (req,res) {
		var query = "UPDATE Schedule_User SET User_Id = ? WHERE Schedule_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.body.userId, req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success","Schedule_User":{"Schedule_User_Id":req.params.id,"User_Id":req.body.userId}});
				}
			});	
		});
	});

	router.delete ("/scheduleuser/id/:id",function (req,res) {
		var query = "DELETE FROM Schedule_User WHERE Schedule_User_Id = ?";
		db.serialize(function () {
			db.prepare (query).run (req.params.id).finalize (function (err,row){
				if (err) {
					res.json ({"Message":"Failure"});
				} else {
					res.json ({"Message":"Success"});
				}
			});	
		});
	});
}

module.exports = REST_ROUTER;