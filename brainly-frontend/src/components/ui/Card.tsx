import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  type: "youtube" | "twitter";
  link: string;
}

export function Card({ title, type, link }: CardProps) {

  
  return (
    <div>
      <div className=" p-4 bg-white rounded-md border border-gray-300 max-w-72 min-h-48">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon size="md" />
            </div>
            {title}
          </div>
          <div className="flex items-center ">
            <div className="text-gray-500 pr-2">
              <a href={link}>
                <ShareIcon size="md" />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              width="560"
              height="315"
              src={link.replace("watch","embed").replace("?v=","/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com","twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
