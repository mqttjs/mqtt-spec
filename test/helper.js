global.port = 9000;

if(process.env['PORT']) {
  global.port = process.env['PORT'];
}

global.speed = 0.01;

if(process.env['NORMAL_SPEED']) {
  global.speed = 1;
}
