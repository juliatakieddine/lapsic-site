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

// ID da Planilha Google da Liga (o trecho do link entre /d/ e /edit).
export const SHEET_ID = "1NQ7ftiAUtxueWV4Gk85LCJnx4jYaLAfC1zSRAsZkEoU";

// Nomes das abas (mantenha EXATAMENTE assim, sem acento).
export const ABAS = {
  config: "Configuracoes",
  cronograma: "Cronograma",
  diretoria: "Diretoria",
  convidados: "Convidados",
};

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

const DEFAULT_CRONOGRAMA = [
  { data: "23/02", tema: "Apresentação da Liga", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null, videos: [] },
  { data: "02/03", tema: "Psicoterapia Online", bib: "PSICOTERAPIA ONLINE: DEMANDA CRESCENTE E SUGESTÕES PARA REGULAMENTAÇÃO", bibAbnt: "Carmelita Gomes, Marcelo de Araújo", filePreview: "Psicoterapia Online.pdf", part: null, eixo: "Ramificações da Clínica", videos: [] },
  { data: "09/03", tema: "Psicoterapia Infantil", bib: "A Psicoterapia Infantil no Setting Clínico: Uma Revisão Sistemática de Literatura", bibAbnt: "Rosa Angela Cortez, Sarah Montezuma, Anna Karynne Melo e Virgínia Moreira", filePreview: "psi infantil.pdf", part: null, eixo: "Ramificações da Clínica", videos: [{ title: "Vídeo Complementar", url: "https://www.youtube.com/watch?v=2qQXsjUqSeQ" }] },
  { data: "16/03", tema: "Atendimento Emergencial", bib: "Implicações do Pronto-Atendimento Psicológico de Emergência aos que Vivenciam Perdas Significativas.", bibAbnt: "Airle Miranda de Souza e Danielle do Socorro & Victor Augusto Cavaleiro.", filePreview: "atendimento emergencial.pdf", part: null, eixo: "Ramificações da Clínica", videos: [] },
  { data: "23/03", tema: "Psicoterapia e Luto", bib: "LUTO_FREIRE, Anna.PDF", bibAbnt: "FREIRE, Anna Laura Leal; VANDENBERGHE, Luc. Perspectivas em análise do comportamento, v.16, n.02, p.154-164, 2025.", filePreview: "luto.pdf", part: "Gabriela Dantas Bertelli (@bertelligabs.psi)", eixo: "Ramificações da Clínica", videos: [] },
  { data: "30/03", tema: "Autodiagnóstico", bib: "Increasing self- and desired psychiatric diagnoses among emerging adults: Mixed-methods insights from clinical psychologists", bibAbnt: "Matthias Neumann, Verena Steiner-Hofbauer, Martin Aigner, Anna Höflich, Anita Holzinger e Gloria Mittmann", filePreview: "increasing self - sutodiagnóstico.pdf", part: null, eixo: "Psicopatologia e Fármacos", videos: [] },
  { data: "06/04", tema: "Interdisciplinaridade: Psicólogo e Psiquiatria", bib: "Interdisciplinaridade nas práticas de cuidado em saúde mental: uma revisão integrativa de literatura", bibAbnt: "Eduardo Giacomini e Maria Lucia Frizon", filePreview: "Interdisciplinaridade nas práticas de cuidado em saúde mental- uma revisão integrativa de literatura.pdf", part: "Profa. Me. Camila Rennhard (@camilarennhard) e Nádia Faris (@psiquiatra.nadiafaris)", eixo: "Psicopatologia e Fármacos", videos: [] },
  { data: "13/04", tema: "Psicoterapia e Medicalização", bib: "Da recusa à demanda de diagnóstico: novos arranjos da medicalização", bibAbnt: "Mariana Ferreira Pombo", filePreview: "bibliografia - psicopatologia e medicalização.docx", part: "Liga de Psicofarmacologia", eixo: "Psicopatologia e Fármacos", videos: [] },
  { data: "20/04", tema: "Feriado (sem encontro)", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null, videos: [] },
  { data: "27/04", tema: "Discussão de Caso", bib: "A Clínica do Não-Acontecido e os encontros possíveis em análise -📌 Capítulo 4: O Caso Vanessa -📌 Capítulo 6: A Clínica do Não-Acontecido", bibAbnt: "MELLO, C.R.B. A Clínica do Não-Acontecido e os encontros possíveis em análise. Dissertação (Mestrado em Psicologia Clínica) – Pontifícia Universidade Católica de São Paulo, São Paulo, 2024.", filePreview: null, part: "Profa. Me. Camila Rennhard (@camilarennhard)", eixo: "Psicopatologia e Fármacos", videos: [] },
  { data: "04/05", tema: "Gestão da Clínica", bib: "A clínica psicológica: legislação, estruturação e gestão", bibAbnt: "Cleonice Barros, Daniela Rodrigues, Douglas Campos, Ildejane Gomes e Priscilla Mota", filePreview: "Bibliografia - Gestão e burocracia de clínica.docx", part: null, eixo: "Gestão e Burocracias da Clínica", videos: [] },
  { data: "11/05", tema: "Desenvolvimento de Clínica", bib: "1. Contratos psicológicos: uma revisão da literatura.\n\n2. Reflexões sobre o contrato terapêutico como instrumento de autorregulação do terapeuta.", bibAbnt: "1. Letícia Fantinato Menegon e Tania Casado.\n\n2. Gladys Costa de Moraes.", filePreview: "Admin,+1920-5174-1-RV-34-43.pdf", part: null, eixo: "Gestão e Burocracias da Clínica", videos: [{ title: "Modelos de Contratos (Link do CRP)", url: "https://www.crp-01.org.br/page_3952/Modelos%20de%20Contratos?utm_source=chatgpt.com", isLink: true }] },
  { data: "18/05", tema: "Educação Financeira na Clínica", bib: "\"Qual o valor da consulta?\": Crenças, Critérios e Estratégias de Precificação e Cobrança de Psicoterapeutas", bibAbnt: "Jéssica Florinda", filePreview: "DissertaoJssica.pdf", part: null, eixo: "Gestão e Burocracias da Clínica", videos: [] },
  { data: "25/05", tema: "Marketing e Captação de Pacientes", bib: "1. Plataformização do Trabalho na Psicologia Clínica: Atendimento online, tecnoestresse e produção de conteúdos em mídias sociais.\n\n2. O PAPEL DO MARKETING NA GESTÃO DE SERVIÇOS DE SAÚDE: O CASO DO GRUPO DA CLÍNICA SANTA MADALENA.", bibAbnt: "1. Matheus Viana, Amanda Thuns, Caroline de Cuffa, Thiago Casemiro, Victor Martins e Yasmin Alexandre.\n\n2. António Morão, Carlos Brito, Sónia Nogueira, Rui Dias e Rosa Galvão.", filePreview: "13561_2018_Article_213.pdf", part: null, eixo: "Gestão e Burocracias da Clínica", videos: [] },
  { data: "01/06", tema: "Encerramento e Feedback do Semestre", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null, videos: [] },
];

