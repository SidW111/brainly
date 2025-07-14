import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
  return (
    <div className="pl-6 pr-6 h-screen w-72 bg-white fixed border-r border-2 top-0 left-0">
      <div className="pt-6 flex items-center text-2xl">
        <div className="pr-2  text-purple-600">{<Logo />}</div>
        Brainly
      </div>
      <div className="pt-8">
        <SideBarItem title="Twitter" icon={<TwitterIcon />} />
        <SideBarItem title="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
