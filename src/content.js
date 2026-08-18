// ============================================================================
//  CONTEÚDO DO ESPAÇO DO LIGANTE — LAPSIC   (fonte: Planilha Google da Liga)
// ============================================================================
//
//  A DIRETORIA NÃO EDITA ESTE ARQUIVO. Cronograma, diretoria, eixos, textos e
//  listas de acesso são editados na PLANILHA GOOGLE (veja o "Manual da Diretoria").
//  Os ARQUIVOS (Repositório e Materiais) continuam vindo das pastas do Google Drive.
//
//  Este arquivo só é tocado UMA vez, na configuração inicial, para informar o ID
//  da planilha (constante SHEET_ID logo abaixo). Depois disso, ninguém mexe aqui.
// ============================================================================

import { createContext, useContext } from "react";
import { Brain, Pill, Briefcase, Heart, GraduationCap, BookOpen, Sparkles } from "lucide-react";

// ID da Planilha Google da Liga (o trecho do link entre /d/ e /edit).
export const SHEET_ID = "1NQ7ftiAUtxueWV4Gk85LCJnx4jYaLAfC1zSRAsZkEoU";

// Nomes das abas (mantenha EXATAMENTE assim, sem acento).
export const ABAS = {
  config: "Configuracoes",
  cronograma: "Cronograma",
  diretoria: "Diretoria",
  eixos: "Eixos",
  convidados: "Convidados",
};

// Pool de ícones para os eixos (atribuídos por ordem). Não precisa mexer.
const ICON_POOL = [Brain, Pill, Briefcase, Heart, GraduationCap, BookOpen, Sparkles];

// ----------------------------------------------------------------------------
//  CONTEÚDO PADRÃO (rede de segurança) — espelha o conteúdo atual 2026.1.
//  Se a planilha estiver indisponível, o site continua no ar com isto.
// ----------------------------------------------------------------------------
export const DEFAULT_CONFIG = {
  semestre: "2026.1",
  horario_curto: "Segundas, 19h — Online",
  horario_encontros: "Encontros: Segundas-feiras às 19h (Online)",
  hero_texto:
    "Que alegria ter você com a gente. Este espaço foi pensado e organizado para ser o seu principal guia durante a nossa jornada. Aqui, você encontrará todos os materiais dos nossos encontros, bibliografias complementares, cartilhas de apoio e muito mais. Explore, estude e sinta-se em casa. A Liga é feita por todos nós!",
  meet_link: "https://meet.google.com/mdn-ypng-bvm",
  instagram_url: "https://instagram.com/lapsic.mackenzie",
  instagram_handle: "@lapsic.mackenzie",
  contato_form_url:
    "https://docs.google.com/forms/d/e/1FAIpQLSfMU7fC3c1V6ZR6DhC5dKiZnIS_DNZgvqasNW6T4oTfYahDDQ/formResponse",
  materiais_folder_id: "1-O1EP1k58z8R787cqUI5JAGf9YN_8QIs",
  bibliografia_folder_id: "",
};

const DEFAULT_EIXOS_LIST = [
  { nome: "Ramificações da Clínica", cor: "#7B8F6B", link_pasta: "https://drive.google.com/drive/folders/11bSB80E5bVkextxafBG77bD-QpSs4T1r?usp=drive_link" },
  { nome: "Psicopatologia e Fármacos", cor: "#8B6B5A", link_pasta: "https://drive.google.com/drive/folders/1XFr13RZGVGDAEAYmLREMYxs1PM0QUDKS?usp=drive_link" },
  { nome: "Gestão e Burocracias da Clínica", cor: "#6B7B8F", link_pasta: "https://drive.google.com/drive/folders/1dyBa6jrcpi1zMxhOOnqwHbfOc41FLaM-?usp=drive_link" },
];

const DEFAULT_CRONOGRAMA = [
  { data: "23/02", tema: "Apresentação da Liga", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null, videos: [] },
  { data: "02/03", tema: "Psicoterapia Online", bib: "PSICOTERAPIA ONLINE: DEMANDA CRESCENTE E SUGESTÕES PARA REGULAMENTAÇÃO", bibAbnt: "Carmelita Gomes, Marcelo de Araújo", filePreview: "Psicoterapia Online.pdf", part: null, eixo: "Ramificações da Clínica", videos: [] },
  { data: "09/03", tema: "Psicoterapia Infantil", bib: "A Psicoterapia Infantil no Setting Clínico: Uma Revisão Sistemática de Literatura", bibAbnt: "Rosa Angela Cortez, Sarah Montezuma, Anna Karynne Melo e Virgínia Moreira", filePreview: "psi infantil.pdf", part: null, eixo: "Ramificações da Clínica", videos: [{ title: "Vídeo Complementar", url: "https://www.youtube.com/watch?v=2qQXsjUqSeQ" }] },
  { data: "16/03", tema: "Atendimento Emergencial", bib: "Implicações do Pronto-Atendimento Psicológico de Emergência aos que Vivenciam Perdas Significativas.", bibAbnt: "Airle Miranda de Souza e Danielle do Socorro & Victor Augusto Cavaleiro.", filePreview: "atendimento emergencial.pdf", part: null, eixo: "Ramificações da Clínica", videos: [] },
  { data: "23/03", tema: "Psicoterapia e Luto", bib: "LUTO_FREIRE, Anna.PDF", bibAbnt: "FREIRE, Anna Laura Leal; VANDENBERGHE, Luc. Perspectivas em análise do comportamento, v.16, n.02, p.154-164, 2025.", filePreview: "luto.pdf", part: "Gabriela Dantas Bertelli (@bertelligabs.psi)", eixo: "Ramificações da Clínica", videos: [] },
  { data: "30/03", tema: "Autodiagnóstico", bib: "Increasing self- and desired psychiatric diagnoses among emerging adults: Mixed-methods insights from clinical psychologists", bibAbnt: "Matthias Neumann, Verena Steiner-Hofbauer, Martin Aigner, Anna Höflich, Anita Holzinger e Gloria Mittmann", filePreview: "increasing self - sutodiagnóstico.pdf", part: null, eixo: "Psicopatologia e Fármacos", videos: [] },
  { data: "06/04", tema: "Interdisciplinaridade: Psicólogo e Psiquiatria", bib: "Interdisciplinaridade nas práticas de cuidado em saúde mental: uma revisão integrativa de literatura", bibAbnt:
