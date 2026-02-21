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

## Como atualizar o conteúdo

Todo o conteúdo editável está concentrado no arquivo **`src/App.jsx`**, nas primeiras linhas. Não é necessário conhecimento técnico avançado para fazer alterações simples.

### Autorizar novos alunos (Login)

No arquivo `src/App.jsx`, localize a constante `AUTHORIZED_EMAILS`. Adicione o e-mail do aluno nesta lista. (Lembre-se: Ligantes portando e-mails com sufixo `@mackenzista.com.br` são autorizados de forma automática sem precisar de inclusão manual nesta array).

### Atualizar o cronograma

Localize o trecho que começa com `const CRONOGRAMA = [` no arquivo `src/App.jsx`. Cada linha representa um encontro e segue este formato:

```js
{ data: "23/02", tema: "Apresentação da Liga", bib: null, part: null, eixo: null },
```

| Campo  | O que é                                                          |
|--------|------------------------------------------------------------------|
| `data` | Data do encontro no formato `"DD/MM"`                           |
| `tema` | Título do encontro                                               |
| `bib`  | Leitura indicada, ou título de livro principal (ou `null` se não houver) |
| `bibAbnt` | Referência dos Autores da leitura para destaque no layout        |
| `videos` | Elemento Array opcional no formato `[{ title: "Nome", url: "Link" }]`  |
| `filePreview` | Nome do PDF correspondente em `/public/docs/` para abrir em nova aba     |
| `part` | Nome do palestrante convidado (ou `null` se não houver)          |
| `eixo` | Um dos três eixos temáticos (ou `null` para encontros gerais)    |

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

| Tecnologia | Finalidade |
|---|---|
| [React 19](https://react.dev) | Construção da interface |
| [Vite](https://vitejs.dev) | Ferramenta de desenvolvimento e build |
| [Lucide React](https://lucide.dev) | Ícones da interface |
| [Google Fonts](https://fonts.google.com) | Fontes DM Sans e Playfair Display |
| [Vercel](https://vercel.com) | Hospedagem e deploy automático |

---

*LAPSIC — Liga Acadêmica de Psicologia Clínica — 2026.1*
