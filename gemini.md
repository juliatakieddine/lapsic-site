# Contexto Gemini

Es- Integrado `lucide-react` para iconografia unificada.
- Trocados botões estáticos para envio por Google Forms encapsulado localmente.
- Link de vídeos embutidos perfeitamente aos avisos mensais.
- Documentos repositório expõem `title` semânticos sobre `name` estritos de arquivos, além de mapeamento global com `public/docs/`.o das tarefas.

## Objetivos Atuais:
1. Trabalhar no `App.jsx` (ou semelhantes) no diretório frontend (`lapsic-site`).
2. Resolver pendências do último chat:
   - Trocar ícone de folha (leaf) pelo de Psicologia (Ψ).
   - Atualizar texto de "Bem-vindo".
   - Acentuações estruturais PT-BR corretas.
   - Implementar e aprimorar um `Dark Mode` persistente.
   - A estrutura de dados base agora usa as propriedades `bib` para título e `bibAbnt` restrito a nome de *autores* (`CRONOGRAMA`), e as files do `REPOSITORIO_FILES` dependem do índice no mapeamento (ex: `folder: "Ramificações da Clínica"` atende pelo clique do Mural de forma automática usando a elevação de estado em `LapsicApp`).
   - Remover links "desnecessários" para Notion e GDrive (focar no portal).
   - **Repositório Iterativo:** Array de `REPOSITORIO_FILES` configurados com index matching local vinculados a `public/docs/`.
   - **Estruturas Base:** Array `CRONOGRAMA` no uso primário para renderizar ABNT tags extraídas de PDFs ou títulos de leitura dinâmicos. Suporta um array `videos` com múltiplos objetos.
   - **Hotfix (Fase 6):** Corrigido crash de runtime na Vercel recarregando variação dinâmica entre `DARK_COLORS` e `LIGHT_COLORS`.
   - **Navegação Expandida (Fase 7 e 8):** Adicionada a aba isolada de `Materiais Complementares`, renderizando sem poluir o cronograma / repositório, voltada aos conteúdos do CRP.
- Sumário explicativo para estudante de psicologia completo e aprovado.

## Histórico de Interações (Última Sessão):
O projeto está muito bem dimensionado para a stack React + Vite. Implementamos uma UX refinada (links dinâmicos para YouTube/Netflix/TikTok, scroll suave por Eixo e botões de `Library`). O próximo fluxo de interação pode envolver alimentar a aba recém-criada ("Materiais Complementares") com links reais ou plugar o Forms a uma API.

## Papel
Atuar como um par de programação proativo. Revisar código, implementar e validar as atualizações visuais. Focar em design moderno e funcional (hub acadêmico).
