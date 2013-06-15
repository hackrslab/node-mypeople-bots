var Receiver = require('mypeople').Receiver;
var Client = require('mypeople').Client;
var key = process.env.MYPEOPLE_KEY;
if (process.argv.length > 2) {
  key = process.argv[2];
}
if (key == null) {
  console.error('You need to provide your mypeople bot key');
  process.exit(1);
}

var client = new Client(process.argv[2]);
var receiver = new Receiver(process.argv[2]);

receiver.addListener('message', function(m) {
  if (m.group.id) {
    client.sendGroupMessage(m.group.id, m.message);
  } else {
    client.sendMessage(m.user.id, m.message);
  }
});

receiver.addListener('new invite', function(m) {
  client.sendGroupMessage(m.group.id, 'Why invite me?');
});

receiver.addListener('kick', function(m) {
  client.sendMessage('Why kick me?');
});

receiver.addListener('need help', function(m) {
  if (m.group.id) {
    client.sendGroupMessage(m.group.id, 'Why?');
  } else {
    client.sendMessage(m.user.id, 'Why?');
  }
});

receiver.start();
