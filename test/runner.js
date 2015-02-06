var spec = require('../index');

spec.setup({
  port: process.env['PORT'],
  host: process.env['HOST']
});

spec.registerMochaTests();
