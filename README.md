## Visão Geral do Projeto

Este projeto tem como objetivo a implementação de uma aplicação web para cadastro, listagem e análise de clientes e suas vendas, com foco na qualidade do código, boas práticas, autenticação e manipulação dos dados consumidos via API.

A aplicação front-end foi desenvolvida em React com TypeScript, consumindo dados mockados localmente, sem backend real. A autenticação é simples e os dados são armazenados no localStorage para persistência durante a execução.

---

## Tecnologias Utilizadas

- React  
- TypeScript  
- Tailwind CSS  
- Recharts
- LocalStorage para persistência local  
---

## Funcionalidades

- Cadastro de clientes com nome completo, e-mail e data de nascimento  
- Listagem e exibição dos clientes com dados normalizados e tratados no front-end  
- Autenticação simples, com dados armazenados no localStorage  
- Gráfico com total de vendas por dia  
- Destaques visuais para:  
  - Cliente com maior volume de vendas  
  - Cliente com maior média de valor por venda  
  - Cliente com maior frequência de compras  
- Indicador visual da primeira letra do alfabeto que não aparece no nome do cliente (ou ‘-’ caso todas as letras estejam presentes)  

---

## Estrutura do Projeto
```
📦 src
┣ 📂 components
┣ 📂 contexts
┣ 📂 helpers
┣ 📂 hooks
┣ 📂 mocks
┣ 📂 pages
┣ 📂 routes
┣ 📂 types
┣ 📂 utils
┗ 📜 App.tsx
```


---

## Como Rodar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd seu-repositorio

# Instale as dependências
npm install

# Inicie a aplicação
npm run dev
```
---

Feito  por [Gustavo Andrade](https://github.com/gustavo64522)
