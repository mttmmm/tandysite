import React, { useEffect, useMemo, useState, useCallback } from 'react';
import './Schedule.css';
import { buildWhatsAppUrl } from '../../config/site';

// Conta que possui o calendário com os agendamentos do estúdio.
const CALENDAR_ID = 'yathandersonv@gmail.com';
const API_KEY = 'AIzaSyBzO2RGFeeTBkXIhHxRBktdC3twDmSNBSk';

// Janela de meses mostrados: atual ± 2 meses (configurável).
const MONTHS_BACK = 2;
const MONTHS_FORWARD = 2;

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// Normaliza uma data para o início do dia local (00:00:00).
const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfMonth = (date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  return startOfDay(d);
};

const endOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBeforeToday = (date) => {
  const today = startOfDay(new Date());
  return startOfDay(date).getTime() < today.getTime();
};

// Formata data no padrão ISO aceito pela API (UTC).
const toIsoDate = (date) => date.toISOString();

// Converte um evento retornado pela API em uma chave de dia no formato YYYY-MM-DD local.
const eventToDayKey = (event) => {
  const startStr = event.start?.dateTime || event.start?.date;
  if (!startStr) return null;
  const date = new Date(startStr);
  if (Number.isNaN(date.getTime())) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const Schedule = () => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialMonth = useMemo(() => startOfMonth(today), [today]);

  const [cursor, setCursor] = useState(initialMonth);
  const [eventsByDay, setEventsByDay] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Limites mínimo e máximo que o usuário pode navegar.
  const minMonth = useMemo(() => {
    const d = new Date(initialMonth);
    d.setMonth(d.getMonth() - MONTHS_BACK);
    return d;
  }, [initialMonth]);

  const maxMonth = useMemo(() => {
    const d = new Date(initialMonth);
    d.setMonth(d.getMonth() + MONTHS_FORWARD);
    return d;
  }, [initialMonth]);

  const canGoPrev = useMemo(
    () => cursor.getFullYear() > minMonth.getFullYear() ||
      (cursor.getFullYear() === minMonth.getFullYear() && cursor.getMonth() > minMonth.getMonth()),
    [cursor, minMonth]
  );

  const canGoNext = useMemo(
    () => cursor.getFullYear() < maxMonth.getFullYear() ||
      (cursor.getFullYear() === maxMonth.getFullYear() && cursor.getMonth() < maxMonth.getMonth()),
    [cursor, maxMonth]
  );

  // Busca eventos confirmados entre o primeiro dia do range mínimo e o último dia do range máximo.
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    const rangeStart = startOfDay(minMonth);
    const rangeEnd = new Date(maxMonth.getFullYear(), maxMonth.getMonth() + 1, 0, 23, 59, 59, 999);

    const params = new URLSearchParams({
      key: API_KEY,
      timeMin: toIsoDate(rangeStart),
      timeMax: toIsoDate(rangeEnd),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '250',
    });

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao consultar agenda`);
      }
      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];

      const map = {};
      items.forEach((event) => {
        if (event.status && event.status !== 'confirmed') return;
        const key = eventToDayKey(event);
        if (!key) return;
        if (!map[key]) map[key] = [];
        map[key].push(event);
      });

      setEventsByDay(map);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os agendamentos.');
    } finally {
      setLoading(false);
    }
  }, [minMonth, maxMonth]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Grade do mês atual: semanas completas (domingo a sábado) cobrindo o mês.
  const monthGrid = useMemo(() => {
    const firstWeekday = startOfMonth(cursor).getDay();
    const daysInMonth = endOfMonth(cursor).getDate();

    const cells = [];

    // Espaços vazios antes do primeiro dia.
    for (let i = 0; i < firstWeekday; i += 1) {
      const d = new Date(cursor.getFullYear(), cursor.getMonth(), i - firstWeekday + 1);
      cells.push({ date: d, empty: true });
    }

    // Dias do mês.
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        date: new Date(cursor.getFullYear(), cursor.getMonth(), day),
        empty: false,
      });
    }

    // Completa a última semana para sempre fechar em múltiplo de 7.
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const next = new Date(last);
      next.setDate(next.getDate() + 1);
      cells.push({ date: next, empty: true });
    }

    return cells;
  }, [cursor]);

  const goPrev = () => {
    if (!canGoPrev) return;
    const next = new Date(cursor);
    next.setMonth(next.getMonth() - 1);
    setCursor(startOfMonth(next));
  };

  const goNext = () => {
    if (!canGoNext) return;
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    setCursor(startOfMonth(next));
  };

  const handleRequestDay = (date) => {
    const formatted = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const message = `Olá Tandy! Vi no calendário que ${formatted} está disponível. Gostaria de agendar nesse dia, é possível?`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  const monthLabel = `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`;

  return (
    <section className="section schedule" id="schedule">
      <div className="container">
        <div className="schedule-header">
          <span className="schedule-label">Disponibilidade</span>
          <h2 className="schedule-heading">
            Dias de<br />
            <span className="schedule-heading-accent">Atendimento</span>
          </h2>
          <span className="ornament"></span>
          <p className="schedule-subtitle">
            Os dias marcados na agenda abaixo já estão reservados. Para abrir um novo
            horário, é só chamar no WhatsApp.
          </p>
        </div>

        <div className="schedule-frame">
          <div className="schedule-toolbar">
            <button
              type="button"
              className="schedule-nav"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Mês anterior"
            >
              <span className="schedule-nav-arrow" aria-hidden="true">&#8249;</span>
            </button>
            <span className="schedule-month-label">{monthLabel}</span>
            <button
              type="button"
              className="schedule-nav"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Próximo mês"
            >
              <span className="schedule-nav-arrow" aria-hidden="true">&#8250;</span>
            </button>
          </div>

          <div className="schedule-weekdays" role="presentation">
            {WEEK_DAYS.map((label, index) => (
              <span key={`${label}-${index}`} className="schedule-weekday">{label}</span>
            ))}
          </div>

          {error ? (
            <div className="schedule-state schedule-state-error">
              {error}
              <button type="button" className="btn btn-outline schedule-retry" onClick={fetchEvents}>
                Tentar novamente
              </button>
            </div>
          ) : (
            <div className={`schedule-grid ${loading ? 'is-loading' : ''}`}>
              {monthGrid.map((cell, index) => {
                if (cell.empty) {
                  return <span key={`empty-${index}`} className="schedule-cell schedule-cell-empty" aria-hidden="true" />;
                }

                const date = cell.date;
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                const events = eventsByDay[key] || [];
                const isBusy = events.length > 0;
                const isToday = isSameDay(date, today);
                const isPast = isBeforeToday(date);
                const cellClass = [
                  'schedule-cell',
                  isToday && 'is-today',
                  isBusy && 'is-busy',
                  !isBusy && !isPast && 'is-free',
                  isPast && 'is-past',
                ].filter(Boolean).join(' ');

                const ariaLabel = isBusy
                  ? `${date.toLocaleDateString('pt-BR')}, ${events.length} agendamento${events.length > 1 ? 's' : ''}`
                  : `${date.toLocaleDateString('pt-BR')}, ${isPast ? 'passado' : 'disponível'}`;

                if (isBusy) {
                  return (
                    <button
                      key={key}
                      type="button"
                      className={cellClass}
                      aria-label={ariaLabel}
                      title={events.map((e) => e.summary || 'Reservado').join(' • ')}
                    >
                      <span className="schedule-cell-day">{date.getDate()}</span>
                      <span className="schedule-cell-tag">Reservado</span>
                    </button>
                  );
                }

                if (isPast) {
                  return (
                    <span key={key} className={cellClass} aria-label={ariaLabel}>
                      <span className="schedule-cell-day">{date.getDate()}</span>
                    </span>
                  );
                }

                return (
                  <button
                    key={key}
                    type="button"
                    className={cellClass}
                    onClick={() => handleRequestDay(date)}
                    aria-label={`Solicitar agendamento em ${date.toLocaleDateString('pt-BR')}`}
                  >
                    <span className="schedule-cell-day">{date.getDate()}</span>
                    <span className="schedule-cell-tag">Disponível</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="schedule-legend" aria-hidden="true">
            <span className="schedule-legend-item">
              <span className="schedule-legend-dot schedule-legend-dot-busy" />
              Reservado
            </span>
            <span className="schedule-legend-item">
              <span className="schedule-legend-dot schedule-legend-dot-free" />
              Disponível
            </span>
            <span className="schedule-legend-item">
              <span className="schedule-legend-dot schedule-legend-dot-today" />
              Hoje
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
