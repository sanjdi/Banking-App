import request from 'supertest';
import { app } from '../src/app.js';

describe('Term deposit final balance API tests', () => {
  describe('GET /api/calculators/term-deposits', () => {
    it('responds with a json message', (done) => {
      request(app)
        .get(
          '/api/calculators/term-deposits?amount=10000&rate=1.1&term=54&compound=MONTHLY&yield=RE_INVEST'
        )
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10507 } }, done);
    });

    it('responds with a json message', (done) => {
      request(app)
        .get(
          '/api/calculators/term-deposits?amount=10000&rate=1.1&term=54&compound=QUATERLY&yield=RE_INVEST'
        )
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10507 } }, done);
    });

    it('responds with a json message', (done) => {
      request(app)
        .get(
          '/api/calculators/term-deposits?amount=10000&rate=1.1&term=54&compound=ANNUALLY&yield=RE_INVEST'
        )
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10506 } }, done);
    });

    it('responds with a json message', (done) => {
      request(app)
        .get(
          '/api/calculators/term-deposits?amount=10000&rate=1.1&term=54&compound=AT_MATURITY&yield=RE_INVEST'
        )
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10495 } }, done);
    });
  });

  describe('POST /api/calculators/term-deposits', () => {
    it('responds with a json message', (done) => {
      request(app)
        .post('/api/calculators/term-deposits')
        .send({
          amount: 10000,
          rate: 1.1,
          term: 36,
          compound: 'MONTHLY',
          yield: 'RE_INVEST',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10335 } }, done);
    });

    it('responds with a json message', (done) => {
      request(app)
        .post('/api/calculators/term-deposits')
        .send({
          amount: 10000,
          rate: 1.1,
          term: 36,
          compound: 'QUATERLY',
          yield: 'RE_INVEST',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10335 } }, done);
    });

    it('responds with a json message', (done) => {
      request(app)
        .post('/api/calculators/term-deposits')
        .send({
          amount: 10000,
          rate: 1.1,
          term: 36,
          compound: 'ANNUALLY',
          yield: 'RE_INVEST',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10334 } }, done);
    });

    it('responds with a json message', (done) => {
      request(app)
        .post('/api/calculators/term-deposits')
        .send({
          amount: 10000,
          rate: 1.1,
          term: 36,
          compound: 'AT_MATURITY',
          yield: 'RE_INVEST',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'OK', data: { finalBalance: 10330 } }, done);
    });
  });
});
