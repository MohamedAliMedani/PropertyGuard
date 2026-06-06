import { Outlet, Link, useLocation } from "react-router";
import { Home, FileText, MessageSquare, User, Shield, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { cn } from "../components/ui/utils";

export default function CustomerLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/customer", icon: Home },
    { name: "My Requests", href: "/customer/requests", icon: FileText },
    { name: "Messages", href: "/customer/messages", icon: MessageSquare },
    { name: "Profile", href: "/customer/profile", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/customer") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/customer" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[--color-trust-blue] to-[--color-security-green] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-[--color-trust-blue]">
                  Customer Portal
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="bg-[--color-security-green] hover:bg-[--color-security-green-dark]"
                asChild
              >
                <Link to="/customer/create-request">New Request</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-[--color-trust-blue] text-white"
                          : "text-foreground hover:bg-gray-100"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
              <div className="bg-white w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                          isActive(item.href)
                            ? "bg-[--color-trust-blue] text-white"
                            : "text-foreground hover:bg-gray-100"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
