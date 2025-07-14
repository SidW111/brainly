import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/ui/SideBar";
import { useContent } from "../hooks/useContent";

export default function Dashboard(){
  const [modal, setModal] = useState(false);
  const {contents,refresh} = useContent();

  useEffect(() => {
    refresh()
  },[modal])
  return (
    <div>
      <SideBar />

      <div className="p-4 ml-72 min-h-screen bg-gray-200">
        <CreateContentModal
          open={modal}
          onClose={() => {
            setModal(false);
          }}
        />
        <div className="flex justify-end gap-2 pb-2">
          <Button
            startIcon={<ShareIcon size="lg" />}
            title={"Share Brain"}
            variant="secondary"
          ></Button>
          <Button
            onClick={() => {
              setModal(true);
            }}
            startIcon={<PlusIcon size="lg" />}
            title={"Add Content"}
            variant="primary"
          ></Button>
        </div>

        <div className="flex gap-4 flex-wrap">
          {contents.map(({type,link,title}) => <Card
            type={type}
            link={link}
            title={title}
          /> )}
        </div>
      </div>
    </div>
  );
}

