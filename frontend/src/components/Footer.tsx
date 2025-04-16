import { FC } from "react";

export const Footer: FC = () => {
  const socialNavigations = [
    {
      text: "Instagram",
      link: "https://www.instagram.com/sumico_hub",
    },
    {
      text: "Linkedin",
      link: "",
    },
    {
      text: "Telegram",
      link: "",
    },
    {
      text: "Discord",
      link: "",
    },
    {
      text: "Support service",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <footer className="root-footer padding:45|45|25|45 flex gap-x:40 bg:#f2f4fa">
      {socialNavigations.map((navigation) => (
        <a
          key={navigation.text}
          href={navigation.link}
          target="_blank"
          className="cursor:pointer text-decoration:none f:#212427 f:medium text-decoration:underline:hover"
        >
          {navigation.text}
        </a>
      ))}
    </footer>
  );
};
