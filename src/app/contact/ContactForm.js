'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import styles from './ContactForm.module.css'

const EMPTY = { name: '', email: '', subject: '', message: '' }

// TODO: Replace the simulated submit with a real API call.
// Options: Resend (https://resend.com), EmailJS, Formspree, or a custom Next.js API route.
// Example:
//   const res = await fetch('/api/contact', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData),
//   })

export default function ContactForm() {
  const [form,   setForm]   = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulated network delay for static demo
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
    setForm(EMPTY)
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h2 className={styles.successHeading}>Message Sent!</h2>
        <p className={styles.successBody}>
          Thank you for reaching out. I'll get back to you within 48 hours.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send Another
        </Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Field label="Name" id="name" type="text" value={form.name} onChange={handleChange}
          placeholder="Your name" required />
        <Field label="Email" id="email" type="email" value={form.email} onChange={handleChange}
          placeholder="your@email.com" required />
      </div>

      <Field label="Subject" id="subject" type="text" value={form.subject} onChange={handleChange}
        placeholder="What's this about?" required />

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Tell me about your project or collaboration idea..."
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}

// Inline helper — keeps the JSX above readable
function Field({ label, id, type, value, onChange, placeholder, required }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  )
}
