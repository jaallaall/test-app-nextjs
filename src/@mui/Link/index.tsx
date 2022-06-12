import { Link as LinkMUI, LinkProps as LinkMUIProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

export type LinkProps = Omit<LinkMUIProps, "href" | "classes"> &
  Pick<NextLinkProps, "href" | "as" | "prefetch" | "locale">;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, as, prefetch, locale, sx, ...props }, ref) => (
    <NextLink href={href} as={as} prefetch={prefetch} passHref locale={locale}>
      <LinkMUI
        ref={ref}
        {...props}
        sx={{
          color: "inherit",
          textDecoration: "none",
          "&:hover,&:focus": {
            color: "primary.main",
          },
          ...sx,
        }}
      />
    </NextLink>
  )
);
