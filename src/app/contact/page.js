import ContactForm from './ContactForm'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact',
  description: 'Available for collaborations, brand partnerships, and styling inquiries.',
}

// TODO: Replace placeholder values below with real contact info
const CONTACT_INFO = [
  { heading: 'Email',        body: 'hello@elitestyle.com',  href: 'mailto:hello@elitestyle.com' },
  { heading: 'Instagram',    body: '@elitestyle',           href: '#' },
  { heading: 'Pinterest',    body: '@elitestyle',           href: '#' },
  { heading: 'Based In',     body: 'Mumbai, India',         href: null },
  { heading: 'Availability', body: 'Open to collaborations', href: null },
]

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>Get in Touch</p>
          <h1 className={styles.heading}>Contact</h1>
          <p className={styles.lead}>
            Available for collaborations, brand partnerships, and styling inquiries.
          </p>
        </div>
      </section>

      {/* Content: info + form */}
      <section className={`section ${styles.content}`}>
        <div className={`container ${styles.inner}`}>

          {/* Contact info sidebar */}
          <aside className={styles.info}>
            {CONTACT_INFO.map(({ heading, body, href }) => (
              <div key={heading} className={styles.infoItem}>
                <h3 className={styles.infoHeading}>{heading}</h3>
                {href ? (
                  <a
                    href={href}
                    className={styles.infoLink}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {body}
                  </a>
                ) : (
                  <p className={styles.infoText}>{body}</p>
                )}
              </div>
            ))}
          </aside>

          {/* Form (client component) */}
          <ContactForm />
        </div>
      </section>
    </>
  )
}
