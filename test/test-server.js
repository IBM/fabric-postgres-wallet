const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('config');
const server = require('../server/server');
chai.use(chaiHttp);

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const url = `http://${host}:${port}`;



describe('Testing Server', () => {

  describe('/health', () => {
    
    it('should get status UP', async () => {

      const res = await chai.request(url).get('/api/health');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.status).to.equal('UP');
    });
  });

  describe('/doesnotexist', () => {
    it('should return 404', async () => {
      const res = await chai.request(url).get('/api/doesnotexist')
      expect(res.status).to.equal(404);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.equal(false);
    });
  });

  describe('/', () => {
    it('should redirect to /api-docs', async () => {
      const res = await chai.request(url).get('/');
      expect(res).to.redirectTo(`${url}/api-docs`);
      expect(res.status).to.equal(200);
    });
  });



});