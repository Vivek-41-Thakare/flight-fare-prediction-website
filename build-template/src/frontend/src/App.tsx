import { useState } from "react";
import { ThemeProvider } from "next-themes";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FlightSearchForm } from "./components/FlightSearchForm";
import { Features } from "./components/Features";
import { PredictionResults } from "./components/PredictionResults";
import { Footer } from "./components/Footer";

type FlightSearch = any;
type PredictionResult = any;

function App() {
  const [searchParams, setSearchParams] = useState<FlightSearch | null>(null);
  const [predictionData, setPredictionData] =
    useState<PredictionResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearchComplete = (
    search: FlightSearch,
    prediction: PredictionResult
  ) => {
    setSearchParams(search);
    setPredictionData(prediction);
    setShowResults(true);
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setSearchParams(null);
    setPredictionData(null);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header
          onNewSearch={handleNewSearch}
          showNewSearchButton={showResults}
        />

        <main className="flex-1">
          {!showResults ? (
            <>
              <Hero />

              <section className="container py-12 md:py-16">
                <FlightSearchForm
                  onSearchComplete={handleSearchComplete}
                />
              </section>

              <Features />
            </>
          ) : (
            <section className="container py-8 md:py-12">
              <PredictionResults
                searchParams={searchParams!}
                predictionData={predictionData!}
                onNewSearch={handleNewSearch}
              />
            </section>
          )}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
