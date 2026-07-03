import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background,box-shadow,color,border-color] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue via-violet to-purple text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] hover:shadow-[0_14px_44px_-10px_rgba(124,58,237,0.9)] hover:brightness-[1.08]",
  secondary:
    "bg-white/[0.045] text-fg border border-line-strong backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

function Inner({
  children,
  withArrow,
}: {
  children: React.ReactNode;
  withArrow?: boolean;
}) {
  return (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );
}

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    withArrow,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, onClick } = props as LinkProps;
    const ariaLabel = (props as LinkProps)["aria-label"];
    if (external || /^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
        >
          <Inner withArrow={withArrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    withArrow: _w,
    type = "button",
    ...rest
  } = props as ButtonProps;
  void _v;
  void _s;
  void _c;
  void _ch;
  void _w;

  return (
    <button type={type} className={classes} {...rest}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}
