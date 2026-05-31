<script setup>
import { ref, reactive } from 'vue'


const services = [
  { id: 1, icon: '🎨', title: 'Diseño UI/UX', desc: 'Interfaces atractivas centradas en la experiencia del usuario.' },
  { id: 2, icon: '⚙️', title: 'Desarrollo Web', desc: 'Aplicaciones modernas con React, Vue y tecnologías actuales.' },
  { id: 3, icon: '📱', title: 'Responsive Design', desc: 'Proyectos que se ven perfectos en cualquier dispositivo.' },
]


const form = reactive({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
const errors = reactive({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
const submitted = ref(false)


function clearError(field) { errors[field] = '' }

// Validaciones
function validate() {
  let valid = true
  if (!form.nombre.trim()) { errors.nombre = 'El nombre es obligatorio.'; valid = false }
  else if (form.nombre.trim().length < 2) { errors.nombre = 'Mínimo 2 caracteres.'; valid = false }

  if (!form.email.trim()) { errors.email = 'El correo es obligatorio.'; valid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Correo inválido.'; valid = false }

  if (!form.telefono.trim()) { errors.telefono = 'El teléfono es obligatorio.'; valid = false }
  else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) { errors.telefono = 'Teléfono inválido (7-15 dígitos).'; valid = false }

  if (!form.asunto.trim()) { errors.asunto = 'El asunto es obligatorio.'; valid = false }

  if (!form.mensaje.trim()) { errors.mensaje = 'El mensaje es obligatorio.'; valid = false }
  else if (form.mensaje.trim().length < 10) { errors.mensaje = 'Mínimo 10 caracteres.'; valid = false }

  return valid
}



function handleSubmit() {
  Object.keys(errors).forEach(k => errors[k] = '')
  if (!validate()) return
  submitted.value = true
  Object.keys(form).forEach(k => form[k] = '')
}



const year = new Date().getFullYear()
</script>

<template>

  <header class="header">
    <nav class="nav" aria-label="Navegación principal">
      <a href="#inicio" class="logo">DevStudio</a>
      <ul class="nav-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="inicio" class="hero">
      <div class="hero-content">
        <h1>Creamos soluciones <span>digitales</span></h1>
        <p>Diseño y desarrollo web profesional para llevar tu proyecto al siguiente nivel.</p>
        <a href="#contacto" class="btn-hero">Contáctanos</a>
      </div>
    </section>

    <section id="servicios" class="services">
      <div class="container">
        <h2>Nuestros Servicios</h2>
        <p class="section-sub">Todo lo que necesitas para tu proyecto digital.</p>
        <ul class="services-grid">
          <!-- v-for renderiza las tarjetas dinámicamente -->
          <li v-for="s in services" :key="s.id" class="card">
            <span class="card-icon" aria-hidden="true">{{ s.icon }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="contacto" class="contact">
      <div class="container">
        <h2>Contáctanos</h2>
        <p class="section-sub">Completa el formulario y te responderemos pronto.</p>

        <p v-if="submitted" class="success-msg" role="status">
          ¡Mensaje enviado correctamente!
        </p>

        <form class="form" @submit.prevent="handleSubmit" novalidate aria-label="Formulario de contacto">

          <div class="field">
            <label for="nombre">Nombre completo</label>
            <input type="text" id="nombre" v-model="form.nombre"
              @input="clearError('nombre')" placeholder="Ej. Ana García"
              :aria-invalid="!!errors.nombre" />
            <span v-if="errors.nombre" class="error" role="alert">{{ errors.nombre }}</span>
          </div>

          <div class="field">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" v-model="form.email"
              @input="clearError('email')" placeholder="correo@ejemplo.com"
              :aria-invalid="!!errors.email" />
            <span v-if="errors.email" class="error" role="alert">{{ errors.email }}</span>
          </div>

          <div class="field">
            <label for="telefono">Teléfono</label>
            <input type="tel" id="telefono" v-model="form.telefono"
              @input="clearError('telefono')" placeholder="Ej. 0987654321"
              :aria-invalid="!!errors.telefono" />
            <span v-if="errors.telefono" class="error" role="alert">{{ errors.telefono }}</span>
          </div>

          <div class="field">
            <label for="asunto">Asunto</label>
            <input type="text" id="asunto" v-model="form.asunto"
              @input="clearError('asunto')" placeholder="¿En qué podemos ayudarte?"
              :aria-invalid="!!errors.asunto" />
            <span v-if="errors.asunto" class="error" role="alert">{{ errors.asunto }}</span>
          </div>

          <div class="field">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" rows="4" v-model="form.mensaje"
              @input="clearError('mensaje')" placeholder="Escribe tu mensaje aquí..."
              :aria-invalid="!!errors.mensaje" />
            <span v-if="errors.mensaje" class="error" role="alert">{{ errors.mensaje }}</span>
          </div>

          <button type="submit" class="btn-submit">Enviar mensaje</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>© {{ year }} DevStudio — Hecho con Vue</p>
  </footer>
</template>

