import { useEffect, useRef, useState } from "react";
import { Hacker, UserType } from "../Hacker/Hacker";
import styles from "./Computer.module.css";

interface ComputerProps {
  user?: UserType;
  className?: string;
}

export const Computer = ({ user, className }: ComputerProps) => {
  const [transitioning, setTransitioning] = useState(false);
  const prevUserId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const currentId = user?.id || user?.username;
    if (currentId !== prevUserId.current) {
      prevUserId.current = currentId;
      setTransitioning(true);
      const timer = setTimeout(() => setTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className={`${styles.computer} ${className}`}>
      <img
        src="/static.png"
        alt="Computer"
        width={288}
        height={288}
        fetchPriority="high"
        className={styles.staticImage}
      />
      <div className={styles.screenOverlay}>
        {user && <Hacker key={user.id || user.username} {...user} />}
        <div
          className={`${styles.noise} ${transitioning ? styles.noiseTransition : ""}`}
        />
      </div>
    </div>
  );
};
