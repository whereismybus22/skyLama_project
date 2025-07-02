"use client";
import { Plus, Pen, Copy, Gem } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NavUser } from "./NavUser";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import QuesLogo from "@/public/QuesLogo.png"

 const items = [
    { title: "Add Your Podcast(s)", slug: "#", icon: Plus , default:true },
    { title: "Create & Repurpose", slug: "Repurpose", icon: Pen },
    { title: "Podcast Widget", slug: "Podcast", icon: Copy },
    { title: "Upgrade", slug: "Upgrade", icon: Gem },
  ];

export function AppSidebar() {
  const defaultItem = items.find((item) => item.default)?.title || items[0].title;
  const [activeItem, setActiveItem] = useState(defaultItem); // ✅ default active
  const [user , setUser] = useState()
  const params = useParams();
  const projectId = params?.projectId as string;
  const pathname = usePathname();

  useEffect(() => {
    const current = items.find((item) =>
      pathname.endsWith(`/${item.slug}`)
    );
    setActiveItem(current?.title || items[0].title);
  }, [pathname]);

  useEffect(() => {
    ( async () => {
      const res = await axios.get("/api/user")
      setUser(res.data)
    })()
  },[])
  
  
  return (
    <Sidebar className=" bg-white text-[#808080] border-[#5D5D5F]">
      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5 w-full h-[8vh] "
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-3">
                    <Image
                      src={QuesLogo}
                      alt="Kokonut Logo"
                      width={150}
                      className="flex-shrink-0 dark:block rounded-full"
                    />
                  </div>
                </a>
              </SidebarMenuButton>

              <SidebarMenu className="mt-[2vh]">
                {items.map((item) => {
                  const isActive = activeItem === item.title;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/dashboard/projects/${projectId}/${item.slug}`}
                          className={`flex items-center gap-2 px-2 py-2 rounded-md w-full transition-colors duration-200 ${
                            isActive
                              ? "bg-[#d9c5ebfb] text-[#7E22CE] "
                              : "text-muted-foreground "
                          } `}
                        >
                          <item.icon />
                          <span className="text-[1.13vw] font-bold">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <SidebarFooter className="dark:border-gray-700 mt-4">
          {user ? <NavUser user={user} /> : null}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
