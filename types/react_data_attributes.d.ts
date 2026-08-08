import type {} from "react";

declare module "react" {
  interface HTMLAttributes<T> {
    [name: `data-${string}`]: string;
  }
}
