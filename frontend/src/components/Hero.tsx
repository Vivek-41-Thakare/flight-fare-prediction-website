import { TrendingUp, Calendar, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-sky-50/50 to-background dark:from-sky-950/20">
      <div className="container relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur">
            <TrendingUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span className="text-muted-foreground">AI-Powered Price Predictions</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find the Best Time to{' '}
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Book Your Flight
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Get accurate flight price predictions based on historical data and market trends.
            Save money by booking at the right time.
          </p>

          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950">
                <MapPin className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-semibold">Any Route</h3>
              <p className="text-center text-sm text-muted-foreground">
                Search flights between any airports worldwide
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950">
                <Calendar className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-semibold">Future Prices</h3>
              <p className="text-center text-sm text-muted-foreground">
                Predict prices for upcoming travel dates
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950">
                <TrendingUp className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-semibold">Smart Analysis</h3>
              <p className="text-center text-sm text-muted-foreground">
                AI-powered predictions with confidence scores
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
