import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  BookOpen, Calendar, Users, MessageSquare, Bell, ExternalLink,
  Mail, Phone, ChevronDown, ChevronRight, Clock, MapPin,
  Sparkles, Send, Eye, FileText, Video, Globe, Menu, X,
  GraduationCap, Heart, Brain, Pill, Briefcase, AlertTriangle,
  CheckCircle, ArrowRight, Leaf, Moon, Sun
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

const EIXOS = {
  "Ramificações da Clínica": { color: "#7B8F6B", icon: Brain },
  "Psicopatologia e Fármacos": { color: "#8B6B5A", icon: Pill },
  "Gestão e Burocracias da Clínica": { color: "#6B7B8F", icon: Briefcase },
};

const CRONOGRAMA = [
  { data: "23/02", tema: "Apresentação da Liga", bib: null, part: null, eixo: null },
  { data: "02/03", tema: "Psicoterapia Online", bib: "Psicoterapia Online: Demanda Crescente e Sugestões para Regulamentação — Carmelita Gomes, Marcelo de Araújo", part: null, eixo: "Ramificações da Clínica" },
  { data: "09/03", tema: "Psicoterapia Infantil", bib: "A Psicoterapia Infantil no Setting Clínico — Rosa Angela Cortez et al. + Vídeo", part: null, eixo: "Ramificações da Clínica" },
  { data: "16/03", tema: "Atendimento Emergencial", bib: "Implicações do Pronto-Atendimento Psicológico de Emergência — Airle Miranda de Souza et al.", part: null, eixo: "Ramificações da Clínica" },
  { data: "23/03", tema: "Psicoterapia e Luto", bib: "Morte e Luto: O Enfrentamento do Fenômeno da Terminalidade à Luz da Psicoterapia — Tamires Freitas, Monica Dominici", part: "Gabriela Dantas Bertelli (@bertelligabs.psi)", eixo: "Ramificações da Clínica" },
  { data: "30/03", tema: "Autodiagnóstico", bib: "Increasing self- and desired psychiatric diagnoses among emerging adults — Neumann et al.", part: null, eixo: "Psicopatologia e Fármacos" },
  { data: "06/04", tema: "Interdisciplinaridade: Psicólogo e Psiquiatria", bib: "Interdisciplinaridade nas práticas de cuidado em saúde mental — Eduardo Giacomini, Maria Lucia Frizon", part: null, eixo: "Psicopatologia e Fármacos" },
  { data: "13/04", tema: "Psicoterapia e Medicalização", bib: "Da recusa à demanda de diagnóstico: novos arranjos da medicalização — Mariana Ferreira Pombo", part: "Liga de Psicofarmacologia", eixo: "Psicopatologia e Fármacos" },
  { data: "20/04", tema: "Feriado (sem encontro)", bib: null, part: null, eixo: null },
  { data: "27/04", tema: "Discussão de Caso", bib: "Episódio 1 — Documentário Diagnóstico (Netflix) + Vídeos complementares", part: null, eixo: "Psicopatologia e Fármacos" },
  { data: "04/05", tema: "Gestão da Clínica", bib: "A clínica psicológica: legislação, estruturação e gestão — Cleonice Barros et al.", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "11/05", tema: "Desenvolvimento de Clínica", bib: "Contratos psicológicos: uma revisão da literatura — Menegon, Casado + Reflexões sobre o contrato terapêutico — Gladys C. Moraes", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "18/05", tema: "Educação Financeira na Clínica", bib: "\"Qual o valor da consulta?\": Crenças, Critérios e Estratégias — Jéssica Florinda", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "25/05", tema: "Marketing e Captação de Pacientes", bib: "Plataformização do Trabalho na Psicologia Clínica — Matheus Viana et al. + O Papel do Marketing na Gestão de Serviços de Saúde — António Morão et al.", part: null, eixo: "Gestão e Burocracias da Clínica" },
  { data: "01/06", tema: "Encerramento e Feedback do Semestre", bib: null, part: null, eixo: null },
];

