
<h1 align="center">Gympass API</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jtiagosantos/gympass-api?color=%green">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jtiagosantos/gympass-api?color=blue">
  <a href="https://github.com/jtiagosantos/gympass-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jtiagosantos/gympass-api?color=purple">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=orange">
   <a href="https://github.com/jtiagosantos/gympass-api/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/jtiagosantos/gympass-api?style=social">
  </a>
</p>

<h4 align="center"> 
  🚧 Gympass API 💪🏼 Completed 🚀 🚧
</h4>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-run-project">Run Project</a> • 
  <a href="#-run-tests">Run Tests</a> • 
  <a href="#-technologies">Technologies</a> • 
  <a href="#-author">Author</a> • 
  <a href="#-license">License</a>
</p>

<br>

## 📝 Overview

### Functional Requirements

- [x] It should be possible to register.
- [x] It should be possible to authenticate.
- [x] It should be possible to retrieve the profile of a logged-in user.
- [x] It should be possible to retrieve the number of check-ins performed by the logged-in user.
- [x] It should be possible for the user to retrieve their check-in history.
- [x] It should be possible for the user to search for nearby gyms (up to 10km).
- [x] It should be possible for the user to search for gyms by name.
- [x] It should be possible for the user to check-in at a gym.
- [x] It should be possible to validate a user's check-in.
- [x] It should be possible to register a gym.

### Business Rules

- [x] The user should not be able to register with a duplicate email.
- [x] The user cannot make 2 check-ins on the same day.
- [x] The user cannot check-in if they are not near (100m) the gym.
- [x] The check-in can only be validated up to 20 minutes after it was created.
- [x] The check-in can only be validated by administrators.
- [x] The gym can only be registered by administrators.

### Non-functional Requirements

- [x] The user's password needs to be encrypted.
- [x] The application data needs to be persisted in a PostgreSQL database.
- [x] All data lists need to be paginated with 20 items per page.
- [x] The user should be identified by a JSON Web Token (JWT).

<br>

## 🚀 Run Project

1️⃣ Clone o projeto e acesse sua pasta:

```bash
$ git clone https://github.com/jtiagosantos/gympass-api.git
$ cd gympass-api
```

2️⃣ Instale as dependências:

```bash
$ npm i
```

3️⃣ Inicie o banco de dados:

```bash
$ docker-compose up -d
```

4️⃣ Defina as variáveis de ambiente:

```bash
NODE_ENV="development"

# Auth
JWT_SECRET=""

# Database
DATABASE_URL=""
```

5️⃣ Execute as migrations:

```bash
$ npx prisma db push
```

6️⃣ Inicie o servidor:

```bash
$ npm run dev
```

<br>

## ⚡ Run Tests

✅ Testes unitários (execução única):

```bash
$ npm run test
```

✅ Testes unitários (modo watch):

```bash
$ npm run test:watch
```

✅ Testes E2E (execução única):

```bash
$ npm run test:e2e
```

✅ Testes E2E (modo watch):

```bash
$ npm run test:e2e:watch
```

✅ Cobertura:

```bash
$ npm run test:coverage
```

<br>

## 🛠 Technologies

The following tools were used in the construction of project:

- **[Node.js](https://nodejs.org/en)**
- **[Typescript](https://www.typescriptlang.org/)**
- **[Fastify](https://www.fastify.io/)**
- **[Prisma](https://www.prisma.io/docs)**
- **[Postgres](https://www.postgresql.org/)**
- **[Zod](https://github.com/colinhacks/zod)**
- **[Tsx](https://www.npmjs.com/package/tsx)**
- **[Tsup](https://tsup.egoist.dev/)**
- **[Vitest](https://vitest.dev/)**
- **[DayJs](https://day.js.org/)**
- **[BcryptJs](https://www.npmjs.com/package/bcryptjs)**
- **[SuperTest](https://www.npmjs.com/package/supertest)**
- **[Fastify Cookie](https://www.npmjs.com/package/@fastify/cookie)**
- **[Fastify JWT](https://www.npmjs.com/package/@fastify/jwt)**

<br>

## 👨‍💻 Author

<img src="https://avatars.githubusercontent.com/u/63312141?v=4" width="100" alt="Tiago Santos" style="border-radius: 50px;" />

<strong><a href="https://github.com/jtiagosantos">Tiago Santos </a>🚀</strong>

[![Linkedin Badge](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/jos%C3%A9-tiago-santos-de-lima-aaa4361a4/)](https://www.linkedin.com/in/josetiagosantosdelima/)
[![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tiago.santos@icomp.ufam.edu.br)

<br>

## 📝 License

This project is under license [MIT](./LICENSE).
