import { useParams } from "react-router-dom";
import { useTwitchChat } from "../../hooks/useTwitchChat";
import { Computer } from "../../components/Computer/Computer";
import styles from "./Embed.module.css";

export const Embed = () => {
  const { channel } = useParams();
  const { activeUser } = useTwitchChat(channel);

  return (
    <main className={styles.wrapper} role="main">
      <Computer user={activeUser} />
    </main>
  );
};
