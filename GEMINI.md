# Contexto Gemini

- Integrado `lucide-react` para iconografia unificada.
- Trocados botões estáticos para envio por Google Forms encapsulado localmente.
- Link de vídeos embutidos perfeitamente aos avisos mensais extraídos do Cronograma em PDF via subagente.
- Documentos repositório expõem `title` semânticos sobre `name` estritos de arquivos, além de mapeamento global com URL públicas via nuvem.
- **Login Dinâmico/Gateway:** Portal envelopado sob o componente `<LoginScreen />` verificando contra `AUTHORIZED_EMAILS` e domínios terminados em `@mackenzista.com.br`.

## Histórico de Interações (Sessão Pre-Estreia/Finalização):

O site da LAPSIC obteve sua maturação estrutural de gestão nesta frente de trabalho. O painel agora funciona com RLS (Row Level Security) simulado na visualização: Quando os usuários autenticados pertencem à lista estrita da Diretoria (e.g. `isDirector`), eles ganham acesso à aba lateral **Módulo da Diretoria**.
Neste módulo, em vez de iframes complexos, utilizamos cards com links simples e explicativos apontando para pastas autorizadas do **Google Drive**, permitindo a gestão em tempo real do acervo por diretores sem exigir código novo. Todo o _array_ `REPOSITORIO` também foi 100% calibrado para espelhar identicamente os papéis inseridos nas pastas do Drive público.
Para finalização visual:

1. Trocou-se o Logotipo do "Vite" no Head do site para um **Favicon SVG em verde sálvia** contendo a letra "Ψ" (Psicologia).
2. Adicionado Botão Funcional de Log-out para zerar o Storage local.
3. Link Oficial do Google Meet (`https://meet.google.com/mdn-ypng-bvm`) da Diretoria implementado no "HeroBanner" para todos os encontros programados (Segundas-feiras, 19h).

## Papel

Atuar como um par de programação proativo. Revisar código, implementar e validar as atualizações visuais. Focar em design moderno, autêntico e funcional voltado para o acadêmico de psicologia.
