import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { FlightSearchForm } from './components/FlightSearchForm';
import { PredictionResults } from './components/PredictionResults';
import { Features } from './components/Features';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import type { FlightSearch, PredictionResult } from './backend';

function App() {
  const [searchParams, setSearchParams] = useState<FlightSearch | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearchComplete = (search: FlightSearch, prediction: PredictionResult) => {
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
        <Header onNewSearch={handleNewSearch} showNewSearchButton={showResults} />
        
        <main className="flex-1">
          {!showResults ? (
            <>
              <Hero />
              <section className="container py-12 md:py-16">
                <FlightSearchForm onSearchComplete={handleSearchComplete} />
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
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
