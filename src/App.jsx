import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  BookOpen, Calendar, Users, MessageSquare, Bell, ExternalLink,
  Mail, Phone, ChevronDown, ChevronRight, Clock, MapPin,
  Sparkles, Send, Eye, FileText, Video, Globe, Menu, X,
  GraduationCap, Heart, Brain, Pill, Briefcase, AlertTriangle,
  CheckCircle, ArrowRight, Moon, Sun, Folder, File, Download, Play, PlayCircle, Search, FileArchive, Library, Instagram, Shield, Cloud, LogOut
} from "lucide-react";

const LIGHT_COLORS = {
  sage: "#7B8F6B",
  sageDark: "#5A6B4D",
  sageLight: "#A8B89A",
  cream: "#F5F0E8",
  creamDark: "#E8E0D0",
  warmWhite: "#FDFBF7",
  charcoal: "#2C2C2C",
  softBlack: "#1A1A1A",
  warmGray: "#6B6560",
  accent: "#C4956A",
  accentLight: "#D4AD8A",
  moss: "#4A5E3C",
  mist: "#E8EDE4",
};

const DARK_COLORS = {
  sage: "#8CA17C",
  sageDark: "#7B9468",
  sageLight: "#6B8B5A",
  cream: "#1B1D1B",
  creamDark: "#2A2E2A",
  warmWhite: "#232623",
  charcoal: "#E2DED6",
  softBlack: "#ECE8E0",
  warmGray: "#9E9890",
  accent: "#D4A57A",
  accentLight: "#C49568",
  moss: "#7B9F68",
  mist: "#2A3528",
};

const ThemeContext = createContext(LIGHT_COLORS);
ThemeContext.displayName = "ThemeContext";

const PsiIcon = ({ size = 24, color = "currentColor", style }) => (
  <span style={{ fontSize: size, color: color, fontFamily: "'Playfair Display', serif", lineHeight: 1, fontWeight: 500, ...style }}>
    Ψ
  </span>
);

const EIXOS = {
  "Ramificações da Clínica": { color: "#7B8F6B", icon: Brain, driveLink: "https://drive.google.com/drive/folders/11bSB80E5bVkextxafBG77bD-QpSs4T1r?usp=drive_link" },
  "Psicopatologia e Fármacos": { color: "#8B6B5A", icon: Pill, driveLink: "https://drive.google.com/drive/folders/1XFr13RZGVGDAEAYmLREMYxs1PM0QUDKS?usp=drive_link" },
  "Gestão e Burocracias da Clínica": { color: "#6B7B8F", icon: Briefcase, driveLink: "https://drive.google.com/drive/folders/1dyBa6jrcpi1zMxhOOnqwHbfOc41FLaM-?usp=drive_link" },
};

const CRONOGRAMA = [
  { data: "23/02", tema: "Apresentação da Liga", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null },
  { data: "02/03", tema: "Psicoterapia Online", bib: "PSICOTERAPIA ONLINE: DEMANDA CRESCENTE E SUGESTÕES PARA REGULAMENTAÇÃO", bibAbnt: "Carmelita Gomes, Marcelo de Araújo", filePreview: "Psicoterapia Online.pdf", part: null, eixo: "Ramificações da Clínica" },
  { data: "09/03", tema: "Psicoterapia Infantil", bib: "A Psicoterapia Infantil no Setting Clínico: Uma Revisão Sistemática de Literatura", bibAbnt: "Rosa Angela Cortez, Sarah Montezuma, Anna Karynne Melo e Virgínia Moreira", filePreview: "psi infantil.pdf", part: null, eixo: "Ramificações da Clínica", videos: [{ title: "Vídeo Complementar", url: "https://www.youtube.com/watch?v=2qQXsjUqSeQ" }] },
  { data: "16/03", tema: "Atendimento Emergencial", bib: "Implicações do Pronto-Atendimento Psicológico de Emergência aos que Vivenciam Perdas Significativas.", bibAbnt: "Airle Miranda de Souza e Danielle do Socorro & Victor Augusto Cavaleiro.", filePreview: "atendimento emergencial.pdf", part: null, eixo: "Ramificações da Clínica" },
  { data: "23/03", tema: "Psicoterapia e Luto", bib: "LUTO_FREIRE, Anna.PDF", bibAbnt: "FREIRE, Anna Laura Leal; VANDENBERGHE, Luc. Perspectivas em análise do comportamento, v.16, n.02, p.154-164, 2025.", filePreview: "luto.pdf", part: "Gabriela Dantas Bertelli (@bertelligabs.psi)", eixo: "Ramificações da Clínica" },
  { data: "30/03", tema: "Autodiagnóstico", bib: "Increasing self- and desired psychiatric diagnoses among emerging adults: Mixed-methods insights from clinical psychologists", bibAbnt: "Matthias Neumann, Verena Steiner-Hofbauer, Martin Aigner, Anna Höflich, Anita Holzinger e Gloria Mittmann", filePreview: "increasing self - sutodiagnóstico.pdf", part: null, eixo: "Psicopatologia e Fármacos" },
  { data: "06/04", tema: "Interdisciplinaridade: Psicólogo e Psiquiatria", bib: "Interdisciplinaridade nas práticas de cuidado em saúde mental: uma revisão integrativa de literatura", bibAbnt: "Eduardo Giacomini e Maria Lucia Frizon", filePreview: "Interdisciplinaridade nas práticas de cuidado em saúde mental- uma revisão integrativa de literatura.pdf", part: "Profa. Me. Camila Rennhard (@camilarennhard) e Nádia Faris (@psiquiatra.nadiafaris)", eixo: "Psicopatologia e Fármacos" },
  { data: "13/04", tema: "Psicoterapia e Medicalização", bib: "Da recusa à demanda de diagnóstico: novos arranjos da medicalização", bibAbnt: "Mariana Ferreira Pombo", filePreview: "bibliografia - psicopatologia e medicalização.docx", part: "Liga de Psicofarmacologia", eixo: "Psicopatologia e Fármacos" },
  { data: "20/04", tema: "Feriado (sem encontro)", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null },
  { data: "27/04", tema: "Discussão de Caso", bib: "A Clínica do Não-Acontecido e os encontros possíveis em análise -📌 Capítulo 4: O Caso Vanessa -📌 Capítulo 6: A Clínica do Não-Acontecido", bibAbnt: "MELLO, C.R.B. A Clínica do Não-Acontecido e os encontros possíveis em análise. Dissertação (Mestrado em Psicologia Clínica) – Pontifícia Universidade Católica de São Paulo, São Paulo, 2024.", filePreview: null, part: "Profa. Me. Camila Rennhard (@camilarennhard)", eixo: "Psicopatologia e Fármacos" },
  { data: "04/05", tema: "Gestão da Clínica", bib: "A clínica psicológica: legislação, estruturação e gestão", bibAbnt: "Cleonice Barros, Daniela Rodrigues, Douglas Campos, Ildejane Gomes e Priscilla Mota", filePreview: "Bibliografia - Gestão e burocracia de clínica.docx", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "11/05", tema: "Desenvolvimento de Clínica", bib: "1. Contratos psicológicos: uma revisão da literatura.\n\n2. Reflexões sobre o contrato terapêutico como instrumento de autorregulação do terapeuta.", bibAbnt: "1. Letícia Fantinato Menegon e Tania Casado.\n\n2. Gladys Costa de Moraes.", filePreview: "Admin,+1920-5174-1-RV-34-43.pdf", part: null, eixo: "Gestão e Burocracias da Clínica", videos: [{ title: "Modelos de Contratos (Link do CRP)", url: "https://www.crp-01.org.br/page_3952/Modelos%20de%20Contratos?utm_source=chatgpt.com", isLink: true }] },
  { data: "18/05", tema: "Educação Financeira na Clínica", bib: "\"Qual o valor da consulta?\": Crenças, Critérios e Estratégias de Precificação e Cobrança de Psicoterapeutas", bibAbnt: "Jéssica Florinda", filePreview: "DissertaoJssica.pdf", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "25/05", tema: "Marketing e Captação de Pacientes", bib: "1. Plataformização do Trabalho na Psicologia Clínica: Atendimento online, tecnoestresse e produção de conteúdos em mídias sociais.\n\n2. O PAPEL DO MARKETING NA GESTÃO DE SERVIÇOS DE SAÚDE: O CASO DO GRUPO DA CLÍNICA SANTA MADALENA.", bibAbnt: "1. Matheus Viana, Amanda Thuns, Caroline de Cuffa, Thiago Casemiro, Victor Martins e Yasmin Alexandre.\n\n2. António Morão, Carlos Brito, Sónia Nogueira, Rui Dias e Rosa Galvão.", filePreview: "13561_2018_Article_213.pdf", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "01/06", tema: "Encerramento e Feedback do Semestre", bib: null, bibAbnt: null, filePreview: null, part: null, eixo: null },
];

