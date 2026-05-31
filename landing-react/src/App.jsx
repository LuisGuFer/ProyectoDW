import { useState } from 'react'
import './App.css'

const services = [
  { id: 1, icon: '🎨', title: 'Diseño UI/UX', desc: 'Interfaces atractivas centradas en la experiencia del usuario.' },
  { id: 2, icon: '⚙️', title: 'Desarrollo Web', desc: 'Aplicaciones modernas con React, Vue y tecnologías actuales.' },
  { id: 3, icon: '📱', title: 'Responsive Design', desc: 'Proyectos que se ven perfectos en cualquier dispositivo.' },
]

const initialForm = { nombre: '', email: '', telefono: '', asunto: '', mensaje: '' }

function validate(form) {
  const errors = {}
  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.'
  else if (form.nombre.trim().length < 2) errors.nombre = 'Mínimo 2 caracteres.'
  if (!form.email.trim()) errors.email = 'El correo es obligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Correo inválido.'
  if (!form.telefono.trim()) errors.telefono = 'El teléfono es obligatorio.'
  else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) errors.telefono = 'Teléfono inválido (7-15 dígitos).'
  if (!form.asunto.trim()) errors.asunto = 'El asunto es obligatorio.'
  if (!form.mensaje.trim()) errors.mensaje = 'El mensaje es obligatorio.'
  else if (form.mensaje.trim().length < 10) errors.mensaje = 'Mínimo 10 caracteres.'
  return errors
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitted(true)
    setForm(initialForm)
    setErrors({})
  }

  return (
    <>
      <header className="header">
        <nav className="nav" aria-label="Navegación principal">
          <a href="#inicio" className="logo">DevStudio</a>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-content">
            <h1>Creamos soluciones <span>digitales</span></h1>
            <p>Diseño y desarrollo web profesional para llevar tu proyecto al siguiente nivel.</p>
            <a href="#contacto" className="btn-hero">Contáctanos</a>
          </div>
        </section>

        <section id="servicios" className="services">
          <div className="container">
            <h2>Nuestros Servicios</h2>
            <p className="section-sub">Todo lo que necesitas para tu proyecto digital.</p>
            <ul className="services-grid">
              {services.map(s => (
                <li key={s.id} className="card">
                  <span className="card-icon" aria-hidden="true">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contacto" className="contact">
          <div className="container">
            <h2>Contáctanos</h2>
            <p className="section-sub">Completa el formulario y te responderemos pronto.</p>

            {submitted && (
              <p className="success-msg" role="status"> ¡Mensaje enviado correctamente!</p>
            )}

            <form className="form" onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
              <div className="field">
                <label htmlFor="nombre">Nombre completo</label>
                <input type="text" id="nombre" name="nombre" value={form.nombre}
                  onChange={handleChange} placeholder="Ej. Ana García"
                  aria-invalid={!!errors.nombre} />
                {errors.nombre && <span className="error" role="alert">{errors.nombre}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="correo@ejemplo.com"
                  aria-invalid={!!errors.email} />
                {errors.email && <span className="error" role="alert">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" value={form.telefono}
                  onChange={handleChange} placeholder="Ej. 0987654321"
                  aria-invalid={!!errors.telefono} />
                {errors.telefono && <span className="error" role="alert">{errors.telefono}</span>}
              </div>

              <div className="field">
                <label htmlFor="asunto">Asunto</label>
                <input type="text" id="asunto" name="asunto" value={form.asunto}
                  onChange={handleChange} placeholder="¿En qué podemos ayudarte?"
                  aria-invalid={!!errors.asunto} />
                {errors.asunto && <span className="error" role="alert">{errors.asunto}</span>}
              </div>

              <div className="field">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows={4} value={form.mensaje}
                  onChange={handleChange} placeholder="Escribe tu mensaje aquí..."
                  aria-invalid={!!errors.mensaje} />
                {errors.mensaje && <span className="error" role="alert">{errors.mensaje}</span>}
              </div>

              <button type="submit" className="btn-submit">Enviar mensaje</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} DevStudio — Hecho con React</p>
      </footer>
    </>
  )
}

export default App