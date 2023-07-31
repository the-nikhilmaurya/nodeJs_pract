'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('employees',{
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      fname: { type: 'string', notNull: true },
      lname: { type: 'string', notNull: true },
      dob: { type: 'date' },
      married: { type: 'boolean', defaultValue: false },
      department: { type: 'string', length: 100 },
      salary: { type: 'int', notNull: true },

  });
};

exports.down = function(db) {
  return db.dropTable('employees');
};

exports._meta = {
  "version": 1
};
