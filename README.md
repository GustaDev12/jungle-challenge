# Jungle Gaming – Desafio Full Stack Dev Júnior

## 🏗 Arquitetura do Projeto

O projeto segue uma arquitetura **monorepo** com backend em microserviços e frontend integrado, permitindo escalabilidade, compartilhamento de código e reutilização de entidades, DTOs e interfaces.

### Diagrama de arquitetura (ASCII simplificado)

Arquitetura completa do projeto está no arquivo: -> arquitetura.md na raiz do projeto

## ⚙️ Decisões técnicas e trade-offs

* **Front-end:**

  * Vite + TanStack-Router + TanStack-Query
  * Aproveitamento avançado de cache: ao navegar da lista de tarefas para a página de detalhes, os dados já carregados no cache do TanStack-Query são reaproveitados, evitando chamadas desnecessárias à API.
  * Skeleton loading: caso os dados não estejam no cache (ex.: F5 na página), o sistema realiza a requisição e exibe loading skeleton até a resposta da API.
  * Atualização reativa em tempo real: operações como criar, participar ou desparticar de tarefas, e comentar em tarefas, atualizam imediatamente o cache e refletem na interface sem precisar recarregar a página.
  * Uso de HTTP state com TanStack-Query para manter consistência entre cache e ações do usuário.

* **Backend:**

  * NestJS com microserviços e API Gateway
  * RabbitMQ como event bus entre serviços
  * TypeORM para banco relacional (PostgreSQL)
  * Compartilhamento de entidades, DTOs e interfaces via workspaces do monorepo

* **Trade-offs:**

  * Monorepo facilita compartilhamento de código, mas exige atenção ao versionamento de pacotes internos e dependências.
  * Docker tornou o front-end um pouco mais lento na máquina local; o backend e serviços estão rápidos.

## ⚠️ Problemas enfrentados

* Primeiro contato com **arquitetura monolítica + monorepo**, especialmente:

  * Compartilhamento de entidades e DTOs entre serviços
  * Configuração inicial de Docker com múltiplos serviços

## ⏱ Tempo gasto estimado

* 2 dias: Estudo e estruturação do monorepo com Turborepo
* 6 dias: Desenvolvimento da API Gateway, microserviços e banco de dados
* 5 dias: Front-end, integração com TanStack-Router e TanStack-Query
* 1 dia: Configuração e teste do projeto com Docker

## 🚀 Instruções de execução

* **Com Docker:**

  ```bash
  docker-compose up --build
  ```

  > Observação: o front-end pode ficar mais lento rodando no docker. rodando apenas o serviço do frontend na sua maquina está rápdio; API e serviços funcionam normalmente.

* **Modo desenvolvimento local (PNPM):**

  ```bash
  pnpm install
  pnpm run dev
  ```

  > Inicia o projeto direto da raiz do monorepo sem Docker.

