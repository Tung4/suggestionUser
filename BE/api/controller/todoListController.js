var Items = require('../model/Item');

exports.list_all_items = function(req,res){
  res.json(Items);
}
