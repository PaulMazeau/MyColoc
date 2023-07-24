import { createContext, useContext } from "react"

export const UserContext = createContext(null);
export const CourseContext = createContext(null);
export const DepenseContext = createContext(null);
export const ColocContext =  createContext(null);
export const AuPlusProcheContext = createContext(null);
export const RemboursementLoadingContext = createContext({ loading: false, setLoading: (value: boolean) => {}});
  