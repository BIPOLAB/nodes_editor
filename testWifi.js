//const wifi = require('node-wifi');

//wifi.init({ iface: null });

//wifi.getCurrentConnections()
  //.then(list => {
    //console.log('Conexiones:', list);
  //})
  //.catch(e => {
    //console.error('Error:', e);
  //});

  const wifi = require('wifi-control');
wifi.init({ debug: true });
console.log(wifi. getIfaceState());

