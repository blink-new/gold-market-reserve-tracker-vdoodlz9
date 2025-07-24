import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { TrendingUp, Calendar, DollarSign, Activity } from 'lucide-react'

interface ChartData {
  time: string
  price: number
  volume: number
}

export function PriceChart() {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D')
  
  // Generate sample data based on time range
  const generateData = (range: string): ChartData[] => {
    const basePrice = 2034.50
    const dataPoints = range === '1D' ? 24 : range === '1W' ? 7 : range === '1M' ? 30 : range === '3M' ? 90 : 365
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const variation = (Math.random() - 0.5) * 50
      const trend = range === '1Y' ? i * 0.5 : 0
      
      return {
        time: range === '1D' 
          ? `${i.toString().padStart(2, '0')}:00`
          : range === '1W'
          ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
          : `Day ${i + 1}`,
        price: basePrice + variation + trend,
        volume: Math.random() * 100 + 50
      }
    })
  }

  const [chartData] = useState<ChartData[]>(generateData(timeRange))
  
  const timeRanges = [
    { key: '1D' as const, label: '1D', active: timeRange === '1D' },
    { key: '1W' as const, label: '1W', active: timeRange === '1W' },
    { key: '1M' as const, label: '1M', active: timeRange === '1M' },
    { key: '3M' as const, label: '3M', active: timeRange === '3M' },
    { key: '1Y' as const, label: '1Y', active: timeRange === '1Y' }
  ]

  const currentPrice = chartData[chartData.length - 1]?.price || 2034.50
  const previousPrice = chartData[0]?.price || 2034.50
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = (priceChange / previousPrice) * 100

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-lg font-bold gold-text">
            ${payload[0].value.toFixed(2)}
          </p>
          {payload[1] && (
            <p className="text-sm text-muted-foreground">
              Volume: {payload[1].value.toFixed(1)}M
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Price Statistics */}
        <div className="space-y-6">
          <Card className="market-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <DollarSign className="w-5 h-5 text-gold" />
                <span>Current Price</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gold-text mb-2">
                ${currentPrice.toFixed(2)}
              </div>
              <div className={`flex items-center space-x-2 ${
                priceChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${priceChange < 0 ? 'rotate-180' : ''}`} />
                <span className="font-medium">
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                </span>
                <span>({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="market-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="w-5 h-5 text-gold" />
                <span>Market Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h High</span>
                <span className="font-medium text-green-400">$2,041.20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Low</span>
                <span className="font-medium text-red-400">$2,018.90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium text-foreground">145.2M oz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium text-foreground">$12.8T</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open Interest</span>
                <span className="font-medium text-foreground">89.3K</span>
              </div>
            </CardContent>
          </Card>

          <Card className="market-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calendar className="w-5 h-5 text-gold" />
                <span>Key Levels</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Resistance</span>
                  <span className="font-medium text-red-400">$2,050</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-red-400/50 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Support</span>
                  <span className="font-medium text-green-400">$2,010</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-green-400/50 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <div className="lg:col-span-3">
          <Card className="market-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <span>Gold Price Chart</span>
                  <Badge variant="outline" className="ml-2">Live</Badge>
                </CardTitle>
                <div className="flex space-x-1">
                  {timeRanges.map((range) => (
                    <Button
                      key={range.key}
                      variant={range.active ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range.key)}
                      className={range.active ? "bg-gold text-background hover:bg-gold/90" : ""}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={['dataMin - 10', 'dataMax + 10']}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#D4AF37"
                      strokeWidth={2}
                      fill="url(#goldGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card className="market-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gold" />
                <span>Trading Volume</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)}M oz`, 'Volume']}
                      labelStyle={{ color: '#D4AF37' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid #D4AF37',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#FFD700"
                      strokeWidth={1}
                      fill="url(#volumeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}