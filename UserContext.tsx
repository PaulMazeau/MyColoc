import { createContext, useContext } from "react"

//futur type user à écrire 

export type user = null | string

export type GlobalContent = {
  user: user
  setUser:(c: user) => void
}

export const GlobalContext = createContext<GlobalContent>({
user: null, //valeur par défault
setUser: () => {},
})
export const useGlobalContext = () => useContext(GlobalContext)