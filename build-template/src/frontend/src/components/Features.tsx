import { BarChart3, Clock, Shield } from 'lucide-react';

export function Features() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Why Use FlightFare Predictor?
          </h2>
          <p className="text-lg text-muted-foreground">
            Make informed decisions with data-driven insights
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Historical Data Analysis</h3>
            <p className="text-muted-foreground">
              Our system analyzes thousands of historical flight prices to identify patterns
              and trends, giving you accurate predictions.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Real-Time Updates</h3>
            <p className="text-muted-foreground">
              Get current market prices combined with future predictions to help you
              decide when to book your flight.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Confidence Scores</h3>
            <p className="text-muted-foreground">
              Every prediction comes with a confidence score so you know how reliable
              the forecast is for your specific route.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
