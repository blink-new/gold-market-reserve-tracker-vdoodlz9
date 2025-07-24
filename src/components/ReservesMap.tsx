import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, TrendingUp, TrendingDown, Coins } from 'lucide-react'

interface ReserveData {
  country: string
  code: string
  reserves: number
  percentage: number
  change: number
  rank: number
  region: string
  flag: string
}

export function ReservesMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  
  const reservesData: ReserveData[] = [
    { country: 'United States', code: 'US', reserves: 8133.5, percentage: 19.8, change: 0.0, rank: 1, region: 'North America', flag: '🇺🇸' },
    { country: 'Germany', code: 'DE', reserves: 3362.4, percentage: 8.2, change: 0.0, rank: 2, region: 'Europe', flag: '🇩🇪' },
    { country: 'Italy', code: 'IT', reserves: 2451.8, percentage: 6.0, change: 0.0, rank: 3, region: 'Europe', flag: '🇮🇹' },
    { country: 'France', code: 'FR', reserves: 2436.0, percentage: 5.9, change: 0.0, rank: 4, region: 'Europe', flag: '🇫🇷' },
    { country: 'Russia', code: 'RU', reserves: 2298.5, percentage: 5.6, change: 156.2, rank: 5, region: 'Europe', flag: '🇷🇺' },
    { country: 'China', code: 'CN', reserves: 2068.4, percentage: 5.0, change: 188.9, rank: 6, region: 'Asia', flag: '🇨🇳' },
    { country: 'Switzerland', code: 'CH', reserves: 1040.0, percentage: 2.5, change: 0.0, rank: 7, region: 'Europe', flag: '🇨🇭' },
    { country: 'Japan', code: 'JP', reserves: 765.2, percentage: 1.9, change: 0.0, rank: 8, region: 'Asia', flag: '🇯🇵' },
    { country: 'India', code: 'IN', reserves: 760.4, percentage: 1.9, change: 42.3, rank: 9, region: 'Asia', flag: '🇮🇳' },
    { country: 'Netherlands', code: 'NL', reserves: 612.5, percentage: 1.5, change: 0.0, rank: 10, region: 'Europe', flag: '🇳🇱' },
    { country: 'Turkey', code: 'TR', reserves: 588.9, percentage: 1.4, change: 89.1, rank: 11, region: 'Europe', flag: '🇹🇷' },
    { country: 'Taiwan', code: 'TW', reserves: 423.6, percentage: 1.0, change: 0.0, rank: 12, region: 'Asia', flag: '🇹🇼' }
  ]

  const regions = ['all', 'North America', 'Europe', 'Asia', 'Others']
  
  const filteredData = selectedRegion === 'all' 
    ? reservesData 
    : reservesData.filter(item => item.region === selectedRegion)

  const totalReserves = reservesData.reduce((sum, item) => sum + item.reserves, 0)

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-muted-foreground'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />
    if (change < 0) return <TrendingDown className="w-3 h-3" />
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Global Gold Reserves</h2>
        <p className="text-muted-foreground">Official gold holdings by central banks and governments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* World Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="market-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gold" />
                <span>World Gold Reserves Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-gold/5 to-gold-light/5 rounded-lg border border-gold/10 p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="w-12 h-12 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold gold-text mb-2">Interactive World Map</h3>
                  <p className="text-muted-foreground mb-4">Visual representation of global gold reserves</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-card/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gold">{totalReserves.toFixed(1)}t</div>
                      <div className="text-muted-foreground">Total Reserves</div>
                    </div>
                    <div className="bg-card/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gold">{reservesData.length}</div>
                      <div className="text-muted-foreground">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Filter & Stats */}
        <div className="space-y-6">
          <Card className="market-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-gold" />
                <span>Regional Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Europe">Europe</TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Asia">Asia</TabsTrigger>
                  <TabsTrigger value="North America">Americas</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-6 space-y-3">
                {['Europe', 'Asia', 'North America'].map(region => {
                  const regionData = reservesData.filter(item => item.region === region)
                  const regionTotal = regionData.reduce((sum, item) => sum + item.reserves, 0)
                  const regionPercentage = (regionTotal / totalReserves) * 100

                  return (
                    <div key={region} className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{region}</div>
                        <div className="text-sm text-muted-foreground">{regionData.length} countries</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gold">{regionTotal.toFixed(1)}t</div>
                        <div className="text-sm text-muted-foreground">{regionPercentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reserves Table */}
      <Card className="market-card mt-8">
        <CardHeader>
          <CardTitle>Top Gold Reserve Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Rank</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Country</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Reserves (tonnes)</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">% of Total</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">YoY Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 12).map((item) => (
                  <tr key={item.code} className="border-b border-border/30 hover:bg-card/30 transition-colors">
                    <td className="py-4 px-2">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {item.rank}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.flag}</span>
                        <div>
                          <div className="font-medium text-foreground">{item.country}</div>
                          <div className="text-sm text-muted-foreground">{item.region}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="font-bold text-gold">{item.reserves.toFixed(1)}</div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="font-medium text-foreground">{item.percentage.toFixed(1)}%</div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${getChangeColor(item.change)}`}>
                        {getChangeIcon(item.change)}
                        <span className="font-medium">
                          {item.change === 0 ? '—' : `${item.change > 0 ? '+' : ''}${item.change.toFixed(1)}t`}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}