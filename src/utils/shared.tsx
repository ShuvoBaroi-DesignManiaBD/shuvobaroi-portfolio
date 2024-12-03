import envConfig from "@/config";
import Link from "next/link";

export function formatDate(dateString ) {
  console.log(dateString);

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Add the ordinal suffix to the day
  const ordinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th"; // 11th to 20th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
}

export function generateHTML(description: any[]) {
  return description.map(
    (item: {
      type: string;
      children: any[];
      id: React.Key | null | undefined;
    }) => {
      if (item.type === "paragraph") {
        const paragraphContent = item.children.map(
          (
            child: {
              type: string;
              text:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              children: any[];
              url: string | UrlObject;
            },
            index: React.Key | null | undefined
          ) => {
            if (child.type === "text") {
              return <span key={index}>{child.text}</span>;
            } else if (child.type === "link") {
              const linkText = child.children.map(
                (
                  linkChild: {
                    bold: any;
                    underline: any;
                    text:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  linkIndex: React.Key | null | undefined
                ) => {
                  if (linkChild.bold && linkChild.underline) {
                    return (
                      <strong key={linkIndex}>
                        <u>{linkChild.text}</u>
                      </strong>
                    );
                  } else if (linkChild.bold) {
                    return <strong key={linkIndex}>{linkChild.text}</strong>;
                  } else if (linkChild.underline) {
                    return <u key={linkIndex}>{linkChild.text}</u>;
                  }
                  return linkChild.text;
                }
              );

              return (
                <Link
                  key={index}
                  href={child.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple"
                >
                  {linkText}
                </Link>
              );
            }
            return null;
          }
        );

        return (
          <p key={item.id}>
            {paragraphContent}
            <br />
          </p>
        );
      }
      return null;
    }
  );
}

export const genrateMainURL = (url: string) => {
  const finalURL = `${envConfig.baseApi?.split("/api")[0]}${url}`;
  console.log(finalURL, url);
  
  return finalURL;
};
