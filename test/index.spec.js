const http = require('http');
const { Server } = require('node-static');
require('expect-puppeteer');

const port = 3002;
const url = `http://localhost:${port}/test/`;

let server;

describe('decode-audio-data-fast tests in headless browser', () => {
  let onPageError;
  beforeAll(async () => {
    const staticServer = new Server('..');
    server = http
      .createServer((req, res) => staticServer.serve(req, res))
      .listen(port);

    onPageError = jest.fn();
    page.on('pageerror', onPageError);
    await page.goto(url);
    await page.waitFor(4000);
  });

  it('should no throw any error', async () => {
    await expect(onPageError).not.toBeCalled();
  });

  afterAll(() => server.close());
});
