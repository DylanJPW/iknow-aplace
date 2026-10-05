import {Placeholder} from "./components/Placeholder.tsx";
import {SignUpPage } from "./components/SignUpPage.tsx";
import {Route, Routes} from "react-router";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}
