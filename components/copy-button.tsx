import { CheckIcon, ClipboardIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useState } from "react";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-10 w-10 text-muted-foreground hover:bg-muted hover:text-foreground [&_svg]:h-6 [&_svg]:w-6",
        className
      )}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