const DRIVE_API_KEY = "AIzaSyC_61aHyJFzGvZNg7Yg4kcWsn2o3GopCRk";
const MATERIAIS_FOLDER_ID = "1-O1EP1k58z8R787cqUI5JAGf9YN_8QIs";
const REPOSITORIO_FOLDERS = [
  { folder: "Ramificações da Clínica", id: "11bSB80E5bVkextxafBG77bD-QpSs4T1r" },
  { folder: "Psicopatologia e Fármacos", id: "1XFr13RZGVGDAEAYmLREMYxs1PM0QUDKS" },
  { folder: "Gestão e Burocracias da Clínica", id: "1dyBa6jrcpi1zMxhOOnqwHbfOc41FLaM-" },
];

function getFileIcon(mimeType) {
  if (!mimeType) return FileText;
  if (mimeType.includes("pdf")) return FileText;
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return FileArchive;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return FileArchive;
  if (mimeType.includes("document") || mimeType.includes("word")) return FileText;
  if (mimeType.includes("video")) return Video;
  if (mimeType.includes("folder")) return Folder;
  return File;
}

function getFileTypeLabel(mimeType) {
  if (!mimeType) return "Arquivo";
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "PPT";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "XLS";
  if (mimeType.includes("document") || mimeType.includes("word")) return "DOC";
  if (mimeType.includes("video")) return "Vídeo";
  if (mimeType.includes("folder")) return "Pasta";
  if (mimeType.includes("google-apps.document")) return "Doc";
  if (mimeType.includes("google-apps.presentation")) return "Slides";
  if (mimeType.includes("google-apps.spreadsheet")) return "Planilha";
  return "Arquivo";
}

function formatDriveDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const DIRETORIA = [
  { nome: "Isabela Scaramuzza Kondor", ra: "10400944", email: "isabela.kondor2509@gmail.com", tel: "(11) 96326-5900", foto: "/diretoria/isabela.jpg" },
  { nome: "Julia Takieddine", ra: "10396144", email: "juliataki08@gmail.com", tel: "(11) 94072-7276", foto: "/diretoria/julia.png" },
  { nome: "Bruno Apollaro Zanin", ra: "10723241", email: "bruno.a.zanin2006@gmail.com", tel: "(11) 98679-0264", foto: "/diretoria/bruno.png" },
  { nome: "Marcella Mazanati", ra: "10410025", email: "mazanatj@gmail.com", tel: "(11) 99639-9056", foto: "/diretoria/marcella.jpg" },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  const colors = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px",
        borderRadius: "10px", border: "none", cursor: "pointer", width: "100%",
        textAlign: "left", fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
        fontWeight: active ? 600 : 400,
        background: active ? colors.mist : "transparent",
        color: active ? colors.moss : colors.warmGray,
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = colors.cream; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

function EixoTag({ eixo }) {
  if (!eixo || !EIXOS[eixo]) return null;
  const { color, icon: Icon } = EIXOS[eixo];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
      fontWeight: 500, background: color + "18", color: color,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Icon size={12} />
      {eixo}
    </span>
  );
}

