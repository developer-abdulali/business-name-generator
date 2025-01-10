import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLinks = [
  {
    title: "YouTube",
    href: "#",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://github.com/developer-abdulali",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://linkedin.com/in/abdulali12",
    icon: <Linkedin className="w-5 h-5" />,
  },

  {
    title: "Facebook",
    href: "https://facebook.com/abdulalisoomro20k3",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "#",
    icon: <Slack className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center space-x-3 gap-3.5" + className)}>
        {socialLinks?.map((link) => (
          <Tooltip key={link?.title}>
            <TooltipTrigger asChild>
              <Link
                href={link?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-white hoverEffect" +
                    iconClassName
                )}
              >
                {link?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold" + tooltipClassName
              )}
            >
              {link?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
export default SocialMedia;
