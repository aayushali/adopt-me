// mostly took this from React docs
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
    state = { hasError: false, Redirect: false };
    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        // I log this to Sentry, Azure Monitor, TrackJs , New Relic
        console.error("ErrorBoundary caught an error", error, info);
        setTimeout(() => this.setState({ redirect: true }), 5000);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        else if (this.state.hasError) {
            return (
                <h2>
                    This listing has an error. <Link to="/">Click Here</Link> to go back to the homepage or wait five seconds
                </h2>
            )

        }
        return this.props.children;
    }

}


export default ErrorBoundary;