# LAPSIC | Espaço do Ligante

Site da **Liga Acadêmica de Psicologia Clínica (LAPSIC)** — um painel exclusivo para os ligantes com cronograma dos encontros, informações da diretoria, mural de avisos e canal de contato.

---

## O que é este site?

O **Espaço do Ligante** é o portal online da LAPSIC, pensado para reunir em um único lugar tudo que o ligante precisa saber sobre o semestre: quando são os encontros, o que vai ser discutido, quem são os responsáveis pela organização e como entrar em contato com a diretoria.

O site funciona como um **painel de controle visual** — é possível navegar pelas seções usando o menu lateral (ou o botão de menu no celular), e ele se adapta tanto ao computador quanto ao celular. Há também um botão para alternar entre o **modo claro** e o **modo escuro**.

---

## Seções do site

### 🔒 Login (Acesso Restrito)

Todo o portal é protegido por uma tela de verificação. Apenas a diretoria e membros com e-mails na lista de autorizados, ou usuários em posse do e-mail institucional `@mackenzista.com.br` podem acessar as informações, garantindo a privacidade da Liga de forma automatizada.

### 🏠 Início

A página inicial exibe:

- Um banner de boas-vindas com o nome da liga e uma mensagem de apresentação.
- **Acesso Rápido**: dois atalhos para o **Notion** (contatos, cronograma e links dos encontros) e o **Google Drive** (textos, cartilhas e livros por eixo temático).
- **Mural de Avisos**: informa o próximo encontro (tema e leitura indicada) e lembretes importantes, como assinar a lista de presença.

### 📅 Cronograma

Lista todos os encontros do semestre **2026.1**, realizados às **segundas-feiras às 19h no formato online**. Cada linha exibe:

- A **data** do encontro.
- O **tema** a ser discutido.
- O **eixo temático** ao qual o tema pertence (veja abaixo).
- Um badge indicando quando há **palestrante convidado**.

Ao clicar em um encontro, aparecem detalhes como a **bibliografia sugerida** e, quando aplicável, quem é o **participante especial**.

É possível **filtrar os encontros por eixo temático** usando os botões no topo da lista:

- **Ramificações da Clínica** — temas como psicoterapia online, infantil, luto, atendimento emergencial.
- **Psicopatologia e Fármacos** — temas como autodiagnóstico, medicalização, discussão de caso.
- **Gestão e Burocracias da Clínica** — temas como gestão, contratos, finanças, marketing.

### 👥 Diretoria

Mostra os quatro membros da diretoria atual com nome, RA, e-mail e telefone. Os links de e-mail e telefone são clicáveis para facilitar o contato direto.

### 📚 Materiais Complementares

Uma seção dedicada para agrupar as Resoluções Técnicas e publicações formativas do Conselho Regional de Psicologia que servirão de base para a formação do Ligante, organizados como recursos extras não fixados a encontros específicos.

### 💬 Contato

Formulário para enviar mensagens à diretoria com campos para nome (opcional, para anonimato), assunto e mensagem. Ideal para sugerir temas, indicar palestrantes ou deixar avaliações. Ao enviar, uma mensagem de confirmação é exibida.

---

### Como atualizar o conteúdo

Não é necessário conhecimento de código para alimentar os materiais do site!

Todo o sistema foi projetado com **integração nativa à nuvem**. A plataforma lê o seu Google Drive em tempo real. Isso significa que, se a Diretoria quiser disponibilizar um texto, uma cartilha ou remover um PDF desatualizado, vocês não precisam entrar no código fonte.

### Alimentando o Site pelo Google Drive (Área da Diretoria)

Quando um diretor autorizado faz o Login (usando seu próprio e-mail registrado), o site libera uma aba secreta no menu esquerdo chamada **🛡️ Painel da Diretoria**.
Nesta tela, vocês encontrarão atalhos diretos para as Gavetas Oficiais da Liga no Google Drive:

1. **Repositório de Arquivos:** Dividido nos 3 respectivos Eixos Temáticos.
2. **Materiais Complementares:** Para biblioteca geral e extra.

Tudo o que for jogado ou removido dentro das devidas pastas nesses atalhos vai refletir **automaticamente** para os alunos na parte pública do site!

### Autorizar Convidados Externos (Login Comum)

A plataforma possui três camadas de acesso na tela de Login:

1. **Ligantes Mackenzistas:** Qualquer e-mail terminado em `@mackenzista.com.br` entra automaticamente.
2. **Convidados Externos:** E-mails variados (como `@gmail`, `@yahoo`).
3. **Diretoria:** Membros da gestão com acesso ao painel de administração.

Para autorizar a entrada de um aluno convidado que não possui o e-mail do Mackenzie, você deve abrir o arquivo **`src/App.jsx`**, localizar a lista `AUTHORIZED_COMMON_EMAILS` (por volta da linha 980) e adicionar o e-mail dele entre aspas (ex: `"suguidiane@gmail.com"`). Essa pessoa terá acesso aos PDFs e Cronogramas, mas o botão de administração permanecerá oculto.

### Autorizar novos administradores / diretoria

