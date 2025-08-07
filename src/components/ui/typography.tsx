import { cn } from "@/lib/utils";

interface ITitle {
  title: string;
  className?: string;
}

interface IText {
  text: string;
  className?: string;
}

export function TypographyH3({ title, className }: ITitle) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {title}
    </h3>
  );
}

export function TypographyP({ text, className }: IText) {
  return <p className={cn("leading-7 ", className)}>{text}</p>;
}
