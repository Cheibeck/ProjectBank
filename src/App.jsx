import { useMemo, useState } from "react";

const demoUsers = ["Jhenny", "Isabella", "Agustin"];

const recipients = [
  { id: "topo", name: "Topo Gomez", initials: "TG", account: "•••• 4567", bank: "Banco Topo" },
  { id: "joaquin", name: "Joaquin Gomez", initials: "JG", account: "•••• 0789", bank: "Banco Nación" },
  { id: "pocoyo", name: "Pocoyo Pelado", initials: "PP", account: "•••• 0012", bank: "Banco Galicia" },
  { id: "pato", name: "Pato Amarillo", initials: "PA", account: "•••• 0123", bank: "Banco Topo" },
  { id: "eli", name: "Eli Rosa", initials: "ER", account: "•••• 0234", bank: "Banco Nación" },
];

const initialActivity = [
  { id: 1, name: "Pago de servicios", detail: "hace 1 día · 16:24", amount: -18500 },
  { id: 2, name: "Transferencia recibida", detail: "hace 1 día · 11:08", amount: 75000 },
  { id: 3, name: "Supermercado", detail: "hace 3 días · 19:32", amount: -32450 },
];

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    transfer: <><path d="M7 7h14m0 0-4-4m4 4-4 4" /><path d="M17 17H3m0 0 4 4m-4-4 4-4" /></>,
    cards: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.5 1.5c-.8 1-2.1 1.2-2.1 2.5M12 16.5h.01" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14m-7-7h14" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const user = demoUsers.find(
      (name) => name.toLowerCase() === username.trim().toLowerCase(),
    );

    if (!user || password !== "demo1234") {
      setError("Revisá tus datos. Podés usar las credenciales de prueba indicadas abajo.");
      return;
    }

    setError("");
    onLogin(user);
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Inicio de sesión">
        <a className="brand" href="#" aria-label="Banco Topo, inicio">
          <span className="brand-mark">t</span>
          <span>banco topo</span>
        </a>
        <div className="login-form-wrap">
          <h2>Ingresá a tu cuenta</h2>
          <p className="muted">Ingresá tu usuario y contraseña.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario</label>
            <input
              autoComplete="username"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Ej.: Jhenny"
              required
              value={username}
            />
            <div className="password-label">
              <label htmlFor="password">Contraseña</label>
            </div>
            <input
              autoComplete="current-password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresá tu contraseña"
              required
              type="password"
              value={password}
            />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary login-button" type="submit">
              Ingresar <Icon name="arrow" size={18} />
            </button>
          </form>

          <div className="demo-hint">
            <span className="hint-dot" />
            <div>
              <strong>Datos para probar</strong>
              <p>Usuario: Jhenny · Contraseña: demo1234</p>
            </div>
          </div>
          <p className="login-disclaimer">Demo: no uses datos bancarios reales.</p>
        </div>
      </section>
    </main>
  );
}

