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

    const SoldierList = function(req, res){
        const sql = 'SELECT * FROM soldier WHERE fk_user_id=?';
        const params = [req.query.userId];
        
        console.log('Request[SoldierList] : ' + req.query.userId);
        SendSoldierList(res, sql, params);
    }
    
    const UpdateTeam = function(req, res){
        const sql = 'UPDATE soldier SET team=? WHERE soldier_id=? AND fk_user_id=?';
        const params = [req.query.isTeam, req.query.soldierId, req.query.userId];

        con.query(sql, params, function (error, results, fields){
            if(error){
                console.log(error);
                res.send('fail');
            }
            else{     
                console.log('Request[UpdateTeam] : ' + req.query.userId);
                res.send('success');
            }
        });
    }

    /// Send Module ///

    const SendSoldierList = function(res, sql, params){
        con.query(sql, params, function (error, results, fields) {
            if(results == ''){
                console.log('Result[Check] : fail');
                res.send('fail');
            }
            else{     
                console.log('Result[Check] : success');
                console.log(results);
                res.send(results);
            }
        });
    }

    /// GET, POST ///
    
    app.get('/SoldierList', SoldierList);
    app.get('/UpdateTeam', UpdateTeam);
}