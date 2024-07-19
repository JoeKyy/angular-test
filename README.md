
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

### Configurar JSON Server

Para simular uma API REST para o serviço de autenticação, utilizamos o json-server.

Inicie o json-server:

```sh
json-server --watch db.json --port 3004
```

Certifique-se de que o arquivo `db.json` está no diretório raiz do serviço de autenticação com o seguinte conteúdo:

```json
{
  "users": [
    {
      "id": 1,
      "username": "test",
      "password": "test"
    }
  ]
}
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
- `src/app/services`: Contém serviços como `auth.service.ts`, `charge.service.ts`, e `renegotiation.service.ts`.
- `src/app/modules`: Contém módulos do Angular e componentes compartilhados.

### Backend

#### Serviço de Autenticação

- `src/app.js`: Arquivo principal da aplicação.

#### Serviço de Cobrança

- `src/app.js`: Arquivo principal da aplicação.

#### Serviço de Renegociação

- `src/app.js`: Arquivo principal da aplicação.

## Implementação na AWS

Este projeto é uma aplicação full-stack composta por um frontend em Angular e vários serviços backend em Node.js. O objetivo principal do projeto é gerenciar autenticação de usuários, cobranças e renegociações. Para hospedar e gerenciar esta aplicação na AWS, podemos utilizar uma combinação de vários serviços da AWS para garantir escalabilidade, segurança e facilidade de manutenção.

### Estrutura do Projeto na AWS:

A estrutura do projeto na AWS pode ser dividida da seguinte forma:

#### Frontend
  - **S3 (Simple Storage Service)**: Para hospedar a aplicação Angular estática.
  - **CloudFront**: Para fornecer CDN (Content Delivery Network) e HTTPS.

#### Backend
  - **API Gateway**: Para gerenciar as APIs e rotear as solicitações para os serviços backend.
  - **AWS Lambda**: Para hospedar os serviços backend de autenticação, cobrança e renegociação sem precisar gerenciar servidores.
  - **DynamoDB**: Para armazenamento de dados NoSQL, adequado para armazenar informações de usuários, cobranças e renegociações.
  
  ##### Autenticação:
  - **Cognito**: Para gerenciar a autenticação de usuários, permitindo autenticação segura e escalável.
  
  ##### **Infraestrutura e Configuração**:
  - **CloudFormation**: Para gerenciar a infraestrutura como código.
  - **IAM (Identity and Access Management)**: Para gerenciar permissões e segurança.
  - **CloudWatch**: Para monitoramento e logging dos serviços.

___
