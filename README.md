# API de Unidades Organizacionais (Closure Table)

Implementação em **TypeScript + Postgres** para o desafio de modelar usuários e grupos com **Closure Table**.

## Requisitos do desafio

- **Elegância de código** (SOLID, camadas limpas, tipagem forte)
- **Corretude da hierarquia** (sem ciclos, profundidades mínimas, sem duplicados)
- **Performance de leitura** via Closure Table
- **Observabilidade** (logs JSON ECS + OpenTelemetry) **→ ainda não implementado**
- **Testes unitários/integrados** no projeto **→ ainda não implementado**

## Pré-requisitos

- Node.js 18+
- PostgreSQL 15+

## Como rodar

1. Clone o repositório e entre na pasta:

   ```bash
   git clone <url-do-repo>
   cd <repo>
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure o `.env`:

   ```bash
   cp .env.example .env
   ```

   Ajuste `DATABASE_URL` se necessário.

4. Rode as migrations:

   ```bash
   pnpm prisma migrate dev --name init
   ```

5. Inicie a aplicação:

   ```bash
   pnpm dev
   ```

   A API estará disponível em `http://localhost:3000/api`.

## Endpoints principais

- `POST /users` → cria usuário
- `POST /groups` → cria grupo (com `parentId` opcional)
- `POST /users/:id/groups` → associa usuário a grupo
- `GET /users/:id/organizations` → lista grupos do usuário (diretos + herdados, com depth)
- `GET /nodes/:id/ancestors` → lista ancestrais
- `GET /nodes/:id/descendants` → lista descendentes

---

📌 **Observação**:  
A parte de **observabilidade (logs ECS + OpenTelemetry)** e os **testes unitários/integrados** ainda não foram implementados.  
