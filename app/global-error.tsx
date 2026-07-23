"use client"

import Error from '@/components/pages/Error'

// eslint-disable-next-line @next/next/no-async-client-component
export default async function GlobalError() {
  return (
    <html>
      <body>
        <Error global globalErrorMessage="A fatal error occurred which I cannot recover from.."/>
      </body>
    </html>
  )
}
