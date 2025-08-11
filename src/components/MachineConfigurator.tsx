
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ConfigurationStep from './ConfigurationStep';
import MachinePreview from './MachinePreview';
import PricingSummary from './PricingSummary';

export interface MachineConfig {
  // Stap 1: Productgroep
  productGroup: 'food' | 'non-food' | 'bouw' | 'agro' | 'overig';
  productGroupSpecification?: string; // Voor "Overig"
  
  // Stap 2: Productvorm
  productForm: 'granulaat' | 'poeder' | 'korrels' | 'vlokken' | 'anders';
  productFormSpecification?: string; // Voor "Anders"
  
  // Stap 3: Verpakkingstype
  packagingType: 'zak' | 'emmer' | 'pot' | 'octabin' | 'big-bag' | 'anders';
  
  // Stap 3: Output
  outputRate: number; // 1-1000 zakken per uur
  moreThan1000: boolean; // Meer dan 1000 zakken/uur
  
  // Stap 4: Gewicht
  packageWeight: number; // 0.1-1000 kg
  
  // Stap 5: Zakken aanbrengen (alleen bij zak)
  bagPlacement?: 'handmatig' | 'opsteekautomaat' | 'volautomatisch';
  bagPlacementSubType?: 'ventielzak' | 'openmondzak';
  
  // Stap 6: Zakken sluiten (skip bij Big Bag en niet-zakken)
  bagClosing?: 'zelfsluitend' | 'sealbaar-hitte' | 'sealbaar-ultrasoon';
  
  // Stap 7: Afvoer
  discharge: 'handmatig' | 'automatisch';
  
  // Stap 8: Palletiseren (conditioneel)
  showPalletizing: boolean;
  palletOptions?: {
    systemType: 'conventioneel' | 'robot';
    palletFormat: string;
    tussenvel: boolean;
    hoesentrekker: boolean;
    breeklijm: boolean;
    labeling: boolean;
  };
  
  // Stap 9: Besturingskast
  controlCabinet: 'op-machine' | 'op-afstand';
  
  // Stap 10: ATEX en Normeringen
  needsATEX: boolean;
  atexZone?: string;
  atexSubstance?: string;
  certifications?: {
    ce?: boolean;
    haccp?: boolean;
    fda?: boolean;
    gmp?: boolean;
  };
}

const MachineConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<MachineConfig>({
    // Stap 1: Productgroep
    productGroup: 'food',
    productGroupSpecification: undefined,
    
    // Stap 2: Productvorm
    productForm: 'granulaat',
    productFormSpecification: undefined,
    
    // Stap 3: Verpakkingstype
    packagingType: 'zak',
    
    // Stap 3: Output
    outputRate: 100,
    moreThan1000: false,
    
    // Stap 4: Gewicht
    packageWeight: 10,
    
    // Stap 5: Zakken aanbrengen
    bagPlacement: 'handmatig',
    bagPlacementSubType: undefined,
    
    // Stap 6: Zakken sluiten
    bagClosing: 'zelfsluitend',
    
    // Stap 7: Afvoer
    discharge: 'handmatig',
    
    // Stap 8: Palletiseren
    showPalletizing: false,
    palletOptions: undefined,
    
    // Stap 9: Besturingskast
    controlCabinet: 'op-machine',
    
    // Stap 10: ATEX
    needsATEX: false
  });

  const steps = [
    { title: 'Productgroep', id: 'product-group' },
    { title: 'Productvorm', id: 'product-form' },
    { title: 'Verpakkingstype', id: 'packaging-type' },
    { title: 'Output', id: 'output' },
    { title: 'Gewicht', id: 'weight' },
    { title: 'Zakken aanbrengen', id: 'bag-placement' },
    { title: 'Zakken sluiten', id: 'bag-closing' },
    { title: 'Afvoer', id: 'discharge' },
    { title: 'Palletiseren', id: 'palletizing' },
    { title: 'Besturingskast', id: 'control-cabinet' },
    { title: 'ATEX & Normeringen', id: 'atex-norms' }
  ];

  // Palletiseren: keuze wordt handmatig door de gebruiker bepaald


  // Auto-logic: Big Bag handling
  useEffect(() => {
    if (config.packagingType === 'big-bag' && config.bagPlacement !== 'handmatig') {
      setConfig(prev => ({
        ...prev,
        bagPlacement: 'handmatig'
      }));
    }
  }, [config.packagingType]);

  // Auto-logic: Skip bag closing voor Big Bag
  useEffect(() => {
    if (config.packagingType === 'big-bag') {
      setConfig(prev => ({
        ...prev,
        bagClosing: undefined
      }));
    }
  }, [config.packagingType]);

  const updateConfig = (key: keyof MachineConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Configuration Panel */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {steps[currentStep].title}
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Stap {currentStep + 1} van {steps.length}
              </Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <ConfigurationStep 
              step={currentStep}
              config={config}
              updateConfig={updateConfig}
              onNext={nextStep}
              onPrev={prevStep}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </CardContent>
        </Card>
      </div>

      {/* Preview and Pricing Panel */}
      <div className="space-y-6">
        <MachinePreview config={config} />
        <PricingSummary config={config} />
      </div>
    </div>
  );
};

export default MachineConfigurator;
