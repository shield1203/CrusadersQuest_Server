const { json } = require('body-parser');

module.exports = function(app){
    const mysql = require('mysql');
    const dbData = require('./dbData');
    const con = mysql.createConnection(dbData);
    const fs = require('fs');
    
    app.get('/', function(req, res, next){
        res.send('CrusadersQuest Server Page');
    });

    /// Router Module ///

    const SignInGuest = function(req, res){
        let today = new Date();
        
        const year = today.getFullYear().toString();
        const month = (today.getMonth() + 1).toString();
        const date = today.getDate().toString();
        const hours = today.getHours().toString();
        const minutes = today.getMinutes().toString();
        const seconds = today.getSeconds().toString();
        const userKey = year + month + date + hours + minutes + seconds;

        const sql = 'INSERT INTO user (user_key) VALUES(?)';
        const params = [userKey];

        SignIn(res, sql, params, userKey);
    }

    const UserId = function(res, key){
        const sql = 'SELECT user_id FROM user WHERE user_key=?';
        const params = [key];

        console.log('Request[UseId] : ' + key);
        SendUserId(res, sql, params, key);
    }

    const UserData = function(req, res){
        const sql = 'SELECT lv, exp, name, honor, diamond, gold, meat FROM user WHERE user_id=?';
        const params = [req.query.userId];

        console.log('Request[UserData] : ' + req.query.userId);
        SendUserData(res, sql, params);
    }

    const SoldierList = function(req, res){
        const sql = 'SELECT * FROM soldier WHERE fk_user_id=?';
        const params = [req.query.userId];
        
        console.log('Request[SoldierList] : ' + req.query.userId);
        SendSoldierList(res, sql, params);
    }
    
    const UpdateTeam = function(req, res){
        const sql = 'UPDATE soldier SET team=? WHERE soldier_id=? AND fk_user_id=?';
        const params = [req.query.isTeam, req.query.soldierId, req.query.userId];

        console.log('Request[UpdateTeam] : ' + req.query.userId);
        SendUpdateResult(res, sql, params);
    }

    const UpdateUserExp = function(req, res){
        const sql = 'UPDATE user SET lv=?, exp=? WHERE user_id=?';
        const params = [req.query.lv, req.query.exp, req.query.userId];

        console.log('Request[UpdateUserExp] : ' + req.query.userId);
        SendUpdateResult(res, sql, params);
    }

    const UpdateSoldierExp = function(req, res){
        const sql = 'UPDATE soldier SET level=?, exp=? WHERE soldier_id=? AND fk_user_id=?';
        const params = [req.query.lv, req.query.exp, req.query.soldierId, req.query.userId];

        console.log('Request[UpdateSoldierExp] : ' + req.query.userId);
        SendUpdateResult(res, sql, params);
    }

    /// Send Module ///
    
    const SignIn = function(res, sql, params, key){
        con.query(sql, params, function (error, results, fields) {
            if(error){
                console.log('Result[SignIn] : fail');
                res.send('fail');
            }
            else{     
                UserId(res, key);
            }
        });
    }

    const SendUserId = function(res, sql, params){
        con.query(sql, params, function (error, results, fields) {
            if(results == ''){
                console.log('Result[UserData] : fail');
                res.send('fail');
            }
            else{     
                console.log('Result[UserId] : success');
                
                var id = '';
                id += results[0].user_id;
                res.send(id);
            }
        });
    }

    const SendUserData = function(res, sql, params){
        con.query(sql, params, function (error, results, fields) {
            if(results == ''){
                console.log('Result[UserData] : fail');
                res.send('fail');
            }
            else{     
                console.log('Result[UserData] : success');
                res.send(results);
            }
        });
    }

    const SendSoldierList = function(res, sql, params){
        con.query(sql, params, function (error, results, fields) {
            if(results == ''){
                console.log('Result[SoldierList] : fail');
                res.send('fail');
            }
            else{     
                console.log('Result[SoldierList] : success');
                res.send(results);
            }
        });
    }

    const SendUpdateResult = function(res, sql, params){
        con.query(sql, params, function (error, results, fields){
            if(error){
                console.log(error);
                res.send('fail');
            }
            else{     
                console.log('Result[UpdateResult] : success');
                res.send('success');
            }
        });
    }

    /// GET, POST ///
    
    app.get('/SignInGuest', SignInGuest);
    app.get('/UserData', UserData);
    app.get('/SoldierList', SoldierList);
    app.get('/UpdateTeam', UpdateTeam);
    app.get('/UpdateUserExp', UpdateUserExp);
    app.get('/UpdateSoldierExp', UpdateSoldierExp);
}