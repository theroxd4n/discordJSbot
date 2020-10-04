const moment = require('moment')
const PriorityQueue = require("./PriorityQueue");
const checkQueue = (reminderQueue) => {
    console.log(reminderQueue)
    var newQueue = new PriorityQueue(reminderQueue);

    while (true) {
        var now = moment().toDate();
        if (!newQueue.isEmpty) {
            var dateNumber = Date.parse(newQueue['items'][0]['element']['date']);
            if (dateNumber <= now.getTime()) {
                console.log('TEST')
                newQueue.dequeue();
            }
        }
        process.send('CAMBIO');
        
    }

}

process.on('message', (reminderQueue) => {

    checkQueue(reminderQueue);

});