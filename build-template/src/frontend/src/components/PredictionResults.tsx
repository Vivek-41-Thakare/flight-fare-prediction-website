import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, TrendingDown, TrendingUp, Plane, Calendar, DollarSign } from 'lucide-react';
import type { FlightSearch, PredictionResult } from '../backend';
import { PriceChart } from './PriceChart';
import { format } from 'date-fns';

interface PredictionResultsProps {
  searchParams: FlightSearch;
  predictionData: PredictionResult;
  onNewSearch: () => void;
}

export function PredictionResults({ searchParams, predictionData, onNewSearch }: PredictionResultsProps) {
  // Get the final predicted price (closest to travel date)
  const travelDate = Number(searchParams.travelDate);
  const finalPrediction = predictionData.dailyPredictions.length > 0
    ? predictionData.dailyPredictions.reduce((closest, current) => {
        const closestDiff = Math.abs(Number(closest.date) - travelDate);
        const currentDiff = Math.abs(Number(current.date) - travelDate);
        return currentDiff < closestDiff ? current : closest;
      })
    : null;

  const predictedPrice = finalPrediction?.predictedPrice || 0;
  const priceDifference = predictedPrice - predictionData.currentPrice;
  const percentageChange = predictionData.currentPrice > 0 
    ? (priceDifference / predictionData.currentPrice) * 100 
    : 0;
  const isPriceIncreasing = priceDifference > 0;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500/10 text-green-700 dark:text-green-400';
    if (confidence >= 0.6) return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    return 'bg-red-500/10 text-red-700 dark:text-red-400';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onNewSearch}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Flight Price Prediction</CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2 text-base">
                <Plane className="h-4 w-4" />
                {searchParams.source} → {searchParams.destination}
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4" />
                {format(Number(searchParams.travelDate), 'PPP')}
                {searchParams.airline && (
                  <>
                    <span className="mx-2">•</span>
                    Airline: {searchParams.airline}
                  </>
                )}
              </CardDescription>
            </div>
            <Badge className={getConfidenceColor(predictionData.confidence)}>
              {getConfidenceLabel(predictionData.confidence)} ({Math.round(predictionData.confidence * 100)}%)
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Current Average Price</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-3xl font-bold">
                    {predictionData.currentPrice > 0 
                      ? predictionData.currentPrice.toFixed(2)
                      : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Predicted Price on Travel Date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-3xl font-bold">
                    {predictedPrice > 0 
                      ? predictedPrice.toFixed(2)
                      : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className={isPriceIncreasing ? 'border-red-200 dark:border-red-900' : 'border-green-200 dark:border-green-900'}>
              <CardHeader className="pb-3">
                <CardDescription>Price Change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {isPriceIncreasing ? (
                    <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                  <span className={`text-3xl font-bold ${isPriceIncreasing ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {isPriceIncreasing ? '+' : ''}{percentageChange.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Price Trend Analysis ({predictionData.dailyPredictions.length} Day{predictionData.dailyPredictions.length !== 1 ? 's' : ''} Leading to Travel Date)
            </h3>
            {predictionData.dailyPredictions.length > 0 ? (
              <PriceChart 
                historicalData={predictionData.historicalTrend}
                dailyPredictions={predictionData.dailyPredictions}
                currentPrice={predictionData.currentPrice}
                travelDate={Number(searchParams.travelDate)}
              />
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex min-h-[300px] items-center justify-center">
                  <p className="text-muted-foreground">
                    No prediction data available for this route. Please try again later.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="rounded-lg border bg-sky-50/50 p-4 dark:bg-sky-950/20">
            <h4 className="mb-2 font-semibold">Recommendation</h4>
            <p className="text-sm text-muted-foreground">
              {isPriceIncreasing ? (
                <>
                  Prices are expected to <strong className="text-foreground">increase</strong> by{' '}
                  <strong className="text-foreground">${Math.abs(priceDifference).toFixed(2)}</strong> by your travel date.
                  Consider booking soon to lock in current rates.
                </>
              ) : (
                <>
                  Prices are expected to <strong className="text-foreground">decrease</strong> by{' '}
                  <strong className="text-foreground">${Math.abs(priceDifference).toFixed(2)}</strong> by your travel date.
                  You might want to wait for better deals.
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
