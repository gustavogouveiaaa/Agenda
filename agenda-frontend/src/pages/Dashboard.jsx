import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./Dashboard.css";

import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  updateStatus,
} from "../services/activityService";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [atividades, setAtividades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");

  const [form, setForm] = useState({
    id: null,
    nome: "",
    descricao: "",
    inicio: "",
    fim: "",
    status: "pendente",
  });

  async function carregarAtividades() {
    try {
      const res = await getActivities();
      setAtividades(res.data || res || []);
    } catch (err) {
      console.error("Erro ao carregar atividades:", err);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await carregarAtividades();
    }
    fetchData();
  }, []);

  function abrirCriar() {
    setMode("create");
    setForm({
      id: null,
      nome: "",
      descricao: "",
      inicio: "",
      fim: "",
      status: "pendente",
    });
    setOpenModal(true);
  }

  function abrirEditar(a) {
    setMode("edit");

    const inicioLocal = a.inicio ? a.inicio.slice(0, 16) : "";
    const fimLocal = a.fim ? a.fim.slice(0, 16) : "";

    setForm({
      id: a.id,
      nome: a.nome || "",
      descricao: a.descricao || "",
      inicio: inicioLocal,
      fim: fimLocal,
      status: a.status || "pendente",
    });

    setOpenModal(true);
  }

  async function salvar() {
    if (!form.nome || !form.inicio || !form.fim) return alert("Preencha tudo!");

    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      inicio: new Date(form.inicio).toISOString(),
      fim: new Date(form.fim).toISOString(),
    };

    try {
      if (mode === "create") {
        await createActivity({ ...payload, status: form.status });
      } else {
        await updateActivity(form.id, payload);
        try {
          await updateStatus(form.id, form.status);
        } catch (err) {
          console.warn("Aviso ao atualizar status:", err);
        }
      }

      setOpenModal(false);
      carregarAtividades();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar.");
    }
  }

  async function remover() {
    if (!confirm("Excluir atividade?")) return;

    try {
      await deleteActivity(form.id);
      setOpenModal(false);
      carregarAtividades();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir atividade.");
    }
  }

  function statusColor(status) {
    return (
      {
        pendente: "#F4D03F",
        concluída: "#2ECC71",
        cancelada: "#E74C3C",
      }[status] || "#3498DB"
    );
  }

  const eventos = atividades.map((a) => ({
    id: a.id,
    title: a.nome,
    start: new Date(a.inicio),
    end: new Date(a.fim),
    raw: a,
  }));

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Minhas Atividades</h1>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={abrirCriar}>
            + Nova Atividade
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Sair
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="activities-column">
          {atividades.length === 0 ? (
            <div className="empty-card">Nenhuma atividade encontrada.</div>
          ) : (
            atividades.map((a) => (
              <article key={a.id} className="activity-card">
                <div>
                  <h2 className="activity-title">{a.nome}</h2>
                  <p className="activity-desc">{a.descricao}</p>
                </div>

                <div className="activity-meta">
                  <span style={{ color: statusColor(a.status) }}>
                    ● {a.status}
                  </span>
                  <button
                    className="btn btn-edit"
                    onClick={() => abrirEditar(a)}
                  >
                    Editar
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        
        <aside className="calendar-column">
          <div className="calendar-card">
            <Calendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              views={["agenda"]}
              defaultView="agenda"
              messages={{
                agenda: "Agenda",
                date: "Data",
                time: "Hora",
                event: "Evento",
                today: "Hoje",
                previous: "Voltar",
                next: "Avançar",
                noEvents: "Nenhuma atividade neste período.",
              }}
              formats={{
                agendaDateFormat: (date) => {
                  const dias = [
                    "Domingo",
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado",
                  ];

                  const meses = [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                  ];

                  const diaSemana = dias[moment(date).day()];
                  const dia = moment(date).format("DD");
                  const mes = meses[moment(date).month()];

                  return `${diaSemana}, ${dia} de ${mes}`;
                },

                agendaTimeRangeFormat: ({ start, end }) =>
                  `${moment(start).format("HH:mm")} – ${moment(end).format(
                    "HH:mm"
                  )}`,
              }}
              style={{ height: 600 }}
              eventPropGetter={(event) => ({
                style: {
                  background: statusColor(event.raw.status),
                  color: "black",
                  borderRadius: 6,
                  paddingLeft: 6,
                  fontWeight: "600",
                },
              })}
              onSelectEvent={(event) => abrirEditar(event.raw)}
            />
          </div>
        </aside>
      </main>

      {/* MODAL */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{mode === "create" ? "Nova Atividade" : "Editar Atividade"}</h3>

            <label>Nome</label>
            <input
              className="form-input"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <label>Descrição</label>
            <textarea
              className="form-textarea"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />

            <label>Início</label>
            <input
              type="datetime-local"
              className="form-input"
              value={form.inicio}
              onChange={(e) => setForm({ ...form, inicio: e.target.value })}
            />

            <label>Fim</label>
            <input
              type="datetime-local"
              className="form-input"
              value={form.fim}
              onChange={(e) => setForm({ ...form, fim: e.target.value })}
            />

            {mode === "edit" && (
              <>
                <label>Status</label>
                <select
                  className="form-input"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pendente">Pendente</option>
                  <option value="concluída">Concluída</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </>
            )}

            <div className="modal-actions">
              {mode === "edit" && (
                <button className="btn btn-danger" onClick={remover}>
                  Excluir
                </button>
              )}

              <div className="modal-right">
                <button
                  className="btn btn-neutral"
                  onClick={() => setOpenModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={salvar}>
                  {mode === "create" ? "Criar" : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
