"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const slugTitleMap: Record<string, string> = {
  repurpose: "Repurpose",
  podcast: "Podcast",
  upgrade: "Upgrade",
};

function NavLink() {
  const router = useRouter()
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const projectId = segments[2]; // e.g. dashboard/projects/[projectId]/slug
  const slug = segments[3]; // Optional
  const pageTitle = slugTitleMap[slug?.toLowerCase()] || "Add Your Podcasts";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/dashboard"
            className="hover:text-[#7E22CE] text-[#808080] font-bold tracking-wider duration-300"
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            href="/dashboard/projects"
            className="hover:text-[#7E22CE] text-[#808080] font-bold tracking-wider duration-300"
          >
            <div className=" cursor-pointer " onClick={() => { router.push('/dashboard/projects') }} >Projects</div>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="hover:text-[#7E22CE] text-[#808080] font-bold tracking-wider duration-300"
          >
            <Link href={`/dashboard/projects/${projectId}/${slug || "#"}`}>
              {pageTitle}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default NavLink;
