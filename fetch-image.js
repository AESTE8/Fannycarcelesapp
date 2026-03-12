const https = require('https');

https.get('https://www.iadfrance.fr/conseiller-immobilier/fanny.carceles', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/<img[^>]+src="([^">]+\/fanny-carceles[^">]+)"/i) || data.match(/<img[^>]+src="([^">]+)"[^>]*alt="[^"]*Fanny Carceles[^"]*"/i);
    if (match) {
      console.log('Found image URL:', match[1]);
    } else {
      console.log('Image not found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
