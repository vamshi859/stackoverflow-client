import React from 'react'

const Avatar = ({children,backgroundColor,px,py,color,fontSize,textAlign,cursor,borderRadius,textDecoration}) => {
  const style ={
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || 'black',
    fontSize,
    textAlign: "center",
    cursor: cursor || "null",
    borderRadius,
    textDecoration
  }
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Avatar