import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Clock, Globe } from 'lucide-react'

interface MarketData {
  id: string
  name: string
  city: string
  country: string
  price: number
  change: number
  changePercent: number
  volume: string
  high24h: number
  low24h: number
  status: 'open' | 'closed' | 'pre-market'
  timezone: string
  lastUpdate: string
}

export function MarketGrid() {
  const [markets, setMarkets] = useState<MarketData[]>([
    {
      id: 'lbma',
      name: 'LBMA',
      city: 'London',
      country: 'UK',
      price: 2034.50,
      change: 12.30,
      changePercent: 0.61,
      volume: '145.2M',
      high24h: 2041.20,
      low24h: 2018.90,
      status: 'open',
      timezone: 'GMT',
      lastUpdate: '2 mins ago'
    },
    {
      id: 'comex',
      name: 'COMEX',
      city: 'New York',
      country: 'USA',
      price: 2031.80,
      change: -5.20,
      changePercent: -0.26,
      volume: '198.7M',
      high24h: 2039.50,
      low24h: 2025.10,
      status: 'open',
      timezone: 'EST',
      lastUpdate: '1 min ago'
    },
    {
      id: 'sge',
      name: 'SGE',
      city: 'Shanghai',
      country: 'China',
      price: 2038.90,
      change: 18.70,
      changePercent: 0.93,
      volume: '89.3M',
      high24h: 2042.80,
      low24h: 2019.40,
      status: 'closed',
      timezone: 'CST',
      lastUpdate: '4 hours ago'
    },
    {
      id: 'mcx',
      name: 'MCX',
      city: 'Mumbai',
      country: 'India',
      price: 2029.40,
      change: 8.90,
      changePercent: 0.44,
      volume: '67.8M',
      high24h: 2035.60,
      low24h: 2021.30,
      status: 'closed',
      timezone: 'IST',
      lastUpdate: '6 hours ago'
    },
    {
      id: 'tocom',
      name: 'TOCOM',
      city: 'Tokyo',
      country: 'Japan',
      price: 2035.60,
      change: 15.20,
      changePercent: 0.75,
      volume: '52.1M',
      high24h: 2040.90,
      low24h: 2022.80,
      status: 'pre-market',
      timezone: 'JST',
      lastUpdate: '30 mins ago'
    },
    {
      id: 'lme',
      name: 'LME',
      city: 'London',
      country: 'UK',
      price: 2033.10,
      change: -2.40,
      changePercent: -0.12,
      volume: '78.9M',
      high24h: 2037.70,
      low24h: 2028.50,
      status: 'open',
      timezone: 'GMT',
      lastUpdate: '3 mins ago'
    }
  ])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(market => ({
        ...market,
        price: market.price + (Math.random() - 0.5) * 2,
        change: market.change + (Math.random() - 0.5) * 0.5,
        changePercent: market.changePercent + (Math.random() - 0.5) * 0.1,
        lastUpdate: Math.random() > 0.7 ? 'Just now' : market.lastUpdate
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'closed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'pre-market': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Global Gold Markets</h2>
        <p className="text-muted-foreground">Real-time prices from major gold trading centers worldwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <Card key={market.id} className="market-card group hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground">{market.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{market.city}, {market.country}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(market.status)} capitalize`}>
                  {market.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price Display */}
              <div className="text-center py-4 bg-gradient-to-r from-gold/5 to-gold-light/5 rounded-lg border border-gold/10">
                <div className="text-3xl font-bold gold-text">${market.price.toFixed(2)}</div>
                <div className={`flex items-center justify-center mt-2 ${
                  market.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {market.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="font-medium">
                    {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)} 
                    ({market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Market Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">24h High</p>
                  <p className="font-medium text-green-400">${market.high24h.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">24h Low</p>
                  <p className="font-medium text-red-400">${market.low24h.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volume</p>
                  <p className="font-medium text-foreground">{market.volume}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Timezone</p>
                  <p className="font-medium text-foreground">{market.timezone}</p>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Updated {market.lastUpdate}</span>
                </div>
                <div className={`w-2 h-2 rounded-full animate-pulse-gold ${
                  market.status === 'open' ? 'bg-green-400' : 
                  market.status === 'pre-market' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}