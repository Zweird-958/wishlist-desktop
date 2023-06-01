import React from "react"

type Props = {
  children: React.ReactNode
}

const AbsoluteDiv = (props: Props) => {
  const { children } = props

  return (
    <div className="absolute -z-10 flex h-screen w-full items-center justify-center">
      {children}
    </div>
  )
}

export default AbsoluteDiv
