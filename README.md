# Sobre

Esta aplicação web foi desenvolvida para facilitar a adoção de cachorros, conectando pessoas que desejam adotar um pet com aquelas que têm animais disponíveis para adoção. Os usuários podem cadastrar seus pets, fornecendo informações como nome, idade, peso, cor e fotos. Outros usuários interessados podem visualizar os pets cadastrados, solicitar uma visita para conhecê-los melhor e, se houver uma conexão, concluir o processo de adoção.

# Tecnologias

## Backend
- **Node.js**
- **Express**
- **MongoDB**
- **JWT (JSON Web Tokens)** 
- **Express-validator**


## Frontend
- **React** 
- **React Router**
- **Axios**
# Utilização

## Instalação

### Backend

```bash
# Entre na pasta backend
cd backend

# Crie o arquivo contendo as variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Rode o backend
npm start
```

### Frontend

```bash
# Entre na pasta frontend
cd frontend

# Crie o arquivo contendo as variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Rode o frontend
npm run dev
```

# Backend

Para o backend, utilizei **Nodejs**.

## Collections

Existem duas collections: ``Users`` e ``Pets``

### Users

```json
{
  "id": "6564d13f6a76b0f57933e45a",
  "name": "Miguel",
  "phone": "83 988888888",
  "email": "teste@gmail.com",
  "password": "***********",
  "image": "1993029392.png"
}
```

### Pets

```json
{
  "_id": "67bce6e216dec2afd2433740",
  "name": "Bob",
  "age": 2,
  "weight": 4,
  "color": "Branco",
  "images": ["88328931.png"],
  "adopter": null, 
  "available": false,
  "user": {
    "id": "6564d13f6a76b0f57933e45a",
    "name": "Miguel",
    "phone": "83 988888888",
    "email": "teste@gmail.com",
    "password": "***********",
    "image": "1993029392.png"
  }
}
```

## Autenticação
A autenticação é feita através de um **token JWT**, que é gerado após o usuário fazer login. O token é armazenado no **localStorage** do navegador e deve ser enviado no cabeçalho (`Authorization`) de todas as requisições protegidas pelo middleware de autenticação.

## Validadores de input
Para validar os inputs recebidos pela API, utilizei o **express-validator** e criei funções de validação para verificar campos como email, número de telefone, imagens e imagens.

# Frontend

Para o frontend, utilizei **React** como biblioteca principal. A estilização foi feita com **CSS puro**, com uma interface simples e responsiva.


## Telas



