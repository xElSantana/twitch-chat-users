import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.mainContainer} role="main">
      {children}
    </main>
  );
};
