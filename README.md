# ⏲ [Frontend] Ponto CPE

## 🔎 Sobre o projeto

### **Descrição**

Trata-se do sistema interno da empresa para monitoramento e controle das horas trabalhadas dos membros. Foi implementado de forma a ser mais eficaz e versátil durante o uso, principalmente, dos integrantes da diretoria de Desenvolvimento.
Além do controle de horas, foram feitas as funcionalidades:

- Painel de notícias
- Adicionar e remover horas, mediante formulário
- Consulta de horas
- Espaço para membro personalizar seu perfil, com frase e autenticação social (Google)

Para os administradores, existem as funcionalidades acima e:

- Controle de membros (Adicionar, editar e remover)
- Controle de cargos (Adicionar, editar e remover)
- Controle de notícias (Adicionar, editar e remover)

### **Gestão de implementação**

2021/1

### **Responsáveis**

Inova Team (Arthur Braga, Arthur Lima, Diogo Almazan e João Prates).

## 📚 Estrutura de Diretórios

    -> src
        -> assets
        -> components
        -> contexts
        -> graphql
    	-> pages
    	-> routes
        -> services
        -> styles

**-> src**

- Pasta onde ficará todo o código do projeto, sendo ele dividido da seguinte forma:

  **-> assets**

  - Pasta contendo arquivos estáticos utilizados ao longo do projeto, como imagens, vetores e arquivos JSON para animações (Lottie).

  **-> components**

  - Pasta em que ficarão os componentes reaproveitáveis da aplicação, que poderão aparecer nas diversas páginas. Como é citado no tópico "Convenções Gerais", os componentes foram separados e planejados de acordo com o [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/ "Atomic Design"). Para cada componente, tem-se uma pasta com o nome do componente, com um arquivo _index.js_, para estrutura do componente, e um _styles.js_, para estilização. Caso sejam necessários mais arquivos, fique à vontade para criar, porém esse é o mínimo estipulado.

  **-> contexts**

  - Pasta em que ficarão os contextos do projeto. Para implementação destes, foi-se utilizado a [API Context](https://pt-br.reactjs.org/docs/context.html "API Context") do React, seguindo os padrões citados na documentação.
  - Cada context possui uma funcionalidade específica no sistema, sendo elas:
    - Global: Configurações globais.
    - Session: Autenticação.
    - Theme: Configuração de tema do projeto.

  **-> graphql**

  - Pasta que possui arquivos com as queries Graphql que são utilizadas no projeto. O nome do arquivo diz respeito ao seu uso, especificamente.

  **-> pages**

  - Pasta que consiste nas páginas do sistema. Os nomes das pastas dizem respeito à sua respectiva página, onde, caso exista pastas internamente, correspondem às partes que compõem a página. Como exemplo, tem-se a página de Administrador, com as diversas abas existentes nesta.

  **-> routes**

  - Pasta que possui as configurações de rotas para a aplicação, tanto públicas quanto privadas. Foi implementado seguindo a documentação do React.

  **-> services**

  - Pasta que contém alguns arquivos úteis para a aplicação, como configuração de autenticação e validação de dados.

  **-> styles**

  - Pasta que armazena os arquivos de estilos globais e de temas do projeto. Estes arquivos são utilizados por todo o sistema.

## 📲 Como rodar

Primeiramente, será necessário instalar as dependências do projeto, com o comando

    yarn

Após isso, digitar o comando abaixo. Dessa forma, uma aba abrirá no seu navegador no endereço `http://localhost:3000`.

    yarn start

## 🤯 Convenções Gerais

Como forma de organizar as pastas, foi utilizado uma padronização de design de sistemas, conhecida como [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/ "Atomic Design"). Nesse padrão, o projeto é organizado em átomos, moléculas, organismos, templates e páginas. Para mais informações, consultar a documentação.

## 🔧 Ferramentas utilizadas

- [ReactJs](https://pt-br.reactjs.org/docs/getting-started.html "ReactJs") -> Biblioteca Javascript para construção de interfaces de usuário.
- [Firebase](https://firebase.google.com/docs/ "Firebase") -> Usado para a autenticação, apenas
- [Styled Components](https://styled-components.com/docs "Styled Components") -> Escolha de forma de estilização, que utiliza CSS in JS como abordagem
- [Ant Design](https://ant.design/docs/react/introduce "Ant Design") -> Biblioteca de design do React, utilizada para facilitar na criação de alguns componentes de interface.
- [Lottie](https://www.npmjs.com/package/react-lottie "React Lottie") -> Biblioteca que conta com diversas animações leves.
- [StoryBook](https://storybook.js.org/docs/react/get-started/introduction "Storybook") -> Ferramenta de desenvolvimento UI. Torna a implementação dos componentes em tela mais fácil e melhor documentada.
- [GraphQL](https://graphql.org/learn/ "GraphQL") -> Linguagem de consulta que facilita na obtenção de dados específicos vindos da API.

### Deploy

- [Netlify](https://www.netlify.com/ "Netlify") -> Plataforma de hospedagem para projetos web. **Plano gratuito utilizado.**

## 🧠 Modelagem

Descrito no [Repositório Backend](https://github.com/cpejr/backend-novoponto) do projeto.

## 📌 Documentação

Como forma de documentar os componentes criados, começou-se a utilizar o Storybook, porém não foi totalmente implementado em todo o sistema.

---

_<center>Consultoria e Projetos Elétricos Junior - CPE 💛 - 2021/2</center>_
