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

    // 일반 로그인 아이디 체크
    /*const ArknightsLogin = function(req, res){
        const sql = 'SELECT * FROM userdata WHERE user_email=? AND password=?';
        const params = [req.query.email, req.query.password];
        
        console.log('Request[Check] : ' + req.query.email);
        CheckArknightsLoginData(res, sql, params);
    }

    /// Send Module ///

    const CheckArknightsLoginData = function(res, sql, params){
        con.query(sql, params, function (error, results, fields) {
            if(results == ''){
                console.log('Result[Check] : fail');
                res.send('check_fail');
            }
            else{     
                console.log('Result[Check] : success');
                let id = "";
                id += results[0].user_id;
                res.send(id);
            }
        });
    }
    
    */
    /// GET, POST ///

    //app.get('/CheckArknightsEmail', ArknightsLogin);
}