# Sistema Acadêmico - Frontend (React)

Este é o projeto frontend (BÔNUS) para o Sistema Acadêmico. É uma interface de usuário construída em React (com Vite) que consome a API RESTful do backend.

## 🛠️ Tecnologias Utilizadas

* React (via Vite)
* Axios (para chamadas de API)
* Vercel (Plataforma de Deploy)

## 🚀 Como Rodar Localmente

1.  Clone este repositório.
2.  Execute `npm install` para instalar as dependências.
3.  Execute `npm run dev` para iniciar o servidor de desenvolvimento.
4.  A aplicação estará disponível em `http://localhost:5173` (ou a porta indicada pelo Vite).

## 🔌 Consumindo a API

Este frontend consome a API do backend que está hospedada no Render.

* A URL da API é configurada através da variável de ambiente `VITE_API_URL`.
* Localmente, você pode criar um arquivo `.env.local` na raiz e adicionar:
    `VITE_API_URL=https://av2-arquitetura-web-nd87.onrender.com/api`
* A aplicação lida com a autenticação (HTTP Basic) em todas as requisições.

## ☁️ Deploy no Vercel

O deploy deste frontend foi feito no Vercel.

1.  Um novo projeto foi criado no Vercel, linkado a este repositório do GitHub.
2.  O Vercel detectou automaticamente o `Vite` como *framework*.
3.  A seguinte Variável de Ambiente foi configurada no Vercel:
    * **Name:** `VITE_API_URL`
    * **Value:** `https://av2-arquitetura-web-nd87.onrender.com/api`
4.  A URL do site no ar é: `https://av2-arquitetura-web-frontend-z6te.vercel.app/`
