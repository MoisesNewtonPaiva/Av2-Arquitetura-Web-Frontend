# Sistema Acadêmico - Frontend (React)

[cite_start]Este é o projeto frontend (BÔNUS) [cite: 55] para o Sistema Acadêmico. É uma interface de usuário construída em React que consome a API do backend.

## [cite_start]🛠️ Tecnologias Utilizadas [cite: 132]

* [cite_start]React (via Vite) [cite: 65]
* Axios (para chamadas de API)
* [cite_start]Vercel (Plataforma de Deploy) [cite: 69]

## [cite_start]🚀 Como Rodar Localmente [cite: 133]

1.  Clone este repositório.
2.  Execute `npm install` para instalar as dependências.
3.  Execute `npm run dev` para iniciar o servidor de desenvolvimento.
4.  A aplicação estará disponível em `http://localhost:5173` (ou a porta indicada pelo Vite).

## [cite_start]🔌 Consumindo a API [cite: 134]

[cite_start]Este frontend consome a API do backend que está hospedada no Render[cite: 60].

* A URL da API é configurada através da variável de ambiente `VITE_API_URL`.
* Localmente, você pode criar um arquivo `.env.local` na raiz e adicionar:
    `VITE_API_URL=https://av2-arquitetura-web-nd87.onrender.com/api`
* A aplicação lida com a autenticação básica (HTTP Basic) em todas as requisições.

## [cite_start]☁️ Deploy no Vercel [cite: 135]

[cite_start]O deploy deste frontend foi feito no Vercel[cite: 69].

1.  Um novo projeto foi criado no Vercel, linkado a este repositório do GitHub.
2.  O Vercel detectou automaticamente o `Vite` como *framework*.
3.  A seguinte Variável de Ambiente foi configurada no Vercel:
    * **Name:** `VITE_API_URL`
    * **Value:** `https://av2-arquitetura-web-nd87.onrender.com/ap`
4.  A URL do site no ar é: `https://av2-arquitetura-web-frontend-z6te.vercel.app/`

---
