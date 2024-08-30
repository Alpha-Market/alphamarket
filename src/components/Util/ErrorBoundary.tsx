"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex-1 flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-black text-1414 font-bold">Something went wrong...</h1>
                    <button onClick={() => {
                        window.location.reload();
                    }} className="p-4 rounded-lg bg-black text-white font-bold text-1212">Try to referesh the page</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;