import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MachineConfig } from './MachineConfigurator';

interface PricingSummaryProps {
  config: MachineConfig;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ config }) => {
  const calculateBasePrice = () => {
    let basePrice = 45000; // BATES basis zakvulmachine
    
    // Productiecapaciteit pricing
    if (config.outputRate >= 250) basePrice += 55000;
    else if (config.outputRate >= 150) basePrice += 35000;
    else if (config.outputRate >= 100) basePrice += 20000;
    
    // Zakkenhandling pricing
    if (config.bagPlacement === 'volautomatisch') basePrice += 25000;
    else if (config.bagPlacement === 'opsteekautomaat') basePrice += 12000;
    
    // Big bag handling
    if (config.packagingType === 'big-bag') basePrice += 15000;
    
    // ATEX certificering
    if (config.needsATEX) basePrice += 18000;
    
    // Palletisering
    if (config.showPalletizing) {
      basePrice += config.palletOptions?.systemType === 'robot' ? 35000 : 20000;
    }
    
    return basePrice;
  };

  const calculateAddOns = () => {
    let addOnCost = 0;
    
    // Remote electrical cabinet
    if (config.controlCabinet === 'op-afstand') addOnCost += 3500;
    
    return addOnCost;
  };

  const basePrice = calculateBasePrice();
  const addOnCost = calculateAddOns();
  const totalPrice = basePrice + addOnCost;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDeliveryTime = () => {
    let weeks = 12; // Basis levertijd
    
    if (config.outputRate >= 200) weeks += 4;
    if (config.bagPlacement === 'volautomatisch') weeks += 2;
    if (config.needsATEX) weeks += 2;
    if (config.showPalletizing) weeks += 3;
    
    return weeks;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Prijsoverzicht
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">BATES Basis Machine</span>
          <span className="font-semibold">{formatPrice(basePrice)}</span>
        </div>

        {config.controlCabinet === 'op-afstand' && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Remote Elektrokast</span>
            <span className="text-green-600">+{formatPrice(3500)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between items-center text-lg font-bold">
          <span>Totaalprijs</span>
          <span className="text-bates-orange">{formatPrice(totalPrice)}</span>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Financieringsopties</h4>
          <div className="text-sm text-blue-800">
            <div>Lease: {formatPrice(Math.round(totalPrice * 0.022))}/mnd (60 maanden)</div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="font-medium">Geschatte Levertijd</div>
          <div>{getDeliveryTime()} weken vanaf orderbevestiging</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSummary;