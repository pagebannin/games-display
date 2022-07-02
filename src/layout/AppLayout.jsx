import { Outlet } from "react-router-dom";
import { AppBody } from "./AppBody";
import { AppHeader } from "./AppHeader";


export function AppLayout() {
  return (
    <>
      <AppHeader />
      <AppBody>
        <Outlet />
      </AppBody>
    </>
  )
}
