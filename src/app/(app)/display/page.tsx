// This page would ideally be /display/[barId]/page.tsx
// For now, a generic placeholder.
'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrinkPrice {
  id: string;
  name: string;
  price: number;
  lastPrice?: number;
  category: string;
}

const initialDrinks: DrinkPrice[] = [
  { id: '1', name: 'Craft Beer IPA', price: 7.50, category: 'Beer' },
  { id: '2', name: 'Classic Mojito', price: 12.00, category: 'Cocktail' },
  { id: '3', name: 'Pinot Noir', price: 9.00, category: 'Wine' },
  { id: '4', name: 'Whiskey Sour', price: 11.50, category: 'Cocktail' },
  { id: '5', name: 'Vodka Soda', price: 8.00, category: 'Spirits' },
  { id: '6', name: 'Pale Ale', price: 6.50, category: 'Beer' },
];

export default function PriceTickerPage() {
  const [drinks, setDrinks] = useState<DrinkPrice[]>(initialDrinks.map(d => ({...d, lastPrice: d.price})));

  useEffect(() => {
    const interval = setInterval(() => {
      setDrinks(prevDrinks => 
        prevDrinks.map(drink => {
          const priceChange = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          const newPrice = Math.max(5, drink.price + priceChange); // Min price $5
          return {
            ...drink,
            lastPrice: drink.price,
            price: parseFloat(newPrice.toFixed(2)),
          };
        })
      );
    }, 5000); // Update prices every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getPriceChangeIndicator = (currentPrice: number, lastPrice?: number) => {
    if (lastPrice === undefined || currentPrice === lastPrice) {
      return <Minus className="h-8 w-8 text-yellow-400" />;
    }
    if (currentPrice > lastPrice) {
      return <ArrowUp className="h-8 w-8 text-green-400" />;
    }
    return <ArrowDown className="h-8 w-8 text-red-400" />;
  };

  const categories = [...new Set(drinks.map(d => d.category))];

  return (
    <div className="fixed inset-0 bg-background text-foreground p-4 md:p-8 overflow-y-auto flex flex-col items-center">
      <header className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          BarExchange Live
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mt-2">Real-Time Drink Prices</p>
      </header>

      <div className="w-full max-w-6xl space-y-10">
        {categories.map(category => (
          <section key={category}>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 pb-2 border-b-2 border-primary text-accent">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drinks.filter(d => d.category === category).map((drink) => (
                <div 
                  key={drink.id} 
                  className={cn(
                    "bg-card p-6 rounded-xl shadow-2xl transform transition-all duration-500 ease-out",
                    drink.price > (drink.lastPrice || drink.price) && "animate-pulse-green",
                    drink.price < (drink.lastPrice || drink.price) && "animate-pulse-red"
                  )}
                  style={{
                    animationDelay: `${Math.random() * 0.5}s` // Stagger animations slightly
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-card-foreground truncate" title={drink.name}>{drink.name}</h3>
                    {getPriceChangeIndicator(drink.price, drink.lastPrice)}
                  </div>
                  <p className="text-4xl md:text-5xl font-mono font-extrabold text-primary">
                    ${drink.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <style jsx global>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); } /* green-400 */
          50% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
        }
        .animate-pulse-green {
          animation: pulse-green 2s infinite;
        }
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.4); } /* red-400 */
          50% { box-shadow: 0 0 0 10px rgba(248, 113, 113, 0); }
        }
        .animate-pulse-red {
          animation: pulse-red 2s infinite;
        }
      `}</style>
    </div>
  );
}
