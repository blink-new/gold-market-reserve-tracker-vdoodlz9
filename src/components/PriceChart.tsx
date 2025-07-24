import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// TradingView Widget Component
const TradingViewWidget: React.FC<{
  symbol: string;
  width?: string | number;
  height?: string | number;
  interval?: string;
  theme?: string;
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  hide_legend?: boolean;
  save_image?: boolean;
  container_id?: string;
}> = ({
  symbol,
  width = '100%',
  height = 400,
  interval = '1H',
  theme = 'dark',
  style = '1',
  locale = 'en',
  toolbar_bg = '#0A0A0B',
  enable_publishing = false,
  hide_top_toolbar = false,
  hide_legend = false,
  save_image = false,
  container_id = 'tradingview_chart'
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: false,
      symbol: symbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: theme,
      style: style,
      locale: locale,
      toolbar_bg: toolbar_bg,
      enable_publishing: enable_publishing,
      hide_top_toolbar: hide_top_toolbar,
      hide_legend: hide_legend,
      save_image: save_image,
      width: width,
      height: height,
      backgroundColor: '#0A0A0B',
      gridColor: '#1A1A1B'
    });

    const container = document.getElementById(container_id);
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [symbol, width, height, interval, theme, style, locale, toolbar_bg, enable_publishing, hide_top_toolbar, hide_legend, save_image, container_id]);

  return (
    <div 
      id={container_id} 
      style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }}
      className="tradingview-widget-container"
    />
  );
};

// Technical Analysis Widget
const TechnicalAnalysisWidget: React.FC<{
  symbol: string;
  width?: string | number;
  height?: string | number;
  colorTheme?: string;
  container_id?: string;
}> = ({
  symbol,
  width = '100%',
  height = 400,
  colorTheme = 'dark',
  container_id = 'technical_analysis_widget'
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: '1m',
      width: width,
      isTransparent: false,
      height: height,
      symbol: symbol,
      showIntervalTabs: true,
      locale: 'en',
      colorTheme: colorTheme
    });

    const container = document.getElementById(container_id);
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [symbol, width, height, colorTheme, container_id]);

  return (
    <div 
      id={container_id} 
      style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }}
      className="tradingview-widget-container"
    />
  );
};

const PriceChart: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  // TradingView interval mapping
  const getInterval = (timeframe: string) => {
    switch (timeframe) {
      case '1D': return '15';
      case '1W': return '1H';
      case '1M': return '4H';
      case '3M': return '1D';
      case '1Y': return '1W';
      default: return '1H';
    }
  };

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Gold Chart */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gold-400 text-xl font-medium">
              Gold Price Chart (XAU/USD)
            </CardTitle>
            <div className="flex gap-2">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setSelectedTimeframe(tf.value)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedTimeframe === tf.value
                      ? 'bg-gold-400 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden bg-gray-950">
            <TradingViewWidget
              symbol="OANDA:XAUUSD"
              width="100%"
              height={500}
              interval={getInterval(selectedTimeframe)}
              theme="dark"
              style="1"
              locale="en"
              toolbar_bg="#0A0A0B"
              enable_publishing={false}
              hide_top_toolbar={false}
              hide_legend={false}
              save_image={false}
              container_id="main_gold_chart"
            />
          </div>
        </CardContent>
      </Card>

      {/* Multiple Market Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gold Futures */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-gold-400 text-lg font-medium">
              Gold Futures (GC1!)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden bg-gray-950">
              <TradingViewWidget
                symbol="COMEX:GC1!"
                width="100%"
                height={350}
                interval="1H"
                theme="dark"
                style="1"
                locale="en"
                toolbar_bg="#0A0A0B"
                enable_publishing={false}
                hide_top_toolbar={true}
                hide_legend={true}
                save_image={false}
                container_id="gold_futures_chart"
              />
            </div>
          </CardContent>
        </Card>

        {/* Gold ETF (GLD) */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-gold-400 text-lg font-medium">
              Gold ETF (GLD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden bg-gray-950">
              <TradingViewWidget
                symbol="AMEX:GLD"
                width="100%"
                height={350}
                interval="1H"
                theme="dark"
                style="1"
                locale="en"
                toolbar_bg="#0A0A0B"
                enable_publishing={false}
                hide_top_toolbar={true}
                hide_legend={true}
                save_image={false}
                container_id="gold_etf_chart"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Analysis */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gold-400 text-xl font-medium">
            Technical Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden bg-gray-950">
            <TechnicalAnalysisWidget
              symbol="OANDA:XAUUSD"
              width="100%"
              height={400}
              colorTheme="dark"
              container_id="technical_analysis"
            />
          </div>
        </CardContent>
      </Card>

      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-gold-400 text-lg font-medium">
              Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h High</span>
                <span className="text-green-400 font-medium">$2,087.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Low</span>
                <span className="text-red-400 font-medium">$2,045.20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Volume</span>
                <span className="text-gray-200 font-medium">142.5K oz</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Market Cap</span>
                <span className="text-gray-200 font-medium">$12.8T</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-gold-400 text-lg font-medium">
              Support & Resistance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Resistance 1</span>
                <span className="text-red-400 font-medium">$2,095.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Resistance 2</span>
                <span className="text-red-400 font-medium">$2,110.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Support 1</span>
                <span className="text-green-400 font-medium">$2,040.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Support 2</span>
                <span className="text-green-400 font-medium">$2,020.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-gold-400 text-lg font-medium">
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1 Day</span>
                <span className="text-green-400 font-medium">+0.85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1 Week</span>
                <span className="text-green-400 font-medium">+2.14%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1 Month</span>
                <span className="text-red-400 font-medium">-1.23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">YTD</span>
                <span className="text-green-400 font-medium">+12.45%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { PriceChart };