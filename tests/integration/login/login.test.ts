import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';

import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Ao não receber um username, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.noUserLoginBody;

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Arrange
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' })
  })

  it('Ao não receber um password, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.noPasswordLoginBody;

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Arrange
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' })
  })

  it('Ao receber username inexistente, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.notExistingUserBody;
    sinon.stub(UserModel, 'findOne').resolves(null);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Arrange
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' })
  })

  it('Ao receber username existente e uma senha errada, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.existingUserWithWrongPassBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Arrange
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' })
  })

  it('Ao receber username existene e uma senha certa, retorne um token', async function () {
    // Arrange
    const httpRequestBody = loginMock.validLoginBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Arrange
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  })
});
