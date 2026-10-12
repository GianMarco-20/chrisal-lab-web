const http = require('http');

const req = http.request({
  hostname: 'localhost', port: 3000, path: '/auth/login', method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const token = JSON.parse(data).accessToken;
    http.request({
      hostname: 'localhost', port: 3000, path: '/citas', method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    }, res2 => {
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => console.log('Response:', data2));
    }).end();
  });
});
req.write(JSON.stringify({ nombreUsuario: 'admin', password: 'password' }));
req.end();
