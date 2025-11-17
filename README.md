# Sistema Acadêmico - Frontend (React)

Este é o projeto frontend (BÔNUS) para o Sistema Acadêmico. É uma interface de usuário construída em React (com Vite) que consome a API RESTful do backend.

## 🏛️ Arquitetura e Autenticação

O projeto utiliza uma arquitetura de componentes baseada em páginas para lidar com a autenticação:

* `/src/Pages/Login.jsx`: Componente responsável pela tela de login.
* `/src/Pages/Alunos.jsx`: Componente com o CRUD completo de Alunos.
* `/src/Pages/Cursos.jsx`: Componente com o CRUD completo de Cursos.
* `/src/App.jsx`: Atua como o "controlador" principal. Ele decide se renderiza a tela de Login (se não estiver autenticado) ou as páginas de Alunos e Cursos (se estiver autenticado).

### Fluxo de Autenticação

A aplicação consome a API (protegida por HTTP Basic Auth) da seguinte forma:

1.  O `App.jsx` verifica se existe um *token* de autenticação (`authToken`) salvo no `localStorage` do navegador.
2.  Se não existir, a tela `Login.jsx` é exibida.
3.  O usuário insere suas credenciais. O `App.jsx` tenta fazer uma requisição de teste (um `GET /api/alunos`) para validar o login.
4.  Se o login for bem-sucedido (status 200), o *token* de autenticação (ex: `Basic YWRtaW46YWRtaW5wYXNz`) é salvo no `localStorage`.
5.  O `App.jsx` re-renderiza, escondendo o Login e mostrando as páginas de Alunos e Cursos.
6.  Os componentes `Alunos.jsx` e `Cursos.jsx` leem o *token* salvo no `localStorage` para criar suas próprias instâncias do Axios (`apiClient`) e fazer as chamadas de API (GET, POST, PUT, DELETE).

> **⚠️ Nota Importante sobre o Login:**
> Devido à forma como os componentes `Alunos` e `Cursos` são inicializados (lendo o `localStorage` no momento em que o arquivo é carregado), **após fazer o login, é necessário atualizar a página (F5) uma vez** para que eles possam ler o novo *token* e a API funcionar corretamente.

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

## ☁️ Deploy no Vercel

O deploy deste frontend foi feito no Vercel.

1.  Um novo projeto foi criado no Vercel, linkado a este repositório do GitHub.
2.  O Vercel detectou automaticamente o `Vite` como *framework*.
3.  A seguinte Variável de Ambiente foi configurada no Vercel:
    * **Name:** `VITE_API_URL`
    * **Value:** `https://av2-arquitetura-web-nd87.onrender.com/api`
4.  A URL do site no ar é: `https://av2-arquitetura-web-frontend-z6te.vercel.app/`
