const { json } = require('body-parser');

module.exports = function(app){
    const mysql = require('mysql');
    const dbData = require('./dbData');
    const con = mysql.createConnection(dbData);
    const fs = require('fs');
    
    app.get('/', function(req, res, next){
        res.send('CrusadersQuest Server Page');
        console.log('Connect Page');
    });

    /// Router Module ///

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
        SendUpdateTeamResult(res, sql, params);
    }

    /// Send Module ///
    
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

    const SendUpdateTeamResult = function(res, sql, params){
        con.query(sql, params, function (error, results, fields){
            if(error){
                console.log(error);
                res.send('fail');
            }
            else{     
                console.log('Result[UpdateTeam] : success');
                res.send('success');
            }
        });
    }

    /// GET, POST ///
    
    app.get('/UserData', UserData);
    app.get('/SoldierList', SoldierList);
    app.get('/UpdateTeam', UpdateTeam);
}