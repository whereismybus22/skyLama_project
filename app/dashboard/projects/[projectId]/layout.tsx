import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/UI/app-sidebar"
import NavLink from "@/app/UI/NavLink"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <div className="min-h-screen flex flex-col ">
      <div className="h-[100vh] flex flex-col overflow-hidden ">
        <SidebarProvider
          style={{
            // @ts-ignore
            ["--sidebar-width"]: "14rem",
            // @ts-ignore
            ["--sidebar-width-mobile"]: "20rem",
          }}
        >
          <AppSidebar />

          <main className="flex-1 p-4">
            <div className=" flex items-center  gap-[1vw] " >
                <SidebarTrigger />
                <NavLink />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  )
}

