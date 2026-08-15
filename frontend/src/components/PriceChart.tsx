import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { PriceRecord, DailyPrediction } from '../backend';
import { format } from 'date-fns';

interface PriceChartProps {
  historicalData: PriceRecord[];
  dailyPredictions: DailyPrediction[];
  currentPrice: number;
  travelDate: number;
}

export function PriceChart({ historicalData, dailyPredictions, currentPrice, travelDate }: PriceChartProps) {
  const now = Date.now();
  
  // Prepare historical data (past prices)
  const historicalChartData = historicalData
    .filter((record) => Number(record.date) <= now)
    .map((record) => ({
      date: format(Number(record.date), 'MMM dd'),
      fullDate: Number(record.date),
      price: record.price,
      type: 'historical' as const,
    }));

  // Prepare prediction data (future prices leading up to travel date)
  const predictionChartData = dailyPredictions
    .filter((pred) => Number(pred.date) >= now && Number(pred.date) <= travelDate)
    .map((pred) => ({
      date: format(Number(pred.date), 'MMM dd'),
      fullDate: Number(pred.date),
      price: pred.predictedPrice,
      type: 'predicted' as const,
    }));

  // Add current price marker if not already in data
  const hasCurrentPrice = [...historicalChartData, ...predictionChartData].some(
    (d) => Math.abs(d.fullDate - now) < 12 * 60 * 60 * 1000
  );
  
  const currentPricePoint = !hasCurrentPrice && currentPrice > 0 ? [{
    date: format(now, 'MMM dd'),
    fullDate: now,
    price: currentPrice,
    type: 'current' as const,
  }] : [];

  // Combine all data and sort by date
  const chartData = [...historicalChartData, ...currentPricePoint, ...predictionChartData]
    .sort((a, b) => a.fullDate - b.fullDate);

  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Legend />
            <ReferenceLine 
              x={format(now, 'MMM dd')} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3"
              label={{ value: 'Today', position: 'top', fill: 'hsl(var(--muted-foreground))' }}
            />
            <ReferenceLine 
              x={format(travelDate, 'MMM dd')} 
              stroke="hsl(var(--primary))" 
              strokeDasharray="3 3"
              label={{ value: 'Travel Date', position: 'top', fill: 'hsl(var(--primary))' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.type === 'current') {
                  return <circle cx={cx} cy={cy} r={6} fill="hsl(var(--chart-2))" stroke="white" strokeWidth={2} />;
                }
                if (payload.type === 'predicted') {
                  return <circle cx={cx} cy={cy} r={4} fill="hsl(var(--chart-3))" />;
                }
                return <circle cx={cx} cy={cy} r={4} fill="hsl(var(--chart-1))" />;
              }}
              activeDot={{ r: 6 }}
              name="Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
