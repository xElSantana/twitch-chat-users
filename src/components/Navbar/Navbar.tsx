import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const REPO_URL = "https://github.com/CondorCoders/twitch-chat-users";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brandLink} aria-label="Inicio">
        <img
          src="/bitmap.svg"
          alt="Twitch !hack Chat"
          className={styles.logo}
          width={130}
          height={38}
        />
      </Link>

      {/* Navegación Desktop */}
      <nav className={styles.desktopNav} aria-label="Navegación principal">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoLink}
          aria-label="Repositorio en GitHub"
        >
          <img
            src="/MdiGithub.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            className={styles.githubIcon}
          />
          <span>Repositorio</span>
        </a>
      </nav>

      {/* Botón menú hamburguesa en móvil */}
      <button
        type="button"
        className={styles.hamburger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <img
            src="/Fa7SolidX.svg"
            alt=""
            width={22}
            height={22}
            aria-hidden="true"
            className={styles.closeIcon}
          />
        ) : (
          <img
            src="/PiconMenu.svg"
            alt=""
            width={22}
            height={22}
            aria-hidden="true"
            className={styles.menuIcon}
          />
        )}
      </button>

      {/* Desplegable móvil */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          className={styles.mobileMenu}
          aria-label="Menú móvil"
        >
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileNavLink}
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/MdiGithub.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className={styles.githubIcon}
            />
            <span>Repositorio</span>
          </a>
        </nav>
      )}
    </header>
  );
};
