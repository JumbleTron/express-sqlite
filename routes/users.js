var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', async function (req, res, next) {
  const db = new sqlite3.Database('db.sql');
  const data = await new Promise((resolve, reject) => {
    const list = [];
    db.all("SELECT rowid AS id, info FROM lorem", function (err, rows) {
      if (err) return reject(err);
      rows.forEach(function (row) {
        list.push({id: row.id});
        resolve(list);
      });
    })
  })
  
  res.end(JSON.stringify(data))
});
router.post('/', function(req, res, next) {
  res.end(JSON.stringify({'msg': "Hello from users"}))
});

module.exports = router;
