
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { 
  User, 
  Users, 
  BarChart3, 
  FileText, 
  FolderKanban, 
  Settings, 
  TrendingUp, 
  UserCheck 
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  onLogout: () => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPage, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const { translations, standbyMode } = useSettings();

  const menuItems = [
    { id: "profile", label: translations["Mon profil"] || "Mon profil", icon: User, path: "/profile" },
    { id: "internships", label: translations["Gestion des Stagiaires"] || "Gestion des Stagiaires", icon: Users, path: "/internships" },
    { id: "evaluations", label: translations["Évaluations"] || "Évaluations", icon: BarChart3, path: "/evaluations" },
    { id: "projects", label: translations["Gestion des Projets"] || "Gestion des Projets", icon: FolderKanban, path: "/projects" },
    { id: "affectation", label: translations["Affectation"] || "Affectation", icon: UserCheck, path: "/affectation" },
    { id: "reports", label: translations["Rapports"] || "Rapports", icon: FileText, path: "/reports" },
    { id: "statistics", label: translations["Statistiques"] || "Statistiques", icon: TrendingUp, path: "/statistics" },
    { id: "settings", label: translations["Paramètres"] || "Paramètres", icon: Settings, path: "/settings" },
  ];

  return (
    <div className={`bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 animate-slide-in-right ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col ${standbyMode ? 'opacity-70 brightness-75' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {sidebarOpen && (
          <div className="flex items-center space-x-2 animate-fade-in overflow-hidden">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-8 w-auto flex-shrink-0"
            />
            <span className={`font-bold text-blue-800 dark:text-blue-300 truncate ${standbyMode ? 'text-sm' : 'text-base'}`}>MTFoP</span>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 hover-scale transition-all duration-300 flex-shrink-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${standbyMode ? 'text-gray-600 dark:text-gray-400' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18m-9-9l9 9-9 9"/>
          </svg>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 hover-scale overflow-hidden ${
                    currentPage === item.id 
                      ? `bg-blue-800 text-white dark:bg-blue-700 dark:text-white ${standbyMode ? 'bg-blue-700 dark:bg-blue-600' : ''}` 
                      : `hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 ${standbyMode ? 'text-gray-600 dark:text-gray-400 hover:bg-blue-25 dark:hover:bg-blue-950' : ''}`
                  } ${standbyMode ? 'py-1.5' : 'py-2'}`}
                  onClick={() => navigate(item.path)}
                  title={sidebarOpen ? undefined : item.label}
                >
                  <IconComponent size={standbyMode ? 16 : 18} className="flex-shrink-0" />
                  {sidebarOpen && (
                    <span className={`ml-3 animate-fade-in truncate ${standbyMode ? 'text-xs' : 'text-sm'}`}>
                      {item.label}
                    </span>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={`w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 hover-scale transition-all duration-300 overflow-hidden ${
            standbyMode ? 'text-red-500 dark:text-red-400 py-1.5' : 'py-2'
          }`}
          title={sidebarOpen ? undefined : translations["Déconnexion"] || "Déconnexion"}
        >
          <span className={`${standbyMode ? 'text-base' : 'text-lg'} flex-shrink-0`}>🚪</span>
          {sidebarOpen && (
            <span className={`ml-3 animate-fade-in truncate ${standbyMode ? 'text-xs' : 'text-sm'}`}>
              {translations["Déconnexion"] || "Déconnexion"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
