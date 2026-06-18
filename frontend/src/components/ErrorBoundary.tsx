import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: Boolean;
  error?: Error;
}

/**
 * Simple error boundary to catch rendering errors in children and display fallback UI.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const { error } = this.state;
      const { fallback } = this.props;

      // Render fallback or default error details
      if (fallback) {
        return fallback;
      }

      return (
        <div style={{ padding: '20px', color: 'red', background: '#fff0f0', border: '1px solid red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {error && error.stack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;