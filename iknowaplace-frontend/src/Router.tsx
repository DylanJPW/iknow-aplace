import {Placeholder} from "./components/Placeholder.tsx";
import {Route, Routes} from "react-router";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder />} />
    </Routes>
  )
}
