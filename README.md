
# angular-test

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
git clone https://github.com/JoeKyy/angular-test.git
cd angular-test
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

Certifique-se de que o arquivo `db.json` está no diretório `db` do back=end com o seguinte conteúdo:

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "password": "123mudar"
    },
    {
      "id": "e61e",
      "username": "joekyy",
      "password": "14091988"
    }
  ],
  "charges": [
    {
      "id": "1",
      "amount": 100,
      "userId": 1
    },
    {
      "id": "2",
      "amount": 150.5,
      "userId": 2
    }
  ],
  "renegotiations": [
    {
      "id": "1",
      "status": "pending",
      "userId": 1
    },
    {
      "id": "2",
      "status": "approved",
      "userId": 2
    }
  ]
}
```

## Configuração dos Arquivos .env

Para configurar as variáveis de ambiente do projeto, siga as etapas abaixo para criar e preencher os arquivos `.env` necessários nos serviços backend.

### Backend

Para cada serviço backend (`auth-service`, `charge-service`, `renegotiation-service`), siga estas etapas:

1. Navegue até o diretório do serviço:

```sh
cd back/auth-service
```

2. Crie um arquivo `.env` na raiz do diretório do serviço:

```sh
touch .env
```

3. Adicione as seguintes variáveis ao arquivo `.env` (exemplo para o `auth-service`):

```sh
AUTH_SECRET_KEY=your_secret_key
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
PORT=3001
```

4. Navegue até o diretório do próximo serviço (`charge-service`):

```sh
cd ../charge-service
```

5. Crie um arquivo `.env` na raiz do diretório do serviço:

```sh
touch .env
```

6. Adicione as seguintes variáveis ao arquivo `.env` para o `charge-service`:

```sh
AUTH_SECRET_KEY=your_secret_key
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
PORT=3002
```

7. Navegue até o diretório do próximo serviço (`renegotiation-service`):

```sh
cd ../renegotiation-service
```

8. Crie um arquivo `.env` na raiz do diretório do serviço:

```sh
touch .env
```

9. Adicione as seguintes variáveis ao arquivo `.env` para o `renegotiation-service`:

```sh
AUTH_SECRET_KEY=your_secret_key
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
PORT=3003
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
- `src/app/models`: Contém modelos de dados de cada serviço.
- `src/app/interceptors`: Contém interceptores HTTP, como `auth.interceptor.ts`, que é responsável por adicionar cabeçalhos de autenticação e credenciais do cliente às requisições HTTP.
- `src/environments`: Contém arquivos de configuração de ambiente, como `environment.ts` e `environment.prod.ts`, onde estão definidas variáveis como URLs das APIs e credenciais do cliente.

### Backend

#### Serviço de Autenticação

- `server.js`: Arquivo que inicia o servidor da aplicação.
- `src/app.js`: Arquivo principal da aplicação.
- `src/controllers`: Contém os controladores como authController.js.
- `src/middlewares`: Contém os middlewares como tokenMiddleware.js.
- `src/services`: Contém os serviços como authService.js
- `src/routes`: Contém as rotas como authRoutes.js

#### Serviço de Cobrança

- `server.js`: Arquivo que inicia o servidor da aplicação.
- `src/app.js`: Arquivo principal da aplicação.
- `src/controllers`: Contém os controladores como chargeController.js.
- `src/middlewares`: Contém os middlewares como tokenMiddleware.js.
- `src/services`: Contém os serviços como chargeService.js
- `src/routes`: Contém as rotas como chargeRoutes.js

#### Serviço de Renegociação

- `server.js`: Arquivo que inicia o servidor da aplicação.
- `src/app.js`: Arquivo principal da aplicação.
- `src/controllers`: Contém os controladores como renegotiationController.js.
- `src/middlewares`: Contém os middlewares como tokenMiddleware.js.
- `src/services`: Contém os serviços como renegotiationService.js
- `src/routes`: Contém as rotas como renegotiationRoutes.js

#### Banco de dados

- `db.json`: Arquivo que contem o banco de dados inicial do projeto.

## Implementação na AWS

Este projeto é uma aplicação full-stack composta por um frontend em Angular e vários serviços backend em Node.js. O objetivo principal do projeto é gerenciar autenticação de usuários, cobranças e renegociações. Para hospedar e gerenciar esta aplicação na AWS, podemos utilizar uma combinação de vários serviços da AWS para garantir escalabilidade, segurança e facilidade de manutenção.

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

## Gerar Diagrama da Arquitetura AWS

Este projeto utiliza a biblioteca `diagrams` para gerar um diagrama da arquitetura da aplicação. Siga os passos abaixo para gerar o diagrama.

### Passos para Gerar o Diagrama

1. **Instale as dependências necessárias:**

Certifique-se de ter o Python instalado e depois instale as dependências necessárias utilizando o comando abaixo:

```sh
 pip install -r requirements.txt
```

2. **Gere o diagrama:**

Execute o script aws_diagram.py para gerar o diagrama da arquitetura:

```sh
python diagrams/aws_diagram.py
```

Este comando irá gerar um arquivo AWS Fullstack Application.png no diretório atual contendo o diagrama da arquitetura.

### Estrutura do Projeto na AWS:

A estrutura do projeto na AWS pode ser dividida da seguinte forma:

![aws_fullstack_application](https://github.com/user-attachments/assets/d671fda2-fdba-47e8-80b0-46b132208dd7)

### Descrição do Diagrama

O diagrama gerado representa a arquitetura da aplicação na AWS, incluindo os seguintes componentes:

- **Frontend:**
  - **S3:** Para hospedar a aplicação Angular estática.
  - **CloudFront:** Para fornecer CDN (Content Delivery Network) e HTTPS.

- **Backend:**
  - **API Gateway:** Para gerenciar as APIs e rotear as solicitações para os serviços backend.
  - **Auth Service:**
    - **Lambda:** Para o serviço de autenticação.
    - **Cognito:** Para gerenciar a autenticação de usuários.
  - **Charge Service:**
    - **Lambda:** Para o serviço de cobrança.
    - **DynamoDB:** Para armazenar dados de cobrança.
  - **Renegotiation Service:**
    - **Lambda:** Para o serviço de renegociação.
    - **DynamoDB:** Para armazenar dados de renegociação.

  - **Infrastructure & Configuration:**
    - **CloudFormation:** Para gerenciar a infraestrutura como código.
    - **IAM:** Para gerenciar permissões e segurança.
    - **CloudWatch:** Para monitoramento e logging dos serviços.


___
