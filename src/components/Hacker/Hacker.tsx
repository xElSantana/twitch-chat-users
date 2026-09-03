import { useState } from "react";
import styles from "./Hacker.module.css";

export interface UserType {
  id?: string;
  username?: string;
  profilePicture?: string;
}

export const Hacker = ({ username, profilePicture }: UserType) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className={`${styles.hackerImage} ${loaded ? styles.loaded : ""}`}
      src={profilePicture || ""}
      alt={`${username} Profile Picture`}
      width={230}
      height={200}
      onLoad={() => setLoaded(true)}
    />
  );
};

