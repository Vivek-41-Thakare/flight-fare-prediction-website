import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plane, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useSearchFlight } from '../hooks/useQueries';
import type { FlightSearch, PredictionResult } from '../backend';
import { toast } from 'sonner';

interface FlightSearchFormProps {
  onSearchComplete: (search: FlightSearch, prediction: PredictionResult) => void;
}

export function FlightSearchForm({ onSearchComplete }: FlightSearchFormProps) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date>();
  const [airline, setAirline] = useState('');

  const { mutate: searchFlight, isPending } = useSearchFlight();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!source || !destination || !date) {
      toast.error('Please fill in all required fields');
      return;
    }

    const searchParams: FlightSearch = {
      source: source.trim(),
      destination: destination.trim(),
      travelDate: BigInt(date.getTime()),
      airline: airline.trim() || undefined,
    };

    searchFlight(searchParams, {
      onSuccess: (prediction) => {
        onSearchComplete(searchParams, prediction);
      },
      onError: (error) => {
        toast.error('Failed to fetch prediction', {
          description: error.message,
        });
      },
    });
  };

  return (
    <Card className="mx-auto max-w-3xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plane className="h-6 w-6 text-sky-600" />
          Search Flight Prices
        </CardTitle>
        <CardDescription>
          Enter your flight details to get price predictions and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="source">From (City or Airport)</Label>
              <Input
                id="source"
                placeholder="e.g., New York, Los Angeles, London"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">To (City or Airport)</Label>
              <Input
                id="destination"
                placeholder="e.g., New York, Los Angeles, London"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Travel Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="airline">Airline (Optional)</Label>
              <Input
                id="airline"
                placeholder="e.g., American Airlines, United"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700"
            size="lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Analyzing Prices...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Get Price Prediction
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
