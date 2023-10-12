import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../../src/app';
import orderMock from '../../mocks/order.mock';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/login.mock';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/products.mock';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Should create an order', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));
    sinon.stub(ProductModel, 'findByPk')
      .onCall(0).resolves(ProductModel.build(productMock.productsListFromService[0]))
      .onCall(1).resolves(ProductModel.build(productMock.productsListFromService[1]));

    sinon.stub(OrderModel, 'create').resolves(OrderModel.build(orderMock.newOrderFromDB));
    sinon.stub(ProductModel, 'update').resolves([1]);


    const httpResponse = await chai.request(app).post('/orders').send(orderMock.validOrderToCreate).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(orderMock.validOrderToCreate);
  });

  it('Return an error (422 and message) if the request has productIds as an empty array', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.orderEmptyArray).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"productIds" must include only numbers' });
  });

  it('Return an error (422 and message) if the request has no userId', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.orderNoUserId).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" is required' });
  });

  it('Return error if productIds are not valid', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.invalidOrderProductIds).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Some product not found' });
  });
});
