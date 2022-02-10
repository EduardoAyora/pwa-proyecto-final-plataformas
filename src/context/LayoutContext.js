import { useState, createContext } from 'react'

const LayoutContext = createContext({ path: '', setPath: (arg) => {} })

export function LayoutContextProvider(props) {
  const [path, setPath] = useState('')

  const context = {
    path,
    setPath,
  }

  return (
    <LayoutContext.Provider value={context}>
      {props.children}
    </LayoutContext.Provider>
  )
}

export default LayoutContext