Caso um novo Presidente ou Diretor assuma a gestão no futuro, é necessário adicioná-lo no código para que ele possa enxergar o botão secreto do "Painel da Diretoria".
No arquivo **`src/App.jsx`**, localize a lista `AUTHORIZED_EMAILS` (por volta da linha 972) e adicione o e-mail responsável pela nova liderança e remova os antigos.

### Alterando o cronograma de encontros

Se for uma mudança na Grade Escrita (alteração de Tema, Data, Palestrante no Mural), abra o arquivo **`src/App.jsx`** e procure pela lista chamada `CRONOGRAMA` (por volta da linha 57). Ali você pode trocar livremente aspas e textos sem medo.

Localize o trecho que começa com `const CRONOGRAMA = [` no arquivo `src/App.jsx`. Cada linha representa um encontro e segue este formato:

```js
{ data: "23/02", tema: "Apresentação da Liga", bib: null, part: null, eixo: null },
```

| Campo         | O que é                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `data`        | Data do encontro no formato `"DD/MM"`                                    |
| `tema`        | Título do encontro                                                       |
| `bib`         | Leitura indicada, ou título de livro principal (ou `null` se não houver) |
| `bibAbnt`     | Referência dos Autores da leitura para destaque no layout                |
| `videos`      | Elemento Array opcional no formato `[{ title: "Nome", url: "Link" }]`    |
| `filePreview` | Nome do PDF correspondente em `/public/docs/` para abrir em nova aba     |
| `part`        | Nome do palestrante convidado (ou `null` se não houver)                  |
| `eixo`        | Um dos três eixos temáticos (ou `null` para encontros gerais)            |

Os três eixos válidos são exatamente:

- `"Ramificações da Clínica"`
- `"Psicopatologia e Fármacos"`
- `"Gestão e Burocracias da Clínica"`

### Atualizar a diretoria

Localize o trecho `const DIRETORIA = [` e edite os dados de cada membro:

```js
{ nome: "Nome Completo", ra: "00000000", email: "email@exemplo.com", tel: "(11) 90000-0000" },
```

### Atualizar o mural de avisos

O mural de avisos está na função `MuralAvisos()`. Ali você pode alterar o texto do próximo encontro e os lembretes exibidos na página inicial.

---

## Como melhorar o site

A seguir, algumas ideias de melhorias organizadas por dificuldade:

### Melhorias simples (sem código)

- **Atualizar o cronograma** a cada semestre com as novas datas, temas e bibliografias.
- **Atualizar os dados da diretoria** quando houver mudança de gestão.
- **Manter o mural de avisos atualizado** com o próximo encontro e lembretes relevantes.

### Melhorias de funcionalidade

- **Conectar o formulário de contato a um serviço real** (ex.: [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com)) para que as mensagens sejam de fato enviadas à diretoria, em vez de apenas simular o envio.
- **Popular a aba Materiais Complementares**: Subir arquivos fixos sobre atuação profissional ligados aos órgãos reguladores.
- **Notificações de lembrete**: enviar e-mail ou notificação no dia do encontro com o tema e o link de acesso.

### Melhorias visuais

- **Adicionar foto ou avatar** aos cartões da diretoria para tornar o contato mais pessoal.
- **Indicar o encontro atual ou o próximo** de forma mais destacada no cronograma (ex.: marcando com uma cor diferente ou um badge "Próximo").
- **Adicionar um favicon personalizado** com o logo da LAPSIC no lugar do ícone padrão do Vite.
- **Personalizar a paleta de cores** para refletir a identidade visual da liga — os valores de cor ficam no início do arquivo `src/App.jsx` (objetos `LIGHT_COLORS` e `DARK_COLORS`).

### Melhorias de acessibilidade

- Garantir que todos os botões e links possuam texto descritivo para leitores de tela.
- Melhorar o contraste de cores no modo claro para facilitar a leitura em ambientes com muita luz.

---

## Rodando o projeto localmente

Você precisa ter o [Node.js](https://nodejs.org) instalado. Depois, no terminal:

```bash
# Instala as dependências
npm install

# Inicia o servidor local (acesse em http://localhost:5173)
npm run dev
```

Para gerar a versão final pronta para publicação:

```bash
npm run build
```

---

## Publicação

O site é publicado automaticamente na **[Vercel](https://vercel.com)** a cada novo envio para a branch principal do repositório. Nenhuma configuração adicional é necessária após o deploy inicial.

---

## Tecnologias utilizadas

| Tecnologia                               | Finalidade                            |
| ---------------------------------------- | ------------------------------------- |
| [React 19](https://react.dev)            | Construção da interface               |
| [Vite](https://vitejs.dev)               | Ferramenta de desenvolvimento e build |
| [Lucide React](https://lucide.dev)       | Ícones da interface                   |
| [Google Fonts](https://fonts.google.com) | Fontes DM Sans e Playfair Display     |
| [Vercel](https://vercel.com)             | Hospedagem e deploy automático        |

---

_LAPSIC — Liga Acadêmica de Psicologia Clínica — 2026.1_
