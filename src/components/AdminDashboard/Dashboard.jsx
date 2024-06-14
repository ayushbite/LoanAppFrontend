import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import CenterRegistration from "./CenterRegistration";
import MemberRegistration from "./MemberRegistration";
import LoanRegistration from "./LoanRegistration";
import PaymentRegistration from "./PaymentRegistration";



export default function Component() {
  const [activeComponent, setActiveComponent] = useState("center");

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
    console.log("Logout button clicked!");
  }

  return (
      <div className="flex min-h-screen w-full">
        <Toaster />
        <div className="hidden bg-gray-100 dark:bg-gray-800 md:block">
          <div className="flex h-full flex-col items-start justify-between px-6 py-8">
            <div className="flex flex-col items-start gap-6">
              <button className="flex items-center gap-2 text-lg font-semibold">
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Acme Loans</span>
              </button>
              <nav className="flex flex-col items-start gap-2 text-sm font-medium">
                <button
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                >
                  <HomeIcon className="h-4 w-4" />
                  Dashboard
                </button>
                <button
                    className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                        activeComponent === "center"
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                            : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                    }`}
                    onClick={() => setActiveComponent("center")}
                >
                  <FileTextIcon className="h-4 w-4" />
                  Center Registration
                </button>
                <button
                    className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                        activeComponent === "member"
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                            : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                    }`}
                    onClick={() => setActiveComponent("member")}
                >
                  <MemberRegistrationIcon className="h-4 w-4" />
                  Member Registration
                </button>
                <button
                    className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                        activeComponent === "loan"
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                            : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                    }`}
                    onClick={() => setActiveComponent("loan")}
                >
                  <UsersIcon className="h-4 w-4" />
                  Loan Registration
                </button>
                <button
                    className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                        activeComponent === "payment"
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                            : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                    }`}
                    onClick={() => setActiveComponent("payment")}
                >
                  <BarChartIcon className="h-4 w-4" />
                  Payment Registration
                </button>
              </nav>
            </div>
            <div className="flex flex-col items-start gap-2">
              <button
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </button>
              <button
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                  onClick={handleLogout}
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between bg-gray-100 px-4 py-3 md:hidden dark:bg-gray-800">
            <button className="flex items-center gap-2 text-lg font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Acme Loans</span>
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-gray-100 dark:bg-gray-800">
                <nav className="grid gap-2 px-4 py-6 text-sm font-medium">
                  <button
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                  >
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                  </button>
                  <button
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                          activeComponent === "center"
                              ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                      }`}
                      onClick={() => setActiveComponent("center")}
                  >
                    <FileTextIcon className="h-4 w-4" />
                    Center Registration
                  </button>
                  <button
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                          activeComponent === "member"
                              ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                      }`}
                      onClick={() => setActiveComponent("member")}
                  >
                    <MemberRegistrationIcon className="h-4 w-4" />
                    Member Registration
                  </button>
                  <button
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                          activeComponent === "loan"
                              ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                      }`}
                      onClick={() => setActiveComponent("loan")}
                  >
                    <UsersIcon className="h-4 w-4" />
                    Loan Registration
                  </button>
                  <button
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                          activeComponent === "payment"
                              ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                      }`}
                      onClick={() => setActiveComponent("payment")}
                  >
                    <BarChartIcon className="h-4 w-4" />
                    Payment Registration
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <main className="px-4 py-8 md:px-8 md:py-12">
            {activeComponent === "center" && <CenterRegistration />}
            {activeComponent === "member" && <MemberRegistration />}
            {activeComponent === "loan" && <LoanRegistration />}
            {activeComponent === "payment" && <PaymentRegistration />}
          </main>
        </div>
      </div>
  );
}

function BarChartIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
  );
}

function CircleCheckIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
  );
}

function MemberRegistrationIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M9 15h6" />
        <path d="M12 18v-6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
  );
}


function FileTextIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
  );
}

function HomeIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
  );
}

function LogOutIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
  );
}

function MenuIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
  );
}

function MoveHorizontalIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <polyline points="18 8 22 12 18 16" />
        <polyline points="6 8 2 12 6 16" />
        <line x1="2" x2="22" y1="12" y2="12" />
      </svg>
  );
}

function Package2Icon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
  );
}

function SettingsIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
  );
}

function UsersIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
  );
}
