import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/Header'
import { MarketGrid } from '@/components/MarketGrid'
import { ReservesMap } from '@/components/ReservesMap'
import { PriceChart } from '@/components/PriceChart'
import { BarChart3, Globe, TrendingUp, Coins } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('markets')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm">
              <TabsTrigger 
                value="markets" 
                className="flex items-center space-x-2 data-[state=active]:bg-gold data-[state=active]:text-background"
              >
                <Globe className="w-4 h-4" />
                <span>Markets</span>
              </TabsTrigger>
              <TabsTrigger 
                value="charts" 
                className="flex items-center space-x-2 data-[state=active]:bg-gold data-[state=active]:text-background"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Charts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reserves" 
                className="flex items-center space-x-2 data-[state=active]:bg-gold data-[state=active]:text-background"
              >
                <Coins className="w-4 h-4" />
                <span>Reserves</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="markets" className="mt-0">
              <MarketGrid />
            </TabsContent>

            <TabsContent value="charts" className="mt-0">
              <PriceChart />
            </TabsContent>

            <TabsContent value="reserves" className="mt-0">
              <ReservesMap />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-lg">Au</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold gold-text">Gold Tracker</h3>
                  <p className="text-xs text-muted-foreground">Market & Reserve Analytics</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Professional gold market tracking with real-time prices, comprehensive analytics, 
                and global reserve data. Stay informed with the latest market trends and insights.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Data updated every 5 minutes</span>
                <span>•</span>
                <span>24/7 Market Coverage</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Markets</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>London (LBMA)</li>
                <li>New York (COMEX)</li>
                <li>Shanghai (SGE)</li>
                <li>Mumbai (MCX)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Real-time Prices</li>
                <li>Historical Charts</li>
                <li>Reserve Analytics</li>
                <li>Market Insights</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Gold Tracker. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-gold" />
              <span>Powered by real-time market data</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App