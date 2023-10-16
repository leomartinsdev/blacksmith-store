# Blacksmith Store API ⚔️
Projeto onde foi desenvolvido o back-end (no formato de uma RESTful API) de uma loja de itens medievais.
<br>
O projeto foi feito utilizando TypeScript, Express como framework para Node.js, Sequelize (ORM) e MySQL para administração do banco de dados.

## Feito com 👨‍💻:
- TypeScript
- Sequelize
- Express
- MySQL
- JWT
- bcrypt
- Joi
- Testes de integração com Jest | Mocha | Chai | Sinon

## Como rodar o projeto:
1)  Clone o repositório;
2)  Entre no diretório do projeto;
3)  No terminal: `npm install`;
4)  Com Docker:
      - Abra o terminal e rode: `docker-compose up -d --build`
      - Também no terminal: `npm run db:reset`
  
## Rodando os testes:
1)  Para rodar os testes: `npm run test:local`
2)  Para verificar a cobertura dos testes: `npm run test:coverage`
