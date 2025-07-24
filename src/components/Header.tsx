import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Clock } from 'lucide-react'

interface PriceData {
  market: string
  price: number
  change: number
  changePercent: number
}

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [tickerData] = useState<PriceData[]>([
    { market: 'LONDON', price: 2034.50, change: 12.30, changePercent: 0.61 },
    { market: 'NEW YORK', price: 2031.80, change: -5.20, changePercent: -0.26 },
    { market: 'SHANGHAI', price: 2038.90, change: 18.70, changePercent: 0.93 },
    { market: 'MUMBAI', price: 2029.40, change: 8.90, changePercent: 0.44 },
    { market: 'TOKYO', price: 2035.60, change: 15.20, changePercent: 0.75 },
    { market: 'ZURICH', price: 2033.10, change: -2.40, changePercent: -0.12 }
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="bg-card/30 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      {/* Price Ticker */}
      <div className="bg-gradient-to-r from-gold/10 to-gold-light/10 border-b border-gold/20 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap py-2">
          {[...tickerData, ...tickerData].map((item, index) => (
            <div key={index} className="flex items-center mx-8 text-sm">
              <span className="font-medium text-gold mr-2">{item.market}</span>
              <span className="text-foreground mr-2">${item.price.toFixed(2)}</span>
              <div className={`flex items-center ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.change >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}</span>
                <span className="ml-1">({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">Au</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gold-text">Gold Tracker</h1>
                <p className="text-xs text-muted-foreground">Market & Reserve Analytics</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
              <span className="text-xs">UTC</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">Spot Gold</div>
                <div className="text-lg font-bold gold-text">$2,034.50</div>
              </div>
              <div className="flex items-center text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+0.61%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}