import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MachineConfig } from './MachineConfigurator';

interface MachinePreviewProps {
  config: MachineConfig;
}

const MachinePreview: React.FC<MachinePreviewProps> = ({ config }) => {
  const getMachineSpecs = () => {
    const isHighCapacity = config.outputRate > 200;
    const isHeavyDuty = config.packageWeight > 25;
    
    return {
      model: isHighCapacity ? 'BATES-2000' : 'BATES-1000',
      category: config.packagingType === 'big-bag' ? 'Big Bag Filler' : 'Standard Zakvulmachine',
      capacity: `${config.outputRate} zakken/uur`,
      maxWeight: `${config.packageWeight} kg`,
      automation: config.bagPlacement === 'volautomatisch' ? 'Volledig geautomatiseerd' : 
                  config.bagPlacement === 'opsteekautomaat' ? 'Semi-automatisch' : 'Handmatig'
    };
  };

  const specs = getMachineSpecs();

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
          Machine Preview
          <Badge variant="secondary" className="bg-bates-orange text-white">
            {specs.model}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Machine Visual Representation */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg font-semibold text-gray-800 mb-2">{specs.category}</div>
          <div className="text-sm text-gray-600">{specs.model}</div>
        </div>
        
        {/* Key Specifications */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Productgroep:</span>
            <span className="text-sm text-gray-900 capitalize">
              {config.productGroup.replace('-', ' ')}
            </span>
          </div>
          
          {config.productGroupSpecification && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Specificatie:</span>
              <span className="text-sm text-gray-900">
                {config.productGroupSpecification}
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Productvorm:</span>
            <span className="text-sm text-gray-900 capitalize">
              {config.productForm}
            </span>
          </div>
          
          {config.productFormSpecification && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Vorm specificatie:</span>
              <span className="text-sm text-gray-900">
                {config.productFormSpecification}
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Capaciteit:</span>
            <span className="text-sm text-gray-900">{specs.capacity}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Verpakking:</span>
            <span className="text-sm text-gray-900 capitalize">
              {config.packagingType} ({config.packageWeight}kg)
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Automatisering:</span>
            <span className="text-sm text-gray-900">{specs.automation}</span>
          </div>
          
          {config.bagClosing && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Sluitsysteem:</span>
              <span className="text-sm text-gray-900 capitalize">
                {config.bagClosing.replace('-', ' ')}
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Afvoer:</span>
            <span className="text-sm text-gray-900 capitalize">{config.discharge}</span>
          </div>
          
          {config.showPalletizing && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Palletisering:</span>
              <span className="text-sm text-gray-900">
                {config.palletOptions?.systemType === 'robot' ? 'Robotarm' : 'Conventioneel'}
              </span>
            </div>
          )}
        </div>
        
        {/* Special Features */}
        <div className="pt-4 border-t">
          <div className="text-sm font-medium text-gray-700 mb-2">Speciale kenmerken:</div>
          <div className="flex flex-wrap gap-2">
            {config.packagingType === 'big-bag' && (
              <Badge variant="outline" className="text-xs border-bates-orange text-bates-orange">
                Big Bag Compatibel
              </Badge>
            )}
            {config.needsATEX && (
              <Badge variant="outline" className="text-xs border-red-500 text-red-600">
                ATEX Gecertificeerd
              </Badge>
            )}
            {config.outputRate > 500 && (
              <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                Hoge Capaciteit
              </Badge>
            )}
            {config.bagPlacement === 'volautomatisch' && (
              <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                Volledig Geautomatiseerd
              </Badge>
            )}
            {config.controlCabinet === 'op-afstand' && (
              <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">
                Remote Control
              </Badge>
            )}
          </div>
        </div>
        
        {/* Performance metrics */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-bates-orange">
                {config.outputRate}
              </div>
              <div className="text-xs text-gray-600">Zakken/Uur</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {config.bagPlacement === 'volautomatisch' ? '95%' : 
                 config.bagPlacement === 'opsteekautomaat' ? '85%' : '75%'}
              </div>
              <div className="text-xs text-gray-600">Efficiëntie</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MachinePreview;