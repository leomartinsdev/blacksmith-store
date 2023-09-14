import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';

import app from '../../../src/app'
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('It is possible to create a product', async function () {
    // Arrange
    const httpRequest = productsMock.httpRequestBody;
    const mockCreate = ProductModel.build(productsMock.productFromService);
    sinon.stub(ProductModel, 'create').resolves(mockCreate);

    // Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest);

    // Assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.deep.equal(productsMock.productFromService)
  });
});