function HeroSection() {
  const colors = useContext(ThemeContext);
  return (
    <FadeIn>
      <div className="hero-section" style={{
        position: "relative", borderRadius: "20px", overflow: "hidden",
        background: `linear-gradient(135deg, ${colors.moss} 0%, ${colors.sage} 50%, ${colors.sageLight} 100%)`,
        padding: "48px 40px", color: "white", marginBottom: "32px",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)`,
        }} />
        <div style={{
          position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px",
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
        }} />
        <div style={{
          position: "absolute", bottom: "-30px", right: "60px", width: "120px", height: "120px",
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <PsiIcon size={18} style={{ opacity: 0.9 }} />
            <span style={{ fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase", opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>
              LAPSIC — Liga Acadêmica de Psicologia Clínica
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.3,
            fontFamily: "'Playfair Display', serif", marginBottom: "12px", maxWidth: "600px",
          }}>
            Bem-vindo(a) ao<br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Espaço do Ligante</span>
          </h1>
          <p style={{
            fontSize: "15px", opacity: 0.85, maxWidth: "560px", lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          }}>
            Que alegria ter você com a gente. Este espaço foi pensado e organizado para ser o seu principal guia durante a nossa jornada. Aqui, você encontrará todos os materiais dos nossos encontros, bibliografias complementares, cartilhas de apoio e muito mais. Explore, estude e sinta-se em casa. A Liga é feita por todos nós!
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="https://meet.google.com/mdn-ypng-bvm"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
                borderRadius: "12px", background: "white", color: colors.sage,
                textDecoration: "none", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
            >
              <Video size={18} />
              Entrar no Meet
            </a>
            <a
              href="https://instagram.com/lapsic.mackenzie"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
                borderRadius: "12px", background: "rgba(255,255,255,0.15)", color: "white",
                textDecoration: "none", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            >
              <Instagram size={18} />
              @lapsic.mackenzie
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function MuralAvisos({ goToRepositorioEixo }) {
  const colors = useContext(ThemeContext);

  const today = new Date();
  let nextMeeting = CRONOGRAMA.find(c => {
    if (!c.data || c.tema.includes("Feriado")) return false;
    const [d, m] = c.data.split("/");
    const date = new Date(today.getFullYear(), parseInt(m) - 1, parseInt(d), 23, 59, 59);
    return date >= today;
  });

  if (!nextMeeting) {
    nextMeeting = CRONOGRAMA.find(c => c.data === "23/02") || CRONOGRAMA[0];
  }

  return (
    <FadeIn delay={0.15}>
      <div style={{
        borderRadius: "16px", overflow: "hidden", marginBottom: "32px",
        background: colors.warmWhite, border: `1px solid ${colors.creamDark}`,
      }}>
        <div style={{
          padding: "16px 24px", display: "flex", alignItems: "center", gap: "10px",
          borderBottom: `1px solid ${colors.creamDark}`,
          background: colors.cream,
        }}>
          <Bell size={16} color={colors.sage} />
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: colors.sage, fontFamily: "'DM Sans', sans-serif" }}>
            Mural de Avisos
          </span>
        </div>
        <div style={{ padding: "24px" }}>
          {/* DESTAQUE PERMANENTE DO FORMATO */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            padding: "16px", borderRadius: "12px", background: colors.sage, color: "white",
            marginBottom: "24px", boxShadow: `0 4px 12px ${colors.sage}40`
          }}>
            <Calendar size={18} />
            <span style={{ fontSize: "15px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px" }}>
              Encontros: Segundas-feiras às 19h (Online)
            </span>
          </div>

          <div style={{
            display: "flex", alignItems: "flex-start", gap: "16px",
            padding: "20px", borderRadius: "12px",
            background: `linear-gradient(135deg, ${colors.sage}08, ${colors.sage}15)`,
            border: `1px solid ${colors.sage}20`,
            marginBottom: "16px", flexWrap: "wrap"
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: colors.sage, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: colors.sage, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                Próximo Encontro: {nextMeeting.data}
              </div>
              <div style={{ fontSize: "18px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>
                {nextMeeting.tema}
              </div>
              {nextMeeting.bib && (
                <div style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, marginBottom: "12px" }}>
                  {nextMeeting.isDocs ? (
                    <em>{nextMeeting.bib}</em>
                  ) : (
                    <>Leitura: <em>{nextMeeting.bib}</em></>
                  )}
                  {nextMeeting.bibAbnt && (
                    <div style={{ fontSize: "11px", marginTop: "4px", color: colors.warmGray, opacity: 0.8 }}>
                      {nextMeeting.bibAbnt}
                    </div>
                  )}
                </div>
              )}
              {(!nextMeeting.bib && (!nextMeeting.videos || nextMeeting.videos.length === 0) && !nextMeeting.filePreview) && (
                <div style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, marginBottom: "12px", fontStyle: "italic" }}>
                  Não há materiais de leitura ou vídeos para o próximo encontro!
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: (!nextMeeting.bib && (!nextMeeting.videos || nextMeeting.videos.length === 0) && !nextMeeting.filePreview) ? 0 : "16px" }}>
                {nextMeeting.bib && (
                  <button
                    onClick={() => goToRepositorioEixo(nextMeeting.eixo)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "8px 16px", borderRadius: "8px",
                      background: colors.sage, color: "white", border: "none",
                      fontSize: "13px", fontWeight: 500, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.moss}
                    onMouseLeave={(e) => e.currentTarget.style.background = colors.sage}
                  >
                    <Folder size={14} />
                    Ver no Repositório
                  </button>
                )}
                {nextMeeting.videos && nextMeeting.videos.map((vid, idx) => (
                  <a
                    key={idx}
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "8px 16px", borderRadius: "8px",
                      background: colors.accent + "20", color: colors.accent,
                      border: "none", textDecoration: "none",
                      fontSize: "13px", fontWeight: 500, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.accent + "30"}
                    onMouseLeave={(e) => e.currentTarget.style.background = colors.accent + "20"}
                  >
                    <PlayCircle size={14} />
                    {vid.title}
                  </a>
                ))}
              </div>
            </div>
            {nextMeeting.filePreview && (
              <div style={{
                padding: "16px", borderRadius: "8px", background: colors.warmWhite,
                border: `1px solid ${colors.creamDark}`, display: "flex", flexDirection: "column",
                alignItems: "center", gap: "8px", minWidth: "140px", cursor: "pointer", transition: "all 0.2s"
              }}
                onClick={() => goToRepositorioEixo(nextMeeting.eixo)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.sage; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.creamDark; e.currentTarget.style.transform = "none" }}
              >
                <FileText size={28} color={colors.sage} />
                <span style={{ fontSize: "11px", textAlign: "center", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", wordBreak: "break-word" }}>
                  {nextMeeting.filePreview}
                </span>
                <span style={{ fontSize: "10px", color: colors.sage, fontWeight: 600 }}>PREVIEW</span>
              </div>
            )}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "14px 16px", borderRadius: "10px",
            background: colors.accent + "12", border: `1px solid ${colors.accent}25`,
          }}>
            <AlertTriangle size={16} color={colors.accent} />
            <span style={{ fontSize: "13px", color: colors.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              Não se esqueça de preencher o Forms de presença que será enviado durante o encontro!
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CronogramaSection() {
  const colors = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(null);
  const [filterEixo, setFilterEixo] = useState(null);
  const filtered = filterEixo ? CRONOGRAMA.filter((c) => c.eixo === filterEixo) : CRONOGRAMA;

  const isPast = (dataStr) => {
    if (!dataStr) return false;
    const [d, m] = dataStr.split("/");
    const date = new Date(new Date().getFullYear(), parseInt(m) - 1, parseInt(d));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <FadeIn delay={0.2}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>
              Cronograma 2026.1
            </h2>
            <p style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ fontStyle: "italic" }}>Os encontros abaixo estão categorizados e divididos pelos 3 grandes Eixos Temáticos.</span>
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          <button
            onClick={() => setFilterEixo(null)}
            style={{
              padding: "6px 14px", borderRadius: "20px", border: `1px solid ${!filterEixo ? colors.sage : colors.creamDark}`,
              background: !filterEixo ? colors.sage + "15" : "transparent",
              color: !filterEixo ? colors.sage : colors.warmGray,
              fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
          >
            Todos
          </button>
          {Object.entries(EIXOS).map(([name, { color }]) => (
            <button
              key={name}
              onClick={() => setFilterEixo(name)}
              style={{
                padding: "6px 14px", borderRadius: "20px",
                border: `1px solid ${filterEixo === name ? color : colors.creamDark}`,
                background: filterEixo === name ? color + "15" : "transparent",
                color: filterEixo === name ? color : colors.warmGray,
                fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.map((item, i) => {
            const isHoliday = item.tema.includes("Feriado");
            const isOpen = expanded === i;
            const past = isPast(item.data);
            return (
              <div
                key={i}
                style={{
                  borderRadius: "12px", overflow: "hidden",
                  background: isHoliday ? colors.cream : past ? colors.creamDark : colors.warmWhite,
                  border: `1px solid ${colors.creamDark}`,
                  opacity: isHoliday ? 0.6 : past ? 0.5 : 1,
                  transition: "all 0.25s",
                }}
              >
                <div
                  onClick={() => !isHoliday && setExpanded(isOpen ? null : i)}
                  style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "16px 20px", cursor: isHoliday ? "default" : "pointer",
                  }}
                  onMouseEnter={(e) => { if (!isHoliday) e.currentTarget.style.background = colors.cream + "80" }}
                  onMouseLeave={(e) => { if (!isHoliday) e.currentTarget.style.background = "transparent" }}
                >
                  <div style={{
                    width: "52px", textAlign: "center", flexShrink: 0,
                  }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", lineHeight: 1 }}>
                      {item.data.split("/")[0]}
                    </div>
                    <div style={{ fontSize: "11px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                      /{item.data.split("/")[1]}
                    </div>
                  </div>
                  <div style={{ width: "3px", height: "32px", borderRadius: "2px", background: item.eixo ? EIXOS[item.eixo].color + "40" : colors.creamDark, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 500, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      {item.tema}
                      {item.videos && item.videos.length > 0 && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", background: colors.accent + "15", color: colors.accent, padding: "2px 8px", borderRadius: "10px" }}>
                          {item.videos.some(v => v.isLink) ? <ExternalLink size={12} /> : <PlayCircle size={12} />}
                          {item.videos.some(v => v.isLink) ? "Link disponível" : "Vídeo disponível"}
                        </span>
                      )}
                    </div>
                    {item.eixo && <div style={{ marginTop: "4px" }}><EixoTag eixo={item.eixo} /></div>}
                  </div>
                  {item.part && (
                    <div className="palestrante-badge" style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      padding: "4px 10px", borderRadius: "20px",
                      background: colors.accent + "15", flexShrink: 0,
                    }}>
                      <Users size={12} color={colors.accent} />
                      <span style={{ fontSize: "11px", color: colors.accent, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Palestrante</span>
                    </div>
                  )}
                  {!isHoliday && (
                    <ChevronDown
                      size={16}
                      color={colors.warmGray}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.25s", flexShrink: 0,
                      }}
                    />
                  )}
                </div>
                {isOpen && (
                  <div className="cronograma-detail" style={{
                    padding: "0 20px 16px 88px",
                    borderTop: `1px solid ${colors.creamDark}`,
                    paddingTop: "16px",
                  }}>
                    {item.bib && (
                      <div style={{ marginBottom: item.part ? "12px" : 0 }}>
                        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: colors.sage, marginBottom: "4px", fontFamily: "'DM Sans', sans-serif" }}>
                          Bibliografia e Materiais
                        </div>
                        <div style={{ fontSize: "13px", color: colors.warmGray, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", marginBottom: item.videoUrl ? "8px" : "0", whiteSpace: "pre-line" }}>
                          {item.bib}
                          {item.bibAbnt && (
                            <div style={{ fontSize: "11px", marginTop: "4px", color: colors.warmGray, opacity: 0.8, lineHeight: 1.4, whiteSpace: "pre-line" }}>
                              {item.bibAbnt}
                            </div>
                          )}
                        </div>
                        {item.videos && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                            {item.videos.map((vid, idx) => (
                              <a key={idx} href={vid.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: colors.accent, textDecoration: "none", fontWeight: 500, background: colors.accent + "15", padding: "6px 12px", borderRadius: "16px", transition: "all 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.background = colors.accent + "30"}
                                onMouseLeave={e => e.currentTarget.style.background = colors.accent + "15"}
                              >
                                {vid.isLink ? <ExternalLink size={14} /> : <PlayCircle size={14} />} {vid.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {item.part && (
                      <div style={{ marginTop: "12px" }}>
                        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: colors.accent, marginBottom: "4px", fontFamily: "'DM Sans', sans-serif" }}>
                          Participação Especial
                        </div>
                        <div style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                          {item.part}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}

function RepositorioSection({ activeFolder, setActiveFolder }) {
  const colors = useContext(ThemeContext);
  const [folderFiles, setFolderFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [errorFiles, setErrorFiles] = useState(null);
  const [folderCounts, setFolderCounts] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadCounts() {
      const counts = {};
      await Promise.all(
        REPOSITORIO_FOLDERS.map(async ({ folder, id }) => {
          try {
            const q = encodeURIComponent(`'${id}' in parents and trashed = false`);
            const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)&key=${DRIVE_API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            counts[folder] = data.files ? data.files.length : 0;
          } catch { counts[folder] = null; }
        })
      );
      setFolderCounts(counts);
    }
    loadCounts();
  }, []);

  useEffect(() => {
    if (activeFolder === null) { setFolderFiles([]); setSearch(""); return; }
    async function fetchFiles() {
      setLoadingFiles(true); setErrorFiles(null);
      try {
        const { id } = REPOSITORIO_FOLDERS[activeFolder];
        const fields = "files(id,name,mimeType,modifiedTime,webViewLink)";
        const q = encodeURIComponent(`'${id}' in parents and trashed = false`);
        const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${encodeURIComponent(fields)}&orderBy=name&key=${DRIVE_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) { const err = await res.json(); throw new Error(err?.error?.message || "Erro ao buscar arquivos"); }
        const data = await res.json();
        setFolderFiles(data.files || []);
      } catch (err) { setErrorFiles(err.message || "Não foi possível carregar."); }
      finally { setLoadingFiles(false); }
    }
    fetchFiles();
  }, [activeFolder]);

  const filtered = folderFiles.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const eixoInfo = activeFolder !== null ? EIXOS[REPOSITORIO_FOLDERS[activeFolder].folder] : null;

  return (
    <FadeIn delay={0.2}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>
              Repositório de Arquivos
            </h2>
            <p style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
              Acesso direto aos materiais e cartilhas da Liga Acadêmica, organizados por Eixo Temático.
            </p>
          </div>
          {activeFolder !== null && !loadingFiles && !errorFiles && folderFiles.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: colors.warmWhite, border: `1px solid ${colors.creamDark}` }}>
              <Search size={14} color={colors.warmGray} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar arquivo..."
                style={{ border: "none", outline: "none", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", background: "transparent", color: colors.charcoal, width: "160px" }} />
            </div>
          )}
        </div>

        {activeFolder === null && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {REPOSITORIO_FOLDERS.map(({ folder }, i) => {
              const eixo = EIXOS[folder];
              const count = folderCounts[folder];
              return (
                <div key={i} onClick={() => setActiveFolder(i)}
                  style={{ padding: "20px", borderRadius: "16px", cursor: "pointer", background: colors.warmWhite, border: `1px solid ${colors.creamDark}`, display: "flex", alignItems: "center", gap: "16px", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${colors.sage}20`; e.currentTarget.style.borderColor = eixo ? eixo.color : colors.sage; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.creamDark; }}
                >
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0, background: eixo ? eixo.color + "15" : colors.sage + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Folder size={24} color={eixo ? eixo.color : colors.sage} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px", lineHeight: 1.3 }}>{folder}</div>
                    <div style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                      {count === null || count === undefined ? "Carregando..." : `${count} ${count === 1 ? "arquivo" : "arquivos"} disponíveis`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeFolder !== null && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <button onClick={() => setActiveFolder(null)}
                style={{ background: "transparent", border: "none", display: "flex", alignItems: "center", gap: "4px", color: colors.warmGray, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500 }}>
                <ChevronDown size={16} style={{ transform: "rotate(90deg)" }} /> Voltar às Pastas
              </button>
              <span style={{ color: colors.creamDark }}>/</span>
              <span style={{ fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: eixoInfo ? eixoInfo.color : colors.charcoal }}>
                {REPOSITORIO_FOLDERS[activeFolder].folder}
              </span>
            </div>

            {loadingFiles && (
              <div style={{ padding: "48px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: `3px solid ${colors.sage}30`, borderTop: `3px solid ${colors.sage}`, animation: "spin 0.9s linear infinite" }} />
                <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
                <div style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>Carregando arquivos do Drive...</div>
              </div>
            )}

            {!loadingFiles && errorFiles && (
              <div style={{ padding: "32px", borderRadius: "16px", background: colors.warmWhite, border: `1px solid ${colors.accent}30`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <AlertTriangle size={28} color={colors.accent} />
                <div style={{ fontSize: "14px", color: colors.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Não foi possível carregar os arquivos</div>
                <div style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                  Verifique se a pasta está compartilhada como "Qualquer pessoa com o link".<br />
                  <span style={{ fontFamily: "monospace", opacity: 0.7 }}>{errorFiles}</span>
                </div>
              </div>
            )}

            {!loadingFiles && !errorFiles && folderFiles.length === 0 && (
              <div style={{ padding: "48px", borderRadius: "16px", background: colors.warmWhite, border: `1px dashed ${colors.creamDark}`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <Folder size={32} color={colors.sage} />
                <div style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>Esta pasta ainda não tem arquivos.</div>
              </div>
            )}

            {!loadingFiles && !errorFiles && filtered.length === 0 && folderFiles.length > 0 && (
              <div style={{ padding: "32px", borderRadius: "16px", background: colors.warmWhite, border: `1px solid ${colors.creamDark}`, textAlign: "center" }}>
                <div style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>Nenhum resultado para "<strong>{search}</strong>"</div>
              </div>
            )}

            {!loadingFiles && !errorFiles && filtered.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filtered.map(file => {
                  const IconComponent = getFileIcon(file.mimeType);
                  const typeLabel = getFileTypeLabel(file.mimeType);
                  const accentColor = eixoInfo ? eixoInfo.color : colors.accent;
                  return (
                    <a key={file.id} href={file.webViewLink} target="_blank" rel="noopener noreferrer"
                      style={{ padding: "16px", borderRadius: "12px", textDecoration: "none", color: "inherit", background: colors.warmWhite, border: `1px solid ${colors.creamDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s", gap: "12px" }}
                      onMouseEnter={e => { e.currentTarget.style.background = colors.cream; e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = colors.warmWhite; e.currentTarget.style.borderColor = colors.creamDark; e.currentTarget.style.transform = "none"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0, background: accentColor + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <IconComponent size={20} color={accentColor} />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: "14px", fontWeight: 500, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                          <div style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ background: accentColor + "15", color: accentColor, padding: "1px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600 }}>{typeLabel}</span>
                            {file.modifiedTime && <span>Atualizado em {formatDriveDate(file.modifiedTime)}</span>}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, border: `1px solid ${colors.creamDark}`, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = accentColor; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accentColor; e.currentTarget.style.borderColor = colors.creamDark; }}
                      ><ExternalLink size={15} /></div>
                    </a>
                  );
                })}
                <div style={{ fontSize: "12px", color: colors.warmGray, textAlign: "right", fontFamily: "'DM Sans', sans-serif", paddingTop: "4px", opacity: 0.7 }}>
                  {filtered.length} {filtered.length === 1 ? "arquivo disponível" : "arquivos disponíveis"} — sincronizado com o Google Drive
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

function MateriaisSection() {
  const colors = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true); setError(null);
        const fields = "files(id,name,mimeType,modifiedTime,webViewLink)";
        const query = `'${MATERIAIS_FOLDER_ID}' in parents and trashed = false`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&orderBy=name&key=${DRIVE_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) { const err = await res.json(); throw new Error(err?.error?.message || "Erro ao buscar arquivos"); }
        const data = await res.json();
        setFiles(data.files || []);
      } catch (err) { setError(err.message || "Não foi possível carregar os materiais."); }
      finally { setLoading(false); }
    }
    fetchFiles();
  }, []);

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <FadeIn delay={0.2}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>
              Materiais Complementares
            </h2>
            <p style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
              Manuais, Resoluções Técnicas e publicações formativas do Conselho Regional de Psicologia
            </p>
          </div>
          {!loading && !error && files.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: colors.warmWhite, border: `1px solid ${colors.creamDark}` }}>
              <Search size={14} color={colors.warmGray} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar material..."
                style={{ border: "none", outline: "none", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", background: "transparent", color: colors.charcoal, width: "160px" }} />
            </div>
          )}
        </div>

        {loading && (
          <div style={{ padding: "48px 32px", borderRadius: "16px", background: colors.warmWhite, border: `1px solid ${colors.creamDark}`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: `3px solid ${colors.sage}30`, borderTop: `3px solid ${colors.sage}`, animation: "spin 0.9s linear infinite" }} />
            <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
            <div style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>Carregando materiais do Drive...</div>
          </div>
        )}

        {!loading && error && (
          <div style={{ padding: "32px", borderRadius: "16px", background: colors.warmWhite, border: `1px solid ${colors.accent}30`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <AlertTriangle size={28} color={colors.accent} />
            <div style={{ fontSize: "14px", color: colors.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Não foi possível carregar os materiais</div>
            <div style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", maxWidth: "400px" }}>
              Verifique se a pasta do Drive está compartilhada como "Qualquer pessoa com o link".<br />
              <span style={{ fontFamily: "monospace", opacity: 0.7 }}>{error}</span>
            </div>
          </div>
        )}

        {!loading && !error && files.length === 0 && (
          <div style={{ padding: "48px 32px", borderRadius: "16px", background: colors.warmWhite, border: `1px dashed ${colors.creamDark}`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: colors.sage + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Library size={32} color={colors.sage} />
            </div>
            <div style={{ fontSize: "15px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, maxWidth: "400px" }}>Nenhum material complementar foi disponibilizado ainda.</div>
            <div style={{ fontSize: "13px", color: colors.warmGray, opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>Os documentos serão exibidos aqui ao decorrer do semestre.</div>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && files.length > 0 && (
          <div style={{ padding: "32px", borderRadius: "16px", background: colors.warmWhite, border: `1px solid ${colors.creamDark}`, textAlign: "center" }}>
            <div style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>Nenhum resultado para "<strong>{search}</strong>"</div>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.map(file => {
              const IconComponent = getFileIcon(file.mimeType);
              const typeLabel = getFileTypeLabel(file.mimeType);
              return (
                <a key={file.id} href={file.webViewLink} target="_blank" rel="noopener noreferrer"
                  style={{ padding: "16px", borderRadius: "12px", textDecoration: "none", color: "inherit", background: colors.warmWhite, border: `1px solid ${colors.creamDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s", gap: "12px" }}
                  onMouseEnter={e => { e.currentTarget.style.background = colors.cream; e.currentTarget.style.borderColor = colors.sage; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = colors.warmWhite; e.currentTarget.style.borderColor = colors.creamDark; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0, background: colors.accent + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconComponent size={20} color={colors.accent} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                      <div style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", display: "flex", gap: "10px", alignItems: "center" }}>
                        <span style={{ background: colors.accent + "15", color: colors.accent, padding: "1px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600 }}>{typeLabel}</span>
                        {file.modifiedTime && <span>Atualizado em {formatDriveDate(file.modifiedTime)}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, border: `1px solid ${colors.creamDark}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.sage, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = colors.sage; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = colors.sage; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.sage; e.currentTarget.style.borderColor = colors.creamDark; }}
                  ><ExternalLink size={15} /></div>
                </a>
              );
            })}
            <div style={{ fontSize: "12px", color: colors.warmGray, textAlign: "right", fontFamily: "'DM Sans', sans-serif", paddingTop: "4px", opacity: 0.7 }}>
              {filtered.length} {filtered.length === 1 ? "material disponível" : "materiais disponíveis"} — sincronizado com o Google Drive
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

function DiretoriaSection() {
  const colors = useContext(ThemeContext);
  return (
    <FadeIn delay={0.25}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "20px" }}>
          Nossa Diretoria
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {DIRETORIA.map((d, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div
                style={{
                  padding: "24px", borderRadius: "16px",
                  background: colors.warmWhite, border: `1px solid ${colors.creamDark}`,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {d.foto ? (
                  <img src={d.foto} alt={d.nome} style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    marginBottom: "14px", objectFit: "cover",
                    border: `1px solid ${colors.sage}30`
                  }} />
                ) : (
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.sage}30, ${colors.sage}10)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "14px",
                  }}>
                    <span style={{ fontSize: "16px", fontWeight: 600, color: colors.sage, fontFamily: "'DM Sans', sans-serif" }}>
                      {d.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                )}
                <div style={{ fontSize: "15px", fontWeight: 600, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
                  {d.nome}
                </div>
                <div style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", marginBottom: "14px" }}>
                  RA: {d.ra}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a href={`mailto:${d.email}`} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontSize: "12px", color: colors.sage, textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.moss}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.sage}
                  >
                    <Mail size={13} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.email}</span>
                  </a>
                  <a href={`https://wa.me/55${d.tel.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontSize: "12px", color: colors.sage, textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "color 0.2s"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.moss}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.sage}
                  >
                    <Phone size={13} />
                    {d.tel}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function ContatoSection() {
  const colors = useContext(ThemeContext);
  const [sent, setSent] = useState(false);
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnviar = () => {
    if (!nome.trim() || !assunto.trim() || !mensagem.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("entry.1067671325", nome);
    formData.append("entry.845909834", assunto);
    formData.append("entry.1626190089", mensagem);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSfMU7fC3c1V6ZR6DhC5dKiZnIS_DNZgvqasNW6T4oTfYahDDQ/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData
    }).then(() => {
      setSent(true);
      setLoading(false);
    }).catch(() => {
      setSent(true);
      setLoading(false);
    });
  };

  return (
    <FadeIn delay={0.3}>
      <div style={{
        borderRadius: "16px", overflow: "hidden", marginBottom: "32px",
        background: colors.warmWhite, border: `1px solid ${colors.creamDark}`,
      }}>
        <div style={{
          padding: "16px 24px", display: "flex", alignItems: "center", gap: "10px",
          borderBottom: `1px solid ${colors.creamDark}`, background: colors.cream,
        }}>
          <MessageSquare size={16} color={colors.sage} />
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: colors.sage, fontFamily: "'DM Sans', sans-serif" }}>
            Fale com a Diretoria
          </span>
        </div>
        <div style={{ padding: "24px" }}>
          <p style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", marginBottom: "20px", lineHeight: 1.6 }}>
            Tem uma ideia de tema, indicação de palestrante ou quer deixar uma avaliação? O envio pode ser anônimo.
          </p>
          {sent ? (
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "20px", borderRadius: "12px",
              background: colors.sage + "12",
            }}>
              <CheckCircle size={20} color={colors.sage} />
              <span style={{ fontSize: "14px", color: colors.sage, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                Mensagem enviada com sucesso! Obrigado pela contribuição.
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                style={{
                  padding: "12px 16px", borderRadius: "10px", border: `1px solid ${colors.creamDark}`,
                  background: colors.cream, fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                  color: colors.charcoal, outline: "none", transition: "border 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = colors.sage}
                onBlur={(e) => e.target.style.borderColor = colors.creamDark}
              />
              <input
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Assunto"
                style={{
                  padding: "12px 16px", borderRadius: "10px", border: `1px solid ${colors.creamDark}`,
                  background: colors.cream, fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                  color: colors.charcoal, outline: "none", transition: "border 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = colors.sage}
                onBlur={(e) => e.target.style.borderColor = colors.creamDark}
              />
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Sua mensagem..."
                rows={4}
                style={{
                  padding: "12px 16px", borderRadius: "10px", border: `1px solid ${colors.creamDark}`,
                  background: colors.cream, fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                  color: colors.charcoal, outline: "none", resize: "vertical",
                  transition: "border 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = colors.sage}
                onBlur={(e) => e.target.style.borderColor = colors.creamDark}
              />
              <button
                onClick={handleEnviar}
                disabled={loading}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", padding: "12px 24px", borderRadius: "10px",
                  background: loading ? colors.warmGray : colors.sage, color: "white", border: "none",
                  fontSize: "14px", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = colors.moss; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = colors.sage; }}
              >
                <Send size={15} />
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

const AUTHORIZED_EMAILS = [
  "isabela.kondor2509@gmail.com",
  "juliataki08@gmail.com",
  "bruno.a.zanin2006@gmail.com",
  "mazanatj@gmail.com"
];

// E-mails comuns aprovados pela Diretoria (não possuem acesso à aba de Administração)
const AUTHORIZED_COMMON_EMAILS = [
  // Adicione aqui os e-mails de fora do Mackenzie liberados para ligantes convidados
  "suguidiane@gmail.com",
  "yasmimsalves@hotmail.com"
];

function LoginScreen({ onLogin }) {
  const colors = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEnter = (e) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    if (
      AUTHORIZED_EMAILS.includes(cleanEmail) || 
      AUTHORIZED_COMMON_EMAILS.includes(cleanEmail) || 
      cleanEmail.endsWith("@mackenzista.com.br")
    ) {
      onLogin(cleanEmail);
    } else {
      setError("E-mail não autorizado.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${colors.moss} 0%, ${colors.sage} 50%, ${colors.sageLight} 100%)`,
      padding: "20px"
    }}>
      <div style={{
        background: colors.warmWhite, padding: "40px", borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)", maxWidth: "400px", width: "100%",
        textAlign: "center"
      }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: colors.sage + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <PsiIcon size={32} color={colors.sage} />
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>LAPSIC</h1>
        <p style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", marginBottom: "32px" }}>Acesso exclusivo ao Espaço do Ligante</p>

        <form onSubmit={handleEnter} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="Seu e-mail cadastrado"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            style={{ padding: "14px 16px", borderRadius: "12px", border: `1px solid ${error ? colors.accent : colors.creamDark}`, fontSize: "15px", outline: "none", fontFamily: "'DM Sans', sans-serif", background: colors.cream, color: colors.charcoal }}
          />
          {error && <span style={{ color: colors.accent, fontSize: "13px", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>{error}</span>}
          <button type="submit" style={{ padding: "14px", borderRadius: "12px", background: colors.sage, color: "white", border: "none", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = colors.moss} onMouseLeave={e => e.currentTarget.style.background = colors.sage}>
            Acessar Plataforma
          </button>
        </form>

        <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: `1px solid ${colors.creamDark}` }}>
          <p style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
            Ainda não tem acesso? <br />
            <a href={`mailto:lapsic.mackenzie@gmail.com?subject=Solicitação de Acesso - Espaço do Ligante&body=Olá Diretoria, gostaria de solicitar acesso ao site da LAPSIC utilizando o e-mail: ${email || "[Seu E-mail]"}`} style={{ color: colors.sage, fontWeight: 600, textDecoration: "none" }}>Solicite à diretoria clicando aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminDriveSection() {
  const colors = useContext(ThemeContext);

  const steps = [
    {
      icon: Folder,
      title: "Repositório de Arquivos",
      color: colors.sage,
      description: "Acesse a pasta \"Espaço do Ligante → Bibliografia\" no Drive da LAPSIC. Dentro dela há três subpastas, uma para cada Eixo Temático. Basta adicionar ou remover arquivos nessas subpastas — o site atualiza automaticamente. Caso os nomes dos eixos temáticos mudem, renomeie as pastas diretamente no Drive: os nomes exibidos no site sempre acompanharão os nomes das pastas.",
      detail: "Ramificações da Clínica · Psicopatologia e Fármacos · Gestão e Burocracias da Clínica",
    },
    {
      icon: Library,
      title: "Materiais Complementares",
      color: colors.accent,
      description: "Acesse a pasta \"Espaço do Ligante → Materiais Complementares\" no Drive da LAPSIC. Qualquer arquivo adicionado ou removido lá aparece ou desaparece automaticamente no site para os ligantes.",
      detail: "Resoluções, cartilhas, manuais e publicações do CRP",
    },
    {
      icon: CheckCircle,
      title: "Virada de Semestre",
      color: colors.moss,
      description: "Ao final de cada semestre, mova o conteúdo das pastas do \"Espaço do Ligante\" para a pasta referente ao semestre da Liga. Em seguida, apague da aba do \"Espaço do Ligante\" e adicione os novos materiais do semestre seguinte. O site refletirá as mudanças imediatamente.",
      detail: "Não é necessário mexer no código",
    },
    {
      icon: MessageSquare,
      title: "Formulário de Contato",
      color: colors.sage,
      description: "Todas as mensagens enviadas pelos ligantes através da aba \"Contato\" do Espaço do Ligante aparecem automaticamente no formulário \"Sugestões Ligantes\", dentro da pasta \"Espaço do Ligante\" no Drive da LAPSIC. Não é necessário fazer nada — as respostas chegam lá sozinhas.",
      detail: "Drive da LAPSIC → Espaço do Ligante → Sugestões Ligantes",
    },
    {
      icon: AlertTriangle,
      title: "Atenção: Permissões do Drive",
      color: "#C4956A",
      description: "Todas as pastas do Espaço do Ligante devem estar configuradas como \"Qualquer pessoa com o link pode visualizar\". Caso contrário, os arquivos não aparecem no site. Verifique isso sempre que criar uma pasta nova.",
      detail: "Botão direito na pasta → Compartilhar → Acesso geral → Qualquer pessoa com o link",
    },
  ];

  return (
    <FadeIn delay={0.2}>
      <div style={{ marginBottom: "32px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <Shield size={28} color={colors.sage} />
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif" }}>
            Painel da Diretoria
          </h2>
        </div>
        <p style={{ fontSize: "14px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: "32px" }}>
          Bem-vinda(o) à área restrita! Este painel é o seu guia de gestão do site. Aqui você encontra tudo o que precisa saber para manter o Espaço do Ligante atualizado — sem precisar mexer em nenhuma linha de código.
        </p>

        {/* Banner destaque */}
        <div style={{
          padding: "20px 24px", borderRadius: "14px", marginBottom: "28px",
          background: `linear-gradient(135deg, ${colors.moss} 0%, ${colors.sage} 100%)`,
          color: "white", display: "flex", alignItems: "center", gap: "16px",
        }}>
          <Cloud size={32} style={{ flexShrink: 0, opacity: 0.9 }} />
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
              O site é alimentado pela pasta "Espaço do Ligante" do Google Drive da LAPSIC
            </div>
            <div style={{ fontSize: "13px", opacity: 0.9, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              Tudo o que estiver nas pastas <strong>"Bibliografia"</strong> e <strong>"Materiais Complementares"</strong> aparece automaticamente no site. Adicione, remova ou substitua arquivos lá — sem precisar abrir o código, o GitHub ou o Vercel.
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} style={{
                padding: "24px", borderRadius: "14px",
                background: colors.warmWhite, border: `1px solid ${colors.creamDark}`,
                display: "flex", gap: "18px", alignItems: "flex-start",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                  background: step.color + "15", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color={step.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", marginBottom: "6px" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: "8px" }}>
                    {step.description}
                  </div>
                  <div style={{
                    fontSize: "11px", color: step.color, fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, background: step.color + "12",
                    display: "inline-block", padding: "3px 10px", borderRadius: "20px",
                  }}>
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: "24px", padding: "16px 20px", borderRadius: "12px",
          background: colors.cream, border: `1px solid ${colors.creamDark}`,
          display: "flex", gap: "12px", alignItems: "flex-start",
        }}>
          <ArrowRight size={16} color={colors.sage} style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: 0 }}>
            Precisa atualizar o <strong>cronograma</strong>, os <strong>dados da diretoria</strong>, adicionar <strong>e-mails autorizados</strong> ou fazer outra mudança estrutural no site? Essas alterações são feitas no arquivo <code style={{ background: colors.creamDark, padding: "1px 6px", borderRadius: "4px", fontSize: "12px" }}>src/App.jsx</code> no repositório do GitHub. Entre em contato com quem desenvolveu ou acesse o repositório em <strong>github.com/juliatakieddine/lapsic-site</strong>.
          </p>
        </div>

      </div>
    </FadeIn>
  );
}

export default function LapsicApp() {
  const [section, setSection] = useState("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("lapsic-darkmode") === "true";
  });
  const [activeFolder, setActiveFolder] = useState(null);
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("lapsic-email") || "";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("lapsic-auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("lapsic-darkmode", darkMode);
    if (darkMode) {
      document.body.style.background = "#0F1113";
      document.body.style.color = "#EAEAEA";
    } else {
      document.body.style.background = "#FDFCF0";
      document.body.style.color = "#333333";
    }
  }, [darkMode]);

  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const isDirector = AUTHORIZED_EMAILS.includes(userEmail);

  const navItems = [
    { id: "home", icon: BookOpen, label: "Início" },
    { id: "cronograma", icon: Calendar, label: "Cronograma" },
    { id: "repositorio", icon: Folder, label: "Repositório de Arquivos" },
    { id: "materiais", icon: Library, label: "Materiais Complementares" },
    { id: "diretoria", icon: Users, label: "Diretoria" },
    { id: "contato", icon: MessageSquare, label: "Contato" },
  ];

  if (isDirector) {
    navItems.push({ id: "admin", icon: Shield, label: "Área da Diretoria" });
  }

  const scrollToSection = (id) => {
    setSection(id);
    setMobileNav(false);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToRepositorioEixo = (eixoName) => {
    scrollToSection("repositorio");
    if (eixoName) {
      const folderIndex = REPOSITORIO_FOLDERS.findIndex(f => f.folder === eixoName);
      if (folderIndex !== -1) {
        setActiveFolder(folderIndex);
      } else {
        setActiveFolder(null);
      }
    } else {
      setActiveFolder(0);
    }
  };

  const handleLogin = (email) => {
    localStorage.setItem("lapsic-auth", "true");
    localStorage.setItem("lapsic-email", email);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("lapsic-auth");
    localStorage.removeItem("lapsic-email");
    setUserEmail("");
    setIsAuthenticated(false);
  };

  return (
    <ThemeContext.Provider value={colors}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${colors.cream}; transition: background 0.3s ease; }
        ::selection { background: ${colors.sage}40; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${colors.sage}30; border-radius: 3px; }
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .sidebar.open { display: flex !important; position: fixed; z-index: 100;
            top: 0; left: 0; bottom: 0; width: 260px; box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
          .mobile-toggle { display: flex !important; }
          .main-content { margin-left: 0 !important; padding: 20px 16px !important; padding-top: 72px !important; }
          .cronograma-detail { padding-left: 20px !important; }
          .hero-section { padding: 32px 24px !important; }
          .palestrante-badge span { display: none; }
        }
      `}</style>

      {!isAuthenticated ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <div style={{ display: "flex", minHeight: "100vh", background: colors.cream, transition: "background 0.3s ease" }}>
          {/* Overlay */}
          {mobileNav && (
            <div
              onClick={() => setMobileNav(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 99 }}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`sidebar ${mobileNav ? "open" : ""}`}
            style={{
              width: "240px", flexShrink: 0, background: colors.warmWhite,
              borderRight: `1px solid ${colors.creamDark}`,
              padding: "24px 16px", display: "flex", flexDirection: "column",
              position: "fixed", top: 0, bottom: 0, left: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", paddingLeft: "8px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: colors.sage, display: "flex", alignItems: "center",
                justifyContent: "center",
              }}>
                <PsiIcon size={20} color="white" />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.1 }}>
                  LAPSIC
                </div>
                <div style={{ fontSize: "10px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px" }}>
                  Espaço do Ligante
                </div>
              </div>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={section === item.id}
                  onClick={() => scrollToSection(item.id)}
                />
              ))}
            </nav>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px",
                borderRadius: "10px", border: "none", cursor: "pointer", width: "100%",
                textAlign: "left", fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400, background: "transparent", color: colors.warmGray,
                transition: "all 0.25s ease", marginTop: "4px",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.cream}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{darkMode ? "Modo Claro" : "Modo Escuro"}</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px",
                borderRadius: "10px", border: "none", cursor: "pointer", width: "100%",
                textAlign: "left", fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400, background: "transparent", color: colors.warmGray,
                transition: "all 0.25s ease", marginTop: "4px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.cream; e.currentTarget.style.color = "#c92a2a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.warmGray; }}
            >
              <LogOut size={18} />
              <span>Sair (Logout)</span>
            </button>

            <div style={{
              padding: "16px", borderRadius: "12px", background: colors.cream,
              marginTop: "16px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: colors.sage, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                Semestre 2026.1
              </div>
              <div style={{ fontSize: "11px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                Segundas, 19h — Online
              </div>
            </div>
          </aside>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileNav(!mobileNav)}
            style={{
              display: "none", position: "fixed", top: "16px", left: "16px", zIndex: 101,
              width: "44px", height: "44px", borderRadius: "12px",
              background: colors.warmWhite, border: `1px solid ${colors.creamDark}`,
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {mobileNav ? <X size={20} color={colors.charcoal} /> : <Menu size={20} color={colors.charcoal} />}
          </button>

          {/* Main Content */}
          <main
            className="main-content"
            style={{
              flex: 1, marginLeft: "240px", padding: "32px",
              maxWidth: "960px",
            }}
          >
            <div id="section-home" style={{ marginBottom: "64px" }}>
              <HeroSection />
              <MuralAvisos goToRepositorioEixo={goToRepositorioEixo} />
            </div>
            <div id="section-cronograma" style={{ marginBottom: "64px" }}>
              <CronogramaSection />
            </div>
            <div id="section-repositorio" style={{ marginBottom: "64px" }}>
              <RepositorioSection activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
            </div>
            <div id="section-materiais" style={{ marginBottom: "64px" }}>
              <MateriaisSection />
            </div>
            <div id="section-diretoria" style={{ marginBottom: "64px" }}>
              <DiretoriaSection />
            </div>
            <div id="section-contato">
              <ContatoSection />
            </div>
            {isDirector && (
              <div id="section-admin" style={{ marginTop: "64px" }}>
                <AdminDriveSection />
              </div>
            )}

            {/* Footer */}
            <FadeIn delay={0.35}>
              <div style={{
                textAlign: "center", padding: "24px 0", marginTop: "16px",
                borderTop: `1px solid ${colors.creamDark}`,
              }}>
                <p style={{ fontSize: "12px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                  LAPSIC — Liga Acadêmica de Psicologia Clínica — 2026.1
                </p>
              </div>
            </FadeIn>
          </main>
        </div>
      )}
    </ThemeContext.Provider>
  );
}
