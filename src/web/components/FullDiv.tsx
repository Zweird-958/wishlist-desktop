import React from "react"
import clsx from "clsx"

type Props = {
  children: React.ReactNode
  className?: string
}

const FullDiv = (props: Props) => {
  const { children, className } = props

  return (
    <div
      className={clsx(
        "flex h-screen w-full items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export default FullDiv
