import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Student Results Portal
            </h1>
            <div className="text-sm text-gray-600">A/L Examination Results</div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Student Results Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
