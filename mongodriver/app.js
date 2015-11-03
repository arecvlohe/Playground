var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = "mongodb://localhost:27017/MongoDriver";

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected to server');

  insertDocs(db, function() {
    updateDocs(db, function() {
      deleteDocs(db, function() {
        findDocs(db, function() {
          db.close();
        });
      });
    });
  });
});

function insertDocs(db, callback) {
  var collection = db.collection('docs');
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Inserted 3 documents into docs collection');
    callback(result);
  });
}

function updateDocs(db, callback) {
  var collection = db.collection('docs');
  collection.updateOne({a:2},{ $set: {b:1} }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log('Updated doc that had a equal to 2');
    callback(result);
  });
}

function deleteDocs(db, callback) {
  var collection = db.collection('docs');
  collection.deleteOne({a: 3}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log('Removed doc that had a equal to 3');
    callback(result);
  });
}

function findDocs(db, callback) {
  var collection = db.collection('docs');
  collection.find({}).toArray(function(err, doc) {
    assert.equal(err, null);
    assert.equal(2, doc.length); console.log('Found the following docs');
    console.dir(doc);
    callback(doc);
  });
}
