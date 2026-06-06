import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { CustomerPortalLayout } from "./layouts/CustomerPortalLayout";
import { ExpertPortalLayout } from "./layouts/ExpertPortalLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Public Pages
import { HomePage } from "./pages/public/HomePage";
import { ServicesPage } from "./pages/public/ServicesPage";
import { PricingPage } from "./pages/public/PricingPage";
import { AboutPage } from "./pages/public/AboutPage";
import { ContactPage } from "./pages/public/ContactPage";

// Customer Portal
import { CustomerDashboard } from "./pages/customer/CustomerDashboard";
import { CreateRequest } from "./pages/customer/CreateRequest";
import { MyRequests } from "./pages/customer/MyRequests";
import { RequestDetails } from "./pages/customer/RequestDetails";
import { Documents } from "./pages/customer/Documents";
import { Payments } from "./pages/customer/Payments";
import { Messages } from "./pages/customer/Messages";
import { CustomerProfile } from "./pages/customer/CustomerProfile";

// Expert Portal
import { LawyerDashboard } from "./pages/expert/LawyerDashboard";
import { EngineerDashboard } from "./pages/expert/EngineerDashboard";
import { GovExpertDashboard } from "./pages/expert/GovExpertDashboard";
import { ExpertCaseDetails } from "./pages/expert/ExpertCaseDetails";
import { ExpertSchedule } from "./pages/expert/ExpertSchedule";

// Admin Portal
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { ExpertManagement } from "./pages/admin/ExpertManagement";
import { RequestManagement } from "./pages/admin/RequestManagement";
import { TransactionManagement } from "./pages/admin/TransactionManagement";
import { SupportTickets } from "./pages/admin/SupportTickets";
import { Analytics } from "./pages/admin/Analytics";

// Auth (simplified for demo)
import { LoginPage } from "./pages/auth/LoginPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // Public Website
      {
        path: "",
        Component: PublicLayout,
        children: [
          { index: true, Component: HomePage },
          { path: "services", Component: ServicesPage },
          { path: "pricing", Component: PricingPage },
          { path: "about", Component: AboutPage },
          { path: "contact", Component: ContactPage },
        ],
      },
      // Auth
      { path: "login", Component: LoginPage },
      
      // Customer Portal
      {
        path: "customer",
        Component: CustomerPortalLayout,
        children: [
          { index: true, Component: CustomerDashboard },
          { path: "create-request", Component: CreateRequest },
          { path: "requests", Component: MyRequests },
          { path: "requests/:id", Component: RequestDetails },
          { path: "documents", Component: Documents },
          { path: "payments", Component: Payments },
          { path: "messages", Component: Messages },
          { path: "profile", Component: CustomerProfile },
        ],
      },
      
      // Expert Portal
      {
        path: "expert/lawyer",
        Component: ExpertPortalLayout,
        children: [
          { index: true, Component: LawyerDashboard },
          { path: "case/:id", Component: ExpertCaseDetails },
          { path: "schedule", Component: ExpertSchedule },
        ],
      },
      {
        path: "expert/engineer",
        Component: ExpertPortalLayout,
        children: [
          { index: true, Component: EngineerDashboard },
          { path: "case/:id", Component: ExpertCaseDetails },
          { path: "schedule", Component: ExpertSchedule },
        ],
      },
      {
        path: "expert/government",
        Component: ExpertPortalLayout,
        children: [
          { index: true, Component: GovExpertDashboard },
          { path: "case/:id", Component: ExpertCaseDetails },
        ],
      },
      
      // Admin Portal
      {
        path: "admin",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "users", Component: UserManagement },
          { path: "experts", Component: ExpertManagement },
          { path: "requests", Component: RequestManagement },
          { path: "transactions", Component: TransactionManagement },
          { path: "support", Component: SupportTickets },
          { path: "analytics", Component: Analytics },
        ],
      },
      
      // 404
      { path: "*", Component: NotFound },
    ],
  },
]);
