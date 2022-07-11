const { myServer, Router, serveFile } = require('myserver');
const bodyParser = require('myserver-bodyparser');
const fs = require('fs');

const router = new Router();
const server = myServer(router);

router.use(bodyParser);

router.get('/public', serveFile);

router.post('/upload', (req, res) => {
  const [file] = req.body.files;
  fs.writeFile(`./uploadFiles/test-${file.filename}`, file.buffer, (err) => {
    res.send('uploaded');
  });
});

const PORT = 3000;

server.listen(PORT, () => console.log('server is running on', PORT));
