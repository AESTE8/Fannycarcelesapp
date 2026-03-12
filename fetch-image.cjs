const https = require('https');

https.get('https://www.iadfrance.fr/conseiller-immobilier/fanny.carceles', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^">]+)"[^>]*alt="[^"]*Fanny Carceles[^"]*"/gi);
    if (matches) {
      console.log('Found images:', matches);
    } else {
      console.log('Image not found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