const DEFAULT_DIRETORIA = [
  { nome: "Isabela Scaramuzza Kondor", ra: "10400944", email: "isabela.kondor2509@gmail.com", tel: "(11) 96326-5900", foto: "/diretoria/isabela.jpg" },
  { nome: "Julia Takieddine", ra: "10396144", email: "juliataki08@gmail.com", tel: "(11) 94072-7276", foto: "/diretoria/julia.png" },
  { nome: "Bruno Apollaro Zanin", ra: "10723241", email: "bruno.a.zanin2006@gmail.com", tel: "(11) 98679-0264", foto: "/diretoria/bruno.png" },
  { nome: "Marcella Mazanati", ra: "10410025", email: "mazanatj@gmail.com", tel: "(11) 99639-9056", foto: "/diretoria/marcella.jpg" },
];

const DEFAULT_CONVIDADOS = ["suguidiane@gmail.com", "yasmimsalves@hotmail.com"];

// ----------------------------------------------------------------------------
//  Helpers de construção
// ----------------------------------------------------------------------------
function folderIdFromLink(link) {
  if (!link) return "";
  const m = String(link).match(/\/folders\/([A-Za-z0-9_-]+)/);
  if (m) return m[1];
  // caso já seja só o ID
  const t = String(link).trim();
  return /^[A-Za-z0-9_-]{20,}$/.test(t) ? t : "";
}

function buildDefaultContent() {
  return {
    config: { ...DEFAULT_CONFIG },
    bibliografiaFolderId: DEFAULT_CONFIG.bibliografia_folder_id,
    materiaisFolderId: DEFAULT_CONFIG.materiais_folder_id,
    cronograma: DEFAULT_CRONOGRAMA,
    diretoria: DEFAULT_DIRETORIA,
    authorizedDirectors: DEFAULT_DIRETORIA.map((d) => (d.email || "").toLowerCase()).filter(Boolean),
    authorizedGuests: DEFAULT_CONVIDADOS.map((e) => e.toLowerCase()),
  };
}

export const DEFAULT_CONTENT = buildDefaultContent();

