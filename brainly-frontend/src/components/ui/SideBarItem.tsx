import type { ReactElement } from "react";

interface SideBarItemProps {
  title: string;
  icon: ReactElement;
}

export function SideBarItem({ title, icon }: SideBarItemProps) {
  return (
    <div className=" flex items-center  text-gray-700 cursor-pointer hover:bg-gray-200">
      <div className="p-2">{icon}</div>
      <div className="p-2">{title}</div>
    </div>
  );
}
