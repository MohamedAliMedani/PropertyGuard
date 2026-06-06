import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-[#1e3a8a] mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">{t('notFound.title')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('notFound.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
          >
            <Home className="w-4 h-4" />
            {t('notFound.goHome')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('notFound.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
}