// ----------------------------------------------------------------------------
//  Leitura da planilha (CSV via gviz). Não precisa entender / não mexer.
// ----------------------------------------------------------------------------
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === "\r") { /* ignora */ }
      else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function normHeader(h) {
  return (h || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
}

function rowsToObjects(rows) {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map(normHeader);
  const out = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    if (!cells || cells.every((c) => (c || "").trim() === "")) continue;
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (cells[i] || "").trim(); });
    out.push(obj);
  }
  return out;
}

function csvUrl(aba) {
  return "https://docs.google.com/spreadsheets/d/" + SHEET_ID +
    "/gviz/tq?tqx=out:csv&sheet=" + encodeURIComponent(aba);
}

async function fetchAba(aba) {
  const resp = await fetch(csvUrl(aba));
  if (!resp.ok) throw new Error("Falha ao ler a aba " + aba);
  return rowsToObjects(parseCSV(await resp.text()));
}

const isConfigured = () => SHEET_ID && !SHEET_ID.startsWith("COLE_");

// Lê a planilha e devolve o conteúdo. Cada aba é lida de forma independente:
// se uma aba falhar ou não existir, aquela parte usa o conteúdo padrão.
export async function fetchContent() {
  if (!isConfigured()) return DEFAULT_CONTENT;

  const [configR, cronoR, diretoriaR, convidadosR] = await Promise.all(
    [ABAS.config, ABAS.cronograma, ABAS.diretoria, ABAS.convidados].map((aba) =>
      fetchAba(aba).catch(() => null)
    )
  );

  // Config
  const config = { ...DEFAULT_CONFIG };
  if (configR) {
    configR.forEach((r) => {
      const chave = normHeader(r.chave || r.campo || "");
      if (chave && r.valor !== undefined && r.valor !== "") config[chave] = r.valor;
    });
  }

  // Cronograma
  let cronograma = DEFAULT_CRONOGRAMA;
  if (cronoR && cronoR.length) {
    cronograma = cronoR
      .filter((r) => (r.data || "").trim() !== "" || (r.tema || "").trim() !== "")
      .map((r) => {
        const videoUrl = r.video_url || r.video || "";
        const videos = videoUrl
          ? [{ title: r.video_titulo || r.video_title || "Vídeo Complementar", url: videoUrl }]
          : [];
        return {
          data: r.data || "",
          tema: r.tema || "",
          bib: r.bibliografia || r.bib || null,
          bibAbnt: r.referencia || r.referencia_abnt || r.abnt || r.bibabnt || null,
          filePreview: r.arquivo || r.arquivo_preview || r.preview || null,
          part: r.palestrante || r.part || null,
          videos,
        };
      });
  }

  // Diretoria (+ e-mails de diretores)
  let diretoria = DEFAULT_DIRETORIA;
  if (diretoriaR && diretoriaR.length) {
    diretoria = diretoriaR
      .filter((r) => (r.nome || "").trim() !== "")
      .map((r) => ({
        nome: r.nome || "",
        ra: r.ra || "",
        email: r.email || r["e-mail"] || "",
        tel: r.telefone || r.tel || "",
        foto: r.foto || r.foto_url || "",
      }));
  }
  const authorizedDirectors = diretoria.map((d) => (d.email || "").toLowerCase()).filter(Boolean);

  // Convidados
  let authorizedGuests = DEFAULT_CONTENT.authorizedGuests;
  if (convidadosR) {
    const list = convidadosR
      .map((r) => (r.email || r["e-mail"] || r.convidado || "").toLowerCase().trim())
      .filter(Boolean);
    authorizedGuests = list; // aba existe → usa exatamente o que estiver nela (pode estar vazia)
  }

  return {
    config,
    bibliografiaFolderId: folderIdFromLink(config.bibliografia_pasta) || config.bibliografia_folder_id || DEFAULT_CONFIG.bibliografia_folder_id,
    materiaisFolderId: folderIdFromLink(config.materiais_pasta) || config.materiais_folder_id || DEFAULT_CONFIG.materiais_folder_id,
    cronograma: cronograma.length ? cronograma : DEFAULT_CRONOGRAMA,
    diretoria: diretoria.length ? diretoria : DEFAULT_DIRETORIA,
    authorizedDirectors: authorizedDirectors.length ? authorizedDirectors : DEFAULT_CONTENT.authorizedDirectors,
    authorizedGuests,
  };
}

// ----------------------------------------------------------------------------
//  Contexto React para o conteúdo
// ----------------------------------------------------------------------------
export const ContentContext = createContext(DEFAULT_CONTENT);
export function useContent() {
  return useContext(ContentContext);
}
