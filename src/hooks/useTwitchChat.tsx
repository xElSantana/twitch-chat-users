import { ChatClient } from "@twurple/chat";
import { useEffect, useState } from "react";
import { UserType } from "../components/Hacker/Hacker";
import { RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

const authProvider = new RefreshingAuthProvider({
  clientId: import.meta.env.VITE_TWTICH_CLIENT_ID,
  clientSecret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
});

const apiClient = new ApiClient({ authProvider });

export const useTwitchChat = (channel?: string) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeUser = users[activeIndex];

  useEffect(() => {
    if (!channel) return;

    const chatClient = new ChatClient({
      channels: [channel.toLowerCase()],
    });

    chatClient.connect();
    chatClient.onMessage(async (_channel, _user, text, message) => {
      const [command] = text.split(" ");

      if (command?.toLowerCase() === "!hack") {
        const user = await apiClient.users.getUserById(
          message.userInfo.userId
        );
        const profilePicture = user?.profilePictureUrl;

        setUsers((prev) => {
          if (prev.some((u) => u.id === message.userInfo.userId)) return prev;
          return [
            ...prev,
            {
              id: message.userInfo.userId,
              username: message.userInfo.userName,
              profilePicture,
            },
          ];
        });
      }
    });

    return () => {
      chatClient.quit();
    };
  }, [channel]);

  useEffect(() => {
    if (users.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % users.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [users.length]);

  return { activeUser };
};
