const Datastore = require('nedb');
const db={
  user:new Datastore({filename:"./db/users.db",autoload:true}),
  message:new Datastore({filename:"./db/messages.db",autoload:true}),
  files:new Datastore({filename:"./db/files.db",autoload:true})
}
module.exports=db;
