import { useEffect, useState } from "react"

export function useESM(modulePath: string) {
  const [Module, setModule] = useState()

  useEffect(() => {
    async function update() {
      const module = await import(/* @vite-ignore */ modulePath)
      setModule(module)
    }
    update()
  }, [])

  return Module
}
