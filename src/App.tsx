import { Link, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import styles from "./App.module.css";
import { Computer } from "./components/Computer/Computer";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const channelName = formData.get("channelName");

    if (channelName && typeof channelName === "string") {
      navigate(`/${channelName.trim().toLowerCase()}`);
    }
  };

  return (
    <Layout>
      <Navbar />
      <Computer className={styles.computer} />
      <p className={styles.description}>
        Muestra a tus espectadores en pantalla con el comando <span className={styles.accent}>!hack</span> en el chat
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.channelInput}
          type="text"
          name="channelName"
          id="channelName"
          placeholder="Ej. condorcoders"
        />
        <button className={styles.button}>Crear</button>
      </form>
      <p className={styles.overlayPrompt}>
        ¿Quieres usarlo como un overlay de OBS?
      </p>
      <Link to={"/overlay-instructions"} className={styles.button}>
        Crear mi overlay
      </Link>
    </Layout>
  );
}

export default App;
