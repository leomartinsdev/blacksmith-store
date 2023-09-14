import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';

import app from '../../../src/app'
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('It is possible to list all products', async function () {
    // Arrange -> Cada item do array precisa ser buildado pela model para que ele tenha os atributos necessários.
    sinon.stub(ProductModel, 'findAll').resolves(
      productsMock.productsListFromService.map((product) => ProductModel.build(product))
    );
    
    // Act
    const httpResponse = await chai.request(app).get('/products');

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(productsMock.productsListFromService)
  });

});
