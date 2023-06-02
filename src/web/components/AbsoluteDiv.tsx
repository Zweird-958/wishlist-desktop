import React from "react"
import clsx from "clsx"
import FullDiv from "@/components/FullDiv"

type Props = {
  children: React.ReactNode
  className?: string
}

const AbsoluteDiv = (props: Props) => {
  const { children, className } = props

  return (
    <FullDiv className={clsx("absolute -z-10 ", className)}>{children}</FullDiv>
  )
}

export default AbsoluteDiv
