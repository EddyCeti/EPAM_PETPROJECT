'use strict'
const app  = require('../server/server');
const ds = app.dataSources.mysqlDs;

ds.automigrate(['product'],(err) => {
    if(err){
        throw err;
    }
    console.log('models created!');
    ds.disconnect();
})