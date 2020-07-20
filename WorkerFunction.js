const express = require('express');//רפרנס למחלקה
const router = express.Router()// מופע של המחלקה
const fs = require('fs');
var dateTime = require('node-datetime')
const MongoClient = require('mongodb').MongoClient;
var worker = require('./Worker');
const url = 'mongodb://localhost:27017';
const dbName = 'WorkerDB';
var w = new worker();


//קבלת פרטי עובד לפי ת"ז
router.post('/getWorkerByID', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    col.findOne({ WorkerID: req.body.WorkerID }, function (err, result) {
      if (err) {
        res.send('ארעה שגיאה נסה שוב');
      }
      else {
        w = result;
        res.send(result);
      }
    });
  });
});


//הוספת עובד
router.post('/addWorker', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    req.body.isActive=true;
    col.insertOne(req.body, function (err, result) {
      if (err) {
        console.log(err)
        res.status(500);
        res.send('ארעה איזשהי שגיאה נסה שוב');
      } else {
        res.send('נרשמת בהצלחה');
        newWorker=req.body;
        fs.readFile('employeeFile.json','utf-8', (err, buffer) => {
          if (err) return console.error('File read error: ', err)
          var newValue = buffer.slice(0, buffer.length-1);
          newValue+=',';
          newValue+=JSON.stringify(newWorker);
          newValue+=']';
          fs.writeFile("employeeFile.json", newValue, err => {
          if (err) return console.error('File write error:', err);
          else{console.log("write");}
          
          });
          });
      }
    });
  });
});

//מחיקת עובד
router.post('/deletWorkerByID', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    var newValues = { $set: {isActive:false } };
    col.updateOne(req.body,newValues, function (err, result) {
      if (err) {
        console.log(err)
        res.status(500);
        res.send('ארעה שגיאה נסה שוב');
      } else {
        res.send(' עובד בעל ת"ז מספר '+req.body.WorkerID+" נמחק ");
      }
    });
  });
});
//מספרי פלאפון ושם
router.post('/getNamesAndFhone', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    col.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
    });
  });

//עדכון עובד
  router.post('/UpdateW', function (req, res) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      const col = client.db(dbName).collection('Workers');
      //var newValues = req.body;
      var newValues = { $set: {WorkerID:req.body.WorkerID, WorkerFName:req.body.WorkerFName, WorkerLName:req.body.WorkerLName, WorkerAddres:req.body.WorkerAddres,WorkerFhone:req.body.WorkerFhone,WorkerMail:req.body.WorkerMail} };
      col.updateOne(w,newValues, function (err, result) {
        if (err) {
          console.log(err)
          res.status(500);
          res.send('ארעה שגיאה נסה שוב');
        } else {
          res.send(' עובד בעל ת"ז מספר '+req.body.WorkerID+" עודכן ");
        }
      });
    });
  });

  //הוספת שעת נוכחות
  router.post('/addp', function (req, res) {
    // var obj = {
    //   table: []
    // };
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      const col = client.db(dbName).collection('Presence');
      req.body.date=new Date(req.body.date);
      col.insertOne(req.body, function (err, result) {
        if (err) {
          console.log(err)
          res.status(500);
          res.send('ארעה שגיאה נסה שוב');
        } else {
          res.send('נוסף בהצלחה');
          fs.exists(req.body.WorkerIdP, function (exists) {
            //var str="id:"+req.body.WorkerIdP+" date: "+req.body.date+" start: "+req.body.start+" end: "+req.body.end+"/n";
            var dt = dateTime.create(req.body.date);
            var formatted = dt.format('m/d/Y H:M:S');
            req.body.date=formatted;
            var str=JSON.stringify(req.body);
              fs.appendFile(req.body.WorkerIdP,str, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
        });
           
        }
      });
    });
  });
  //קבלת שעות נוכחות לפי תז
  router.post('/getPBiId', function (req, res) {
    if (fs.existsSync(req.body.WorkerIdP)) {
      var array = fs.readFileSync(req.body.WorkerIdP).toString().split('\n');
    if(array=="")
    {
      res.send("אין שעות נוכחות")
    }
    else{
      res.send(array);}
    }
    else
    {
      res.send("אין שעות נוכחות")
    }
 
  });


module.exports = router;