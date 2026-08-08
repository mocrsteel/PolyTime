"use client";
import Error from "@/components/pages/Error";

export default function GlobalError() {
  return (
    <html>
      <body>
        <Error
          global
          globalErrorMessage="A fatal error occurred which I cannot recover from.."
        />
      </body>
    </html>
  );
}
