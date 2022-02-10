import { useContext, useEffect } from 'react'
import LayoutContext from '../context/LayoutContext'

export default function Cajeros() {
  const layoutContext = useContext(LayoutContext)
  const { setPath } = layoutContext

  useEffect(() => {
    setPath(window.location.pathname)
  }, [])
  return <div>Cajeros</div>
}
