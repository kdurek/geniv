import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageContext } from "vike-react/usePageContext";

export function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive =
    href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return (
    <a
      href={import.meta.env.BASE_URL + href}
      className={cn(
        buttonVariants({ variant: "link" }),
        isActive && "underline"
      )}
    >
      {children}
    </a>
  );
}
