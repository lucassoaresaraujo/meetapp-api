# meetapp-api
API REST para o meetapp: app agregador de eventos para desenvolvedores.

Projeto desenvolvido como resposta ao [desafio](https://github.com/Rocketseat/bootcamp-gostack-desafio-03) do Bootcamp da RocketSeat,

## Tecnologias utilizadas
-  [Node.js](https://nodejs.org/en/)
-  [Express](https://expressjs.com/)
-  [nodemon](https://nodemon.io/)
-  [Sucrase](https://github.com/alangpierce/sucrase)
-  [Docker](https://www.docker.com/docker-community)
-  [Sequelize](http://docs.sequelizejs.com/)
-  [PostgreSQL](https://www.postgresql.org/)
-  [node-postgres](https://www.npmjs.com/package/pg)
-  [Redis](https://redis.io/)
-  [JWT](https://jwt.io/)
-  [Multer](https://github.com/expressjs/multer)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)
-  [Youch](https://www.npmjs.com/package/youch)
-  [Yup](https://www.npmjs.com/package/yup)
-  [Bee Queue](https://www.npmjs.com/package/bcrypt)
-  [Nodemailer](https://nodemailer.com/about/)
-  [date-fns](https://date-fns.org/)
-  [DotEnv](https://www.npmjs.com/package/dotenv)

## Guia de uso do projeto
 1. Baixe o projeto para sua máquina
 2. No terminal, digite o comando `yarn` para baixar as dependências.
 3. Crie o arquivo .env baseado no .env.example
 4. Inicie os sevidores do postgres e redis com as configurações adicionadas no passo anterior.
 5. Caso necessário, use o [mailtrap](https://mailtrap.io/) para simulação de emails.
 6. Inicie o servidor do node: `yarn dev` e a fila `yarn queue`