function Dashboard({ user, onLogout }) {
  const [balance, setBalance] = useState(1250000);
  const [invested, setInvested] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [investmentType, setInvestmentType] = useState("fondo");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentError, setInvestmentError] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transferError, setTransferError] = useState("");
  const [notice, setNotice] = useState("");
  const [activity, setActivity] = useState(initialActivity);
  const [showBalance, setShowBalance] = useState(true);

  const initials = user.slice(0, 1).toUpperCase();
  const today = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  const currentYear = new Date().getFullYear();
  const selected = useMemo(
    () => recipients.find((recipient) => recipient.id === selectedRecipient),
    [selectedRecipient],
  );

  function handleTransfer(event) {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!selected) {
      setTransferError("Elegí un destinatario para continuar.");
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setTransferError("Ingresá un monto mayor a $ 0.");
      return;
    }
    if (numericAmount > balance) {
      setTransferError("El monto supera tu saldo disponible.");
      return;
    }

    setBalance((current) => current - numericAmount);
    setActivity((current) => [
      {
        id: Date.now(),
        name: `Transferencia a ${selected.name}`,
        detail: " ahora",
        amount: -numericAmount,
      },
      ...current,
    ]);
    setNotice(`Transferencia simulada a ${selected.name} por ${currency.format(numericAmount)}.`);
    setSelectedRecipient("");
    setAmount("");
    setTransferError("");
  }

  function handleInvest(event) {
    event.preventDefault();
    const numericAmount = Number(investmentAmount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setInvestmentError("Ingresá un monto mayor a $ 0.");
      return;
    }
    if (numericAmount > balance) {
      setInvestmentError("El monto supera tu saldo disponible.");
      return;
    }

    const typeName = investmentType === "fondo"
      ? "Fondo de inversión demo"
      : investmentType === "plazo"
        ? "Plazo fijo demo"
        : "Acciones demo";

    setBalance((current) => current - numericAmount);
    setInvested((current) => current + numericAmount);
    setInvestments((current) => [
      { id: Date.now(), type: typeName, amount: numericAmount },
      ...current,
    ]);
    setActivity((current) => [
      {
        id: Date.now(),
        name: `Inversión: ${typeName}`,
        detail: " ahora",
        amount: -numericAmount,
      },
      ...current,
    ]);
    setNotice(`Inversión simulada de ${currency.format(numericAmount)} en ${typeName}.`);
    setInvestmentAmount("");
    setInvestmentError("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Banco Topo, inicio">
          <span className="brand-mark">t</span>
          <span>banco topo</span>
        </a>
        <span className="nav-caption">MENÚ PRINCIPAL</span>
        <nav className="main-nav" aria-label="Menú principal">
          <a className="nav-item active" href="#inicio" aria-current="page">
            <Icon name="home" /> <span>Inicio</span>
          </a>
          <a className="nav-item" href="#transferencias">
            <Icon name="transfer" /> <span>Transferencias</span>
          </a>
          <a className="nav-item" href="#actividad">
            <Icon name="cards" /> <span>Actividad</span>
          </a>
          <a className="nav-item" href="#inversiones">
            <Icon name="plus" /> <span>Inversiones</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <a className="nav-item" href="mailto:ayuda@bancotopo.example">
            <Icon name="help" /> <span>Centro de ayuda</span>
          </a>
          <div className="sidebar-profile">
            <span className="avatar">{initials}</span>
            <div className="profile-copy"><strong>{user}</strong><span>Cuenta personal</span></div>
            <button className="icon-button logout-button" onClick={onLogout} type="button" aria-label="Cerrar sesión">
              <Icon name="logout" size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="dashboard" id="inicio">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Mi espacio <span>/</span> Inicio</p>
            <p className="demo-label"><span className="hint-dot" /> Entorno de demostración</p>
          </div>
          <div className="topbar-user">
            <span className="topbar-date">Tu banco, siempre a mano</span>
            <span className="avatar avatar-small">{initials}</span>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <span className="eyebrow welcome-date">{today}</span>
              <h1>¡Hola, {user}! <span className="wave">✳</span></h1>
              <p className="muted">Qué bueno tenerte por acá. ¿Qué hacemos hoy?</p>
            </div>
            <button className="button button-primary new-transfer" onClick={() => document.getElementById("destinatario")?.focus()} type="button">
              <Icon name="plus" size={18} /> Nueva transferencia
            </button>
          </section>

          <section className="overview-grid" aria-label="Resumen de cuenta">
            <article className="balance-card">
              <div className="balance-card-top">
                <span>Saldo disponible</span>
                <button
                  aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
                  className="balance-toggle"
                  onClick={() => setShowBalance((visible) => !visible)}
                  type="button"
                >
                  <Icon name="eye" size={19} />
                </button>
              </div>
              <p className="balance-amount">{showBalance ? currency.format(balance) : "$ •••••••"}</p>
              <div className="account-meta"><span>Cuenta en pesos</span><span>·</span><span>•••• 2084</span></div>
              <div className="balance-footer"><span><span className="balance-status" /> Cuenta activa</span><span>CBU terminada en 6789</span></div>
            </article>

            <article className="quick-card">
              <div className="quick-icon"><Icon name="transfer" size={21} /></div>
              <div className="quick-copy">
                <span>Transferencias</span>
                <strong>Enviá dinero<br />en pocos pasos</strong>
              </div>
              <a className="round-arrow" href="#transferencias" aria-label="Ir a transferencias"><Icon name="arrow" size={19} /></a>
              <div className="quick-decoration" />
            </article>
          </section>

          <div className="section-heading">
            <div><h2>Lo que necesitás</h2><p className="muted">Tus operaciones, simples y rápidas.</p></div>
          </div>
          {notice && (
            <div className="success-banner" role="status">
              <span className="success-icon"><Icon name="check" size={16} /></span>
              <span>{notice} El saldo y la actividad se actualizaron en esta sesión.</span>
              <button className="icon-button" onClick={() => setNotice("")} type="button" aria-label="Cerrar aviso"><Icon name="close" size={17} /></button>
            </div>
          )}

          <div className="content-grid">
            <section className="panel transfer-panel" id="transferencias">
              <div className="panel-heading">
                <div className="panel-icon"><Icon name="transfer" size={20} /></div>
                <div><h2>Hacer una transferencia</h2><p>Enviá dinero a una cuenta guardada.</p></div>
              </div>
              <form className="transfer-form" onSubmit={handleTransfer}>
                <label htmlFor="destinatario">¿A quién le transferís?</label>
                <select
                  id="destinatario"
                  onChange={(event) => { setSelectedRecipient(event.target.value); setTransferError(""); }}
                  required
                  value={selectedRecipient}
                >
                  <option value="" disabled>Seleccioná un destinatario</option>
                  {recipients.map((recipient) => (
                    <option key={recipient.id} value={recipient.id}>{recipient.name} · {recipient.account}</option>
                  ))}
                </select>
                {selected && <p className="recipient-bank">Cuenta en {selected.bank}</p>}
                <label htmlFor="monto">¿Cuánto querés enviar?</label>
                <div className="amount-input">
                  <span>$</span>
                  <input
                    id="monto"
                    inputMode="decimal"
                    min="0.01"
                    onChange={(event) => { setAmount(event.target.value); setTransferError(""); }}
                    placeholder="0,00"
                    required
                    step="0.01"
                    type="number"
                    value={amount}
                  />
                  <span className="currency-suffix">ARS</span>
                </div>
                <p className="available-balance">Disponible: <strong>{currency.format(balance)}</strong></p>
                {transferError && <p className="form-error" role="alert">{transferError}</p>}
                <button className="button button-primary transfer-submit" type="submit">
                  Revisar y transferir <Icon name="arrow" size={18} />
                </button>
                <p className="transfer-disclaimer">Operación simulada: no se mueve dinero real.</p>
              </form>
            </section>

            <section className="panel activity-panel" id="actividad">
              <div className="activity-heading">
                <div><h2>Últimos movimientos</h2><p>Tu actividad reciente</p></div>
                <a href="#actividad" className="see-all">Ver todos <Icon name="arrow" size={15} /></a>
              </div>
              <div className="activity-list">
                {activity.map((item) => (
                  <article className="activity-item" key={item.id}>
                    <span className={`activity-icon ${item.amount > 0 ? "incoming" : ""}`}>
                      <Icon name={item.amount > 0 ? "arrow" : "clock"} size={18} />
                    </span>
                    <div className="activity-name"><strong>{item.name}</strong><span>{item.detail}</span></div>
                    <strong className={`activity-amount ${item.amount > 0 ? "positive" : ""}`}>
                      {item.amount > 0 ? "+" : "−"}{currency.format(Math.abs(item.amount))}
                    </strong>
                  </article>
                ))}
              </div>
              <div className="activity-note"><span className="note-dot" /> Tus movimientos están al día</div>
            </section>
          </div>

          <section className="panel investment-panel" id="inversiones">
            <div className="investment-intro">
              <div>
                <span className="eyebrow">HACÉ CRECER TU DINERO</span>
                <h2>Inversiones</h2>
                <p className="muted">Elegí una opción y simulá una inversión desde tu saldo disponible.</p>
              </div>
              <div className="invested-total">
                <span>Total invertido</span>
                <strong>{currency.format(invested)}</strong>
              </div>
            </div>
            <form className="investment-form" onSubmit={handleInvest}>
              <div className="investment-field">
                <label htmlFor="tipo-inversion">Tipo de inversión</label>
                <select
                  id="tipo-inversion"
                  onChange={(event) => setInvestmentType(event.target.value)}
                  value={investmentType}
                >
                  <option value="fondo">Fondo de inversión demo</option>
                  <option value="plazo">Plazo fijo demo</option>
                  <option value="acciones">Acciones demo</option>
                </select>
              </div>
              <div className="investment-field">
                <label htmlFor="monto-inversion">Monto a invertir</label>
                <div className="amount-input">
                  <span>$</span>
                  <input
                    id="monto-inversion"
                    inputMode="decimal"
                    min="0.01"
                    onChange={(event) => { setInvestmentAmount(event.target.value); setInvestmentError(""); }}
                    placeholder="0,00"
                    required
                    step="0.01"
                    type="number"
                    value={investmentAmount}
                  />
                  <span className="currency-suffix">ARS</span>
                </div>
              </div>
              <button className="button button-primary invest-submit" type="submit">
                Invertir <Icon name="arrow" size={18} />
              </button>
            </form>
            <p className="available-balance investment-available">Disponible: <strong>{currency.format(balance)}</strong></p>
            {investmentError && <p className="form-error" role="alert">{investmentError}</p>}
            <p className="transfer-disclaimer investment-disclaimer">
              Simulación educativa: no se realizan inversiones ni se garantizan rendimientos.
            </p>
            {investments.length > 0 && (
              <div className="investment-list">
                <h3>Mis inversiones simuladas</h3>
                {investments.map((investment) => (
                  <div className="investment-item" key={investment.id}>
                    <span>{investment.type}</span>
                    <strong>{currency.format(investment.amount)}</strong>
                  </div>
                ))}
              </div>
            )}
          </section>

          <footer className="dashboard-footer">
            <span>© {currentYear} Banco Topo · Prototipo educativo</span>
            <span>No ingreses información bancaria real en esta demo.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState("");
  return user ? (
    <Dashboard user={user} onLogout={() => setUser("")} />
  ) : (
    <Login onLogin={setUser} />
  );
}
