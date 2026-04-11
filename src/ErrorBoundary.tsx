import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Что-то пошло не так</h2>
          <p>Попробуйте обновить страницу.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Обновить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
