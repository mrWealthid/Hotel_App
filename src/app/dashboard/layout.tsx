import SideBar from "@/components/ui/SideBarComponent";
import Header from "./header/Header";
import "./style.css";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <header className="dashboard-header sticky top-0 w-full">
        <Header />
      </header>
      <section>
        <SideBar />
      </section>

      <section className=" dashboard-body sm:ml-64 flex flex-col h-screen gap-6 ">
        <section className="container-text mt-5 ">{children}</section>
      </section>
    </section>
  );
}
