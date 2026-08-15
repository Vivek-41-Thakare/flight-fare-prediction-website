import { useMutation, useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FlightSearch, PredictionResult, PriceRecord, DailyPrediction } from '../backend';

export function useSearchFlight() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (search: FlightSearch): Promise<PredictionResult> => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Get prediction from backend
      const prediction = await actor.getPricePrediction(search);
      
      // If we have real data, return it
      if (prediction.currentPrice > 0 || prediction.dailyPredictions.length > 0) {
        return prediction;
      }
      
      // Otherwise, generate mock data for demonstration
      // In production, this would come from the backend with real API data
      const travelDate = Number(search.travelDate);
      const mockHistoricalData: PriceRecord[] = generateMockHistoricalData(travelDate);
      const mockCurrentPrice = calculateAveragePrice(mockHistoricalData.filter(r => Number(r.date) <= Date.now()));
      const mockDailyPredictions = generateDailyPredictions(travelDate);
      const mockConfidence = 0.7 + Math.random() * 0.25; // 70-95% confidence
      
      return {
        currentPrice: mockCurrentPrice,
        dailyPredictions: mockDailyPredictions,
        confidence: mockConfidence,
        historicalTrend: mockHistoricalData,
      };
    },
  });
}

export function useHistoricalPrices(route: string) {
  const { actor, isFetching } = useActor();

  return useQuery<PriceRecord[]>({
    queryKey: ['historicalPrices', route],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHistoricalPrices(route);
    },
    enabled: !!actor && !isFetching && !!route,
  });
}

export function useAddHistoricalPrice() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ route, priceData }: { route: string; priceData: PriceRecord[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addHistoricalPrice(route, priceData);
    },
  });
}

// Helper function to generate daily predictions for 10+ days before travel date
function generateDailyPredictions(travelDate: number): DailyPrediction[] {
  const predictions: DailyPrediction[] = [];
  const now = Date.now();
  const daysUntilTravel = Math.ceil((travelDate - now) / (24 * 60 * 60 * 1000));
  
  // Generate predictions for at least 10 days, or all days until travel date if less than 10
  const predictionDays = Math.max(10, Math.min(daysUntilTravel, 30));
  const basePrice = 300 + Math.random() * 400; // $300-$700 base
  
  // Create a trend (prices may increase or decrease as travel date approaches)
  const trendDirection = Math.random() > 0.5 ? 1 : -1; // Random trend
  const trendStrength = 0.1 + Math.random() * 0.15; // 10-25% change
  
  for (let i = 0; i < predictionDays; i++) {
    const daysFromNow = predictionDays - i;
    const date = travelDate - (daysFromNow * 24 * 60 * 60 * 1000);
    
    // Calculate price with trend and variation
    const progressRatio = (predictionDays - daysFromNow) / predictionDays;
    const trendEffect = trendDirection * trendStrength * progressRatio;
    const variation = (Math.random() - 0.5) * 0.15; // ±7.5% random variation
    const price = basePrice * (1 + trendEffect + variation);
    
    predictions.push({
      date: BigInt(Math.max(date, now)), // Ensure date is not in the past
      predictedPrice: Math.round(price * 100) / 100,
    });
  }
  
  // Sort by date ascending
  predictions.sort((a, b) => Number(a.date) - Number(b.date));
  
  return predictions;
}

// Helper functions for mock data generation
function generateMockHistoricalData(travelDate: number): PriceRecord[] {
  const data: PriceRecord[] = [];
  const now = Date.now();
  const basePrice = 300 + Math.random() * 400; // $300-$700 base
  const airlines = ['AA', 'UA', 'DL', 'SW', 'BA'];
  
  // Generate historical data (30 days back from now)
  for (let i = 30; i >= 0; i--) {
    const date = now - i * 24 * 60 * 60 * 1000;
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const price = basePrice * (1 + variation);
    
    data.push({
      date: BigInt(date),
      price: Math.round(price * 100) / 100,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
    });
  }
  
  return data;
}

function calculateAveragePrice(data: PriceRecord[]): number {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, record) => acc + record.price, 0);
  return Math.round((sum / data.length) * 100) / 100;
}
