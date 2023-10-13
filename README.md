# Car Store Api
Api para cadastro e listagem de carros com login para usuários admin. A api foi desenvolvida em NestJs e usa o banco de dados PostgresSQL.

clone o repositório:
```bash
git clone https://github.com/Gabriel-S-Souza/car_store_api.git
```

construa as imagens Docker:
```base
docker-compose build
```

inicie os contêineres Docker:

```bash
docker-compose up
```

A API estará disponível na URL http://localhost:3000/api

Você pode baixar o [arquivo insomnia](https://drive.google.com/file/d/1yzU-f_6xxkBq4hROzJtvb8cVBg7A8ajb/view?usp=sharing) para testar a api.

### Listagem de carros

GET /api/vehicles?page=1

Resposta 200

```bash
[
   {
      "id":5,
      "name":"Combi",
      "brand":"Volkswagen",
      "model":"minivan",
      "image":"imageBase64",
      "price":15000
   },
   {
      "id":10,
      "name":"Siena",
      "brand":"Volksvagen",
      "model":"sedã",
      "image":"imageBase64",
      "price":21000
   },
  ...
]
```
<br>

### Consultar veículo por ID

GET /api/vehicles/27

Resposta 200
```bash
{
  "id": 8,
  "name": "Gol",
  "brand": "Volksvagen",
  "model": "Fire",
  "image": "imageBase64",
  "price": 21000,
  "description": "Em bom estado, economico, rápido",
  "condition": "used",
  "year": 2023,
  "mileage": 25000,
  "engine": "2.0"
}
```

Os endpoints POST, PUT e DELETE são restritos aos usuários admin e exigem autorização. Dessa forma você precisará fazer o signup e login para ober o accessToken.
<br>

### SignUp

POST /api/signup

Payload
```bash
{
  "name": "Joao Chico",
  "email": "joao@test.com",
  "password": "@Joao123"
}
```

Resposta 201
```bash
{
  "id": 5,
  "name": "Joao Chico",
  "email": "joao@test.com",
  "role": "admin"
}
```
<br>

### Login

POST /api/login

Payload
```bash
{
  "email": "joao@test.com",
  "password": "@Joao123"
}
```

Resposta 200
```bash
{
  "accessToken": "eyJhbGciOiJIUzIIsInRC...", // lasts 1 hour
  "refreshToken": "eyJhbGciOiJIIkpXVbWF...", // lasts 30 days
  "user": {
    "id": 5,
    "name": "Joao Chico",
    "email": "joao@test.com",
    "role": "admin"
  }
}
```
Caso o token expire, você pode chamar o endpoint "refresh-token" para renova-lo
<br>

### Refresh token

POST /api/refresh-token

Payload
```bash
{
	"refreshToken": "eyJhbGciOiJIUzI1N...
}
```


Resposta 201
```bash
{
	"accessToken": "eyJhbGciOiJIUzI1NiIn...",
	"refreshToken": "eyJhbGciOiJIUzI1NiI..."
}
```
<br>

### Cadastro do veículo

POST /api/vehicles

Payload
```bash
{
  "name": "Gol",
  "brand": "Volksvagen",
  "model": "ABC",
  "price": 21000,
  "year": 2023,
  "engine": "2.0",
  "mileage": 25000,
  "condition": "used",
  "description": "Em bom estado, economico, rápido",
  "image": "imageBase64",
}
```

Resposta 201
```bash
{
  "name": "Gol",
  "brand": "Volksvagen
    ...
}
```
<br>

### Edição de veículo

PUT /api/vehicles/8

Payload
```bash
{
  "name": "Corsa"
}
```

Resposta 200
```bash
{
  "name": "Corsa",
  "brand": "Volksvagen
  ...
}
```
<br>

### Deleção de veículo

DELETE /api/vehicles/8

Resposta 200
```bash
{
  "statusCode": 200,
  "message": "Veículo deletado com sucesso"
}
```

Você pode consultar a documentação swagger disponível em /api/doc.
OBS: a documentação swagger pode está incompleta.

contato: gabriel.appdeveloper@gmail.com
