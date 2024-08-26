import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { yaml } from "@codemirror/lang-yaml";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import CodeMirror from "@uiw/react-codemirror";

interface Props extends ReactCodeMirrorProps {
  wrapperClassName?: string;
  disabled?: boolean;
  language?: "yaml";
}

export function CodeEditor({
  className,
  wrapperClassName,
  language = "yaml",
  ...props
}: Props) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-auto border",
        wrapperClassName,
      )}
    >
      <CodeMirror
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightSelectionMatches: true,
          allowMultipleSelections: true,
        }}
        theme={theme === "dark" ? githubDark : githubLight}
        height="100%"
        width="100%"
        extensions={[yaml()]}
        {...props}
        className={cn("h-full w-full text-sm leading-relaxed", className)}
      />
    </div>
  );
}