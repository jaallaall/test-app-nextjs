import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { RouteKey } from "interfaces";

export const icons = {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  LinkedInIcon,
  LanguageIcon,
};

export const options = [
  { id: 1, value: "twitter", faValue: "توییتر", icon: "TwitterIcon" },
  { id: 2, value: "instagram", faValue: "اینستاگرام", icon: "InstagramIcon" },
  { id: 3, value: "facebook", faValue: "فیس بوک", icon: "FacebookIcon" },
  { id: 4, value: "telegram", faValue: "تلگرام", icon: "TelegramIcon" },
  { id: 5, value: "linkedIn", faValue: "لینکدین", icon: "LinkedInIcon" },
  { id: 6, value: "website", faValue: "وبسایت", icon: "LanguageIcon" },
];

export const breadcrumbs = [
  { id: 1, title: "home", href: RouteKey.Home },
  { id: 1, title: "setting", href: RouteKey.Setting },
  { id: 1, title: "user", href: RouteKey.User },
];