const DIRETORIA = [
  { nome: "Isabela Scaramuzza Kondor", ra: "10400944", email: "isabela.kondor2509@gmail.com", tel: "(11) 96326-5900" },
  { nome: "Julia Takieddine", ra: "10396144", email: "juliataki08@gmail.com", tel: "(11) 94072-7276" },
  { nome: "Bruno Apollaro Zanin", ra: "10723241", email: "bruno.a.zanin2006@gmail.com", tel: "(11) 98679-0264" },
  { nome: "Marcella Mazanati", ra: "10410025", email: "mazanatj@gmail.com", tel: "(11) 99639-9056" },
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
            <Leaf size={16} style={{ opacity: 0.8 }} />
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
            fontSize: "15px", opacity: 0.85, maxWidth: "480px", lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          }}>
            A clínica se faz na escuta, no estudo contínuo e na troca de saberes. Este é o seu espaço de construção conjunta.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function QuickAccess() {
  const colors = useContext(ThemeContext);
  const cards = [
    { icon: Globe, label: "Notion", desc: "Contatos, cronograma e links dos encontros", color: colors.charcoal },
    { icon: FileText, label: "Google Drive", desc: "Textos, cartilhas e livros por eixo temático", color: colors.sage },
  ];
  return (
    <FadeIn delay={0.1}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "20px 24px", borderRadius: "16px", cursor: "pointer",
              background: colors.warmWhite, border: `1px solid ${colors.creamDark}`,
              transition: "all 0.3s ease",
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
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: c.color + "12", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <c.icon size={22} color={c.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
                {c.label}
              </div>
              <div style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
                {c.desc}
              </div>
            </div>
            <ExternalLink size={16} color={colors.warmGray} style={{ opacity: 0.5 }} />
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

function MuralAvisos() {
  const colors = useContext(ThemeContext);
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
          <div style={{
            display: "flex", alignItems: "flex-start", gap: "16px",
            padding: "20px", borderRadius: "12px",
            background: `linear-gradient(135deg, ${colors.sage}08, ${colors.sage}15)`,
            border: `1px solid ${colors.sage}20`,
            marginBottom: "16px",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: colors.sage, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: colors.sage, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                Próximo Encontro
              </div>
              <div style={{ fontSize: "18px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>
                Psicoterapia Online
              </div>
              <div style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                Leitura: <em>Psicoterapia Online: Demanda Crescente e Sugestões para Regulamentação</em> — Carmelita Gomes, Marcelo de Araújo
              </div>
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "14px 16px", borderRadius: "10px",
            background: colors.accent + "12", border: `1px solid ${colors.accent}25`,
          }}>
            <AlertTriangle size={16} color={colors.accent} />
            <span style={{ fontSize: "13px", color: colors.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              Não se esqueça de assinar a lista de presença durante o encontro!
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

  return (
    <FadeIn delay={0.2}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.charcoal, fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>
              Cronograma 2026.1
            </h2>
            <p style={{ fontSize: "13px", color: colors.warmGray, fontFamily: "'DM Sans', sans-serif" }}>
              Segundas-feiras às 19h — Formato Online
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
            return (
              <div
                key={i}
                style={{
                  borderRadius: "12px", overflow: "hidden",
                  background: isHoliday ? colors.cream : colors.warmWhite,
                  border: `1px solid ${colors.creamDark}`,
                  opacity: isHoliday ? 0.6 : 1,
                  transition: "all 0.25s",
                }}
              >
                <div
                  onClick={() => !isHoliday && setExpanded(isOpen ? null : i)}
                  style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "16px 20px", cursor: isHoliday ? "default" : "pointer",
                  }}
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
                    <div style={{ fontSize: "15px", fontWeight: 500, color: colors.charcoal, fontFamily: "'DM Sans', sans-serif" }}>
                      {item.tema}
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
                          Bibliografia
                        </div>
                        <div style={{ fontSize: "13px", color: colors.warmGray, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                          {item.bib}
                        </div>
                      </div>
                    )}
                    {item.part && (
                      <div>
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
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <Mail size={13} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.email}</span>
                  </a>
                  <a href={`tel:${d.tel.replace(/\D/g, "")}`} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontSize: "12px", color: colors.sage, textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
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
                placeholder="Nome (opcional para anonimato)"
                style={{
                  padding: "12px 16px", borderRadius: "10px", border: `1px solid ${colors.creamDark}`,
                  background: colors.cream, fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                  color: colors.charcoal, outline: "none", transition: "border 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = colors.sage}
                onBlur={(e) => e.target.style.borderColor = colors.creamDark}
              />
              <input
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
                onClick={() => setSent(true)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", padding: "12px 24px", borderRadius: "10px",
                  background: colors.sage, color: "white", border: "none",
                  fontSize: "14px", fontWeight: 500, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.moss}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.sage}
              >
                <Send size={15} />
                Enviar
              </button>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

export default function LapsicApp() {
  const [section, setSection] = useState("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem("lapsic-dark-mode") === "true"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("lapsic-dark-mode", darkMode); } catch { /* ignore */ }
  }, [darkMode]);

  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const navItems = [
    { id: "home", icon: BookOpen, label: "Início" },
    { id: "cronograma", icon: Calendar, label: "Cronograma" },
    { id: "diretoria", icon: Users, label: "Diretoria" },
    { id: "contato", icon: MessageSquare, label: "Contato" },
  ];

  const scrollToSection = (id) => {
    setSection(id);
    setMobileNav(false);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
              <Leaf size={18} color="white" />
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
            maxWidth: "900px",
          }}
        >
          <div id="section-home">
            <HeroSection />
            <QuickAccess />
            <MuralAvisos />
          </div>
          <div id="section-cronograma">
            <CronogramaSection />
          </div>
          <div id="section-diretoria">
            <DiretoriaSection />
          </div>
          <div id="section-contato">
            <ContatoSection />
          </div>

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
    </ThemeContext.Provider>
  );
}
