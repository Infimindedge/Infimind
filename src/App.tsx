import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoading } from '@/components/ui/PageLoading';

const Home = lazy(() => import('@/pages/Home'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const Admin = lazy(() => import('@/pages/Admin'));
const NavichiPage = lazy(() => import('@/pages/NavichiPage'));
const Philosophy = lazy(() => import('@/pages/Philosophy'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogArticle = lazy(() => import('@/pages/BlogArticle'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Careers = lazy(() => import('@/pages/Careers'));
const SchoolProgrammePage = lazy(() => import('@/pages/SchoolProgrammePage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/**
 * React Router doesn't reset scroll position on client-side navigation, so
 * clicking a card partway down one page (e.g. "Explore SAT Program" from the
 * homepage Programs section) lands on the new route at that same scroll
 * offset instead of its top. This resets to top on every plain route change.
 *
 * When the destination has a hash (e.g. the Philosophy CTA to `/#programs`),
 * the target section is inside a lazy-loaded chunk that doesn't exist in the
 * DOM yet when the browser's native hash-scroll fires, so we retry briefly
 * until it mounts, then scroll to it instead of resetting to top.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts < 20) {
        attempts += 1;
        timeoutId = setTimeout(tryScroll, 100);
      }
    };
    tryScroll();

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollManager />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/programs/sat" element={<Navigate to="/navichi" replace />} />
          <Route path="/navichi" element={<NavichiPage />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/programs/school" element={<SchoolProgrammePage />} />
          <Route path="/school-program" element={<Navigate to="/programs/school" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
