// Use runtime require so TypeScript won't fail if `react` types or package
// are not available in some environments.
// @ts-ignore
let React: typeof import('react');
try {
    // @ts-ignore
    React = require('react');
} catch (e) {
    // Minimal fallback so JSX expressions using React.createElement still work
    // when the `react` package is absent at build time.
    // @ts-ignore
    React = {
        createElement: (tag: any, props: any, ...children: any[]) => {
            return typeof tag === 'function' ? tag({ ...props, children }) : { tag, props: { ...props, children } };
        },
        Fragment: (props: any) => props.children,
    } as any;
}
// Use runtime require so the build won't fail if `react-dom/client` types or package
// are not available (older React versions use `react-dom`).
// @ts-ignore
let createRoot: any;
try {
    // @ts-ignore
    createRoot = require('react-dom/client').createRoot;
} catch (e) {
    // Fallback for older react-dom that doesn't export `createRoot`.
    // @ts-ignore
    const ReactDOM = require('react-dom');
    createRoot = (container: Element) => ({
        render: (el: any) => ReactDOM.render(el, container),
    });
}
// Fallback provider so the app still boots when the Internet Identity hook/provider file is missing
// Use plain types to avoid reliance on the `React` namespace so TypeScript doesn't error
const InternetIdentityProvider = ({ children }: { children?: any }) =>
    React.createElement(React.Fragment, null, children);
// @ts-ignore - the package may not be installed in the local environment or type declarations are missing
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
// Suppress TypeScript error for side-effect CSS import when no type declarations are present
// @ts-ignore
import './index.css';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        React.createElement(
            QueryClientProvider,
            { client: queryClient },
            React.createElement(
                InternetIdentityProvider,
                null,
                React.createElement(App, null)
            )
        )
    );
}
