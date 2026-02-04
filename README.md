 # FSW Donalds

 [![Demo](https://img.shields.io/badge/demo-online-green)](https://fsw-donalds-mu.vercel.app/)

 App de **autoatendimento para restaurantes** (estilo iFood), onde o cliente:
 
 1. Escolhe o restaurante
 2. Escolhe como vai consumir (comer no local ou levar)
 3. Navega pelo cardápio, vê detalhes do produto e adiciona à sacola
 4. Finaliza o pedido informando nome e CPF
 5. Consulta pedidos pelo CPF

 ## Fluxo no app (rotas)
 
 - **Home (`/`)**
   Lista os restaurantes disponíveis.
 - **Restaurante (`/[slug]`)**
   Seleção do método de consumo.
 - **Cardápio (`/[slug]/menu?consumptionMethod=...`)**
   Lista categorias e produtos do restaurante.
 - **Produto (`/[slug]/menu/[productId]?consumptionMethod=...`)**
   Detalhes do produto e opção de adicionar ao carrinho.
 - **Pedidos (`/orders?cpf=...`)**
   Busca e exibe pedidos cadastrados para o CPF.

 ## Funcionalidades
 
 - **Seleção de restaurante**
 - **Cardápio por categorias**
 - **Carrinho/Sacola**
   Adicionar/remover itens e alterar quantidades.
 - **Finalização do pedido**
   Form com validação (nome e CPF) e criação do pedido no banco.
 - **Consulta de pedidos por CPF**

 ## Stack
 
 - **Next.js (App Router)**
 - **React + TypeScript**
 - **Tailwind CSS + shadcn/ui (Radix UI) + Lucide**
 - **Prisma ORM + PostgreSQL**
 - **React Hook Form + Zod**

 ## Rodando localmente
 
 ### Requisitos
 
 - **Node.js** (recomendado 20+)
 - **PostgreSQL**
 - **npm** (o repo inclui `package-lock.json`)

 ### 1) Instalar dependências
 
 ```bash
 npm install
 ```
 
 Observação: o `postinstall` executa `prisma generate` automaticamente.

 ### 2) Configurar variáveis de ambiente
 
 Crie um arquivo `.env` na raiz com a variável `DATABASE_URL`:
 
 ```env
 DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fsw_donalds?schema=public"
 ```

 ### 3) Criar o banco (migrations) e popular dados (seed)
 
 ```bash
 npx prisma migrate dev
 npx prisma db seed
 ```

 ### 4) Rodar o projeto
 
 ```bash
 npm run dev
 ```

 Acesse `http://localhost:3000`.

 ## Comandos úteis
 
 ```bash
 npm run dev
 npm run build
 npm run start
 npm run lint
 npx prisma studio
 ```

 ## Observações
 
 - O projeto permite carregar imagens remotas do domínio `u9a6wmr3as.ufs.sh` (configurado em `next.config.ts`).
