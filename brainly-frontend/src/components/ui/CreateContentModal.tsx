import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URI } from "../../config";
import { useContent } from "../../hooks/useContent";
//@ts-ignore
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModal({ open, onClose }: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const LinkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const content = useContent();
  async function addContent() {
    const title = titleRef.current?.value;
    const link = LinkRef.current?.value;
    await axios.post(`${BACKEND_URI}/api/v1/content`, {
      title,
      link,
      type
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    });
    onClose();
    content;
  }
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 opacity-60 flex justify-center"> 
          </div>
          {/* made an another div to make the first div transparent and the middle div to be clear and visible*/}
          <div className="w-screen h-screen fixed top-0 left-0  flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded">
                <div
                  onClick={onClose}
                  className="cursor-pointer flex justify-end"
                >
                  <CrossIcon />
                </div>
                <Input ref={titleRef} placeholder={"Title"} />
                <Input ref={LinkRef} placeholder={"Link"} />
                <div className="flex justify-center items-center">Type</div>
                <div className="flex justify-center items-center gap-4 p-4">
                  <Button
                    onClick={() => setType(ContentType.Youtube)}
                    title="Youtube"
                    variant={type === "youtube" ? "primary" : "secondary"}
                  />
                  <Button
                    onClick={() => {setType(ContentType.Twitter)}}
                    title="Twitter"
                    variant={type === "twitter" ? "primary" : "secondary"}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    
                    onClick={addContent}
                    variant="primary"
                    title={"Submit"}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
