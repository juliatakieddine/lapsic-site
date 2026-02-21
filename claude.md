# Contexto Claude

Este arquivo registra o contexto passado pelo Claude para manter a continuidade do projeto.

## Histórico
O repositório foi criado e o projeto Vite enviado para o GitHub (`juliatakieddine/lapsic-site`). O site já está hospedado via Vercel com CI/CD configurado (cada git push na branch main atualiza o site).
- Design unificado com lucide-react para ícones em lugar sólido.
- Interação por Contact Form redirecionado com bypass CORS para planilhas limpas.
- Video Embedding atrelado junto às descrições de encontros interativos.
- Elevação do state `activeFolder` gerencia tab-redirection para preview de PDF `title` ao invés de nomes de arquivos cruos.
Uma tentativa prévia foi feita para editar o App.jsx aplicando:
- Dark Mode
- Ícone Psi
- Repositório de Arquivos
- Remoção do Leaf icon

Houve interrupção de conexão ao final.

## Ações Restantes (Checklist Original)
- Substituir folha pelo símbolo Psicologia.
- Mudar texto do Bem-vindo (''Que alegria ter você com a gente...'').
- Acentuação PT-BR.
- Dark mode persistente (localStorage).
- Retirar links do Notion/Drive soltos.
- Mural de avisos: Próximo encontro. Preview do arquivo.
- Nova aba: Repositório de Arquivos integrada aos títulos.
- Aviso lista de presença preenchimento durante o encontro.
- Links visíveis para vídeos.
   - **Repositório Iterativo:** Array de `REPOSITORIO_FILES` configurados com index matching local vinculados a `public/docs/`.
   - **Estruturas Base:** Array `CRONOGRAMA` no uso primário para renderizar ABNT tags extraídas de PDFs ou títulos de leitura dinâmicos.
- Sumário explicativo para estudante de psicologia.
