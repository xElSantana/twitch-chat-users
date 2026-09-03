import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import styles from "./Overlay.module.css";

const STEPS = [1, 2, 3] as const;

export const Overlay = () => {
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!previewImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  const trimmedChannel = channel.trim();
  const overlayLink = trimmedChannel
    ? `https://twitchhackoverlay.condorcoders.com/overlay/${trimmedChannel}`
    : "";

  const handleNextFromStep1 = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trimmedChannel) {
      setStep(2);
    }
  };

  const handleCopy = async () => {
    if (!overlayLink) return;
    try {
      await navigator.clipboard.writeText(overlayLink);
      setCopied(true);
    } catch {
      // Evita marcar éxito si el portapapeles rechaza la escritura
    }
  };

  return (
    <Layout>
      <div className={styles.wizardCard}>
        <h1 className={styles.title}>Crea tu Overlay</h1>

        <div className={styles.stepper} aria-label="Progreso de pasos">
          {STEPS.map((stepNumber) => {
            const isCurrent = step === stepNumber;
            const isDone = step > stepNumber;
            return (
              <div
                key={stepNumber}
                className={`${styles.stepDot} ${isCurrent
                  ? styles.stepDotActive
                  : isDone
                    ? styles.stepDotDone
                    : ""
                  }`}
              >
                {isDone ? "✓" : stepNumber}
              </div>
            );
          })}
        </div>

        {step === 1 && (
          <>
            <p className={styles.stepText}>
              Paso 1: Ingresa el nombre de tu canal de Twitch
            </p>
            <form onSubmit={handleNextFromStep1} className={styles.form}>
              <input
                className={styles.channelInput}
                type="text"
                name="channelName"
                id="channelName"
                value={channel}
                onChange={(e) => setChannel(e.target.value.toLowerCase())}
                placeholder="Ej. condorcoders"
                autoFocus
              />
              <div className={styles.navButtons}>
                <Link
                  to="/"
                  className={`${styles.button} ${styles.secondaryButton}`}
                >
                  Atrás
                </Link>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={!trimmedChannel}
                >
                  Continuar
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <p className={styles.stepText}>
              Paso 2: En OBS, agrega una fuente tipo "Navegador" (Browser)
            </p>
            <button
              type="button"
              className={styles.imageTrigger}
              onClick={() =>
                setPreviewImage({
                  src: "/OBS_Source.webp",
                  alt: "Agregar fuente Navegador en OBS",
                })
              }
              title="Haz clic para ampliar la imagen"
            >
              <img
                className={styles.instructionImage}
                src="/OBS_Source.webp"
                alt="Agregar fuente Navegador en OBS"
                width={1043}
                height={646}
              />
            </button>
            <div className={styles.navButtons}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={styles.button}
              >
                Siguiente
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className={styles.stepText}>
              Paso 3: Pega el enlace en la URL de la fuente de OBS
            </p>
            <div className={styles.linkBox}>{overlayLink}</div>
            <button
              type="button"
              onClick={handleCopy}
              className={`${styles.button} ${styles.copyButton}`}
            >
              {copied ? "¡Copiado! ✓" : "Copiar enlace"}
            </button>
            <button
              type="button"
              className={styles.imageTrigger}
              onClick={() =>
                setPreviewImage({
                  src: "/OBS_Create.webp",
                  alt: "Pegar enlace en configuración de OBS",
                })
              }
              title="Haz clic para ampliar la imagen"
            >
              <img
                className={styles.instructionImage}
                src="/OBS_Create.webp"
                alt="Pegar enlace en configuración de OBS"
                width={723}
                height={615}
              />
            </button>
            <div className={styles.navButtons}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                Atrás
              </button>
              <Link to="/" className={styles.button}>
                Finalizar
              </Link>
            </div>
          </>
        )}
      </div>

      {previewImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista previa ampliada"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className={styles.modalImage}
            />
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setPreviewImage(null)}
              aria-label="Cerrar vista previa"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};
