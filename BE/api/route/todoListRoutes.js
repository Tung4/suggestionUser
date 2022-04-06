module.exports = function(app) {
    var todoList = require('../controller/todoListController');

    app.route('/items')
        .get(todoList.list_all_items)
}