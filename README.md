# Agenda Eletrônica – Desafio Técnico (Node.js + React)

A aplicação consiste em uma agenda eletrônica, onde cada usuário pode cadastrar atividades, visualizar em um calendário e alterar seus status.
Cada usuário só pode visualizar e modificar suas próprias atividades.


## 🚀 Tecnologias utilizadas
### Backend
- Node.js: 22.14.0
- Express
- MySQL
- Sequelize
- JWT (autenticação)

### Frontend
- React: 
- Vite
- Axios
- Biblioteca de calendário (coloque qual usou)

## 📌 Funcionalidades
- Cadastro de usuário
- Login + autenticação JWT
- CRUD de atividades
- Cada usuário só vê suas próprias atividades
- Mudança de status (pendente → concluída → cancelada)
- Exibição das atividades em calendário


## Como rodar o projeto localmente

#  Backend

```bash
cd agenda-backend
cp .env.example .env
npm install
npm start


#  Frontend

```bash
cd agenda-frontend
cp .env.example .env
npm install
npm run dev


## 🛢️ Banco de Dados

Crie o banco de dados manualmente no MySQL:

sql
CREATE DATABASE agenda;

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=senha
DB_NAME=agenda

JWT_SECRET=troque_esta_chave
PORT=4000

# O repositório contém todos os arquivos necessários para execução do desafio conforme solicitado.
#Credenciais sensíveis não são incluídas, apenas modelos .env.example.

