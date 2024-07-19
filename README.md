
# i-test

## Descrição do Projeto

Este projeto é uma aplicação full-stack composta por um frontend em Angular e vários serviços backend em Node.js. O objetivo principal do projeto é gerenciar autenticação de usuários, cobranças e renegociações.

## Estrutura do Projeto

A estrutura do projeto é dividida da seguinte forma:

- **frontend**: Aplicação Angular para o frontend.
- **back**: Contém três serviços backend:
  - **auth-service**: Serviço de autenticação.
  - **charge-service**: Serviço de cobrança.
  - **renegotiation-service**: Serviço de renegociação.

## Instalação

Para começar com o projeto, siga estes passos:

### Pré-requisitos

- Node.js (v14 ou superior)
- Angular CLI

### Clonar o Repositório

```sh
git clone https://github.com/JoeKyy/i-test.git
cd i-test
```

### Instalar Dependências

#### Frontend

```sh
cd front
npm install
```

#### Backend

```sh
cd back/auth-service
npm install

cd ../charge-service
npm install

cd ../renegotiation-service
npm install
```

## Execução do Projeto

### Iniciar os Serviços de Backend

Cada serviço de backend pode ser iniciado individualmente:

#### Serviço de Autenticação

```sh
cd back/auth-service
npm start
```

#### Serviço de Cobrança

```sh
cd ../charge-service
npm start
```

#### Serviço de Renegociação

```sh
cd ../renegotiation-service
npm start
```

### Iniciar o Frontend

```sh
cd front
npm start
```

## Testes

### Backend

Para executar os testes dos serviços de backend:

#### Serviço de Autenticação

```sh
cd back/auth-service
npm test
```

#### Serviço de Cobrança

```sh
cd ../charge-service
npm test
```

#### Serviço de Renegociação

```sh
cd ../renegotiation-service
npm test
```

### Frontend

Para executar os testes do frontend:

```sh
cd front
npm test
```

## Estrutura de Código

### Frontend

- `src/app/pages`: Contém as principais páginas como login e páginas protegidas.
- `src/app/services`: Contém serviços como \`auth.service.ts\`, \`charge.service.ts\`, e \`renegotiation.service.ts\`.
- `src/app/modules`: Contém módulos do Angular e componentes compartilhados.

### Backend

#### Serviço de Autenticação

- `src/app.js`: Arquivo principal da aplicação.

#### Serviço de Cobrança

- `src/app.js`: Arquivo principal da aplicação.

#### Serviço de Renegociação

- `src/app.js`: Arquivo principal da aplicação.

---
