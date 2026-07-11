import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Infimind app crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
          <h1 className="font-display text-3xl text-ink">Something went wrong.</h1>
          <p className="max-w-md text-ink-soft">
            Please refresh the page. If the problem continues, contact us so we can help.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-btn bg-navy px-6 py-3 text-sm font-medium text-on-dark"
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
