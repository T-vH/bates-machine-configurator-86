import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { MachineConfig } from './MachineConfigurator';

interface ConfigurationStepProps {
  step: number;
  config: MachineConfig;
  updateConfig: (key: keyof MachineConfig, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  step,
  config,
  updateConfig,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep
}) => {
  const renderStepContent = () => {
    switch (step) {
      case 0: // Stap 1: Productgroep
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Wat voor productgroep wilt u verpakken?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'food', label: 'Food', desc: 'Voedingsmiddelen', examples: 'Graan, meel, suiker, rijst, pasta, kruiden' },
                  { value: 'non-food', label: 'Non-food', desc: 'Niet-voedingsmiddelen', examples: 'Detergent, cosmetica, farmacie, chemicaliën' },
                  { value: 'bouw', label: 'Bouw', desc: 'Bouwmaterialen', examples: 'Cement, gips, zand, grind, isolatiemateriaal' },
                  { value: 'agro', label: 'Agro', desc: 'Landbouwproducten', examples: 'Zaden, voer, meststoffen, bestrijdingsmiddelen' },
                  { value: 'overig', label: 'Overig', desc: 'Andere productgroep', examples: 'Kunststofgranulaat, recycling materiaal' }
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      config.productGroup === option.value 
                        ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                        : 'hover:border-bates-orange/30 bg-white'
                    }`}
                    onClick={() => updateConfig('productGroup', option.value)}
                  >
                    <CardContent className="p-6 text-center relative">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="absolute top-2 right-2 h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="font-semibold mb-1">{option.label}</p>
                            <p className="text-sm">Voorbeelden: {option.examples}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {config.productGroup === 'overig' && (
                <div className="mt-6">
                  <Label className="text-lg font-semibold mb-3 block text-gray-900">
                    Specificeer uw productgroep
                  </Label>
                  <Input
                    type="text"
                    value={config.productGroupSpecification || ''}
                    onChange={(e) => updateConfig('productGroupSpecification', e.target.value)}
                    placeholder="Vul hier uw productgroep in..."
                    className="w-full h-14 text-lg border-2 focus:border-bates-orange"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 1: // Stap 2: Productvorm
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Wat voor productvorm heeft u?
              </Label>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Let op:</strong> Vermeld altijd het specifieke product dat u wilt verpakken voor een juiste machine configuratie.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'granulaat', label: 'Granulaat', desc: 'Kleine korrels', examples: 'Suikergranulaat, kunststofgranulaat, zoutkorrels' },
                  { value: 'poeder', label: 'Poeder', desc: 'Fijn poeder', examples: 'Meel, cement, wasmiddel, cacao' },
                  { value: 'korrels', label: 'Korrels', desc: 'Grofkorrelig materiaal', examples: 'Rijst, havermout, koffiebonen, grind' },
                  { value: 'vlokken', label: 'Vlokken', desc: 'Vlokstructuur', examples: 'Cornflakes, havervlokken, zeepmeel' },
                  { value: 'anders', label: 'Anders', desc: 'Andere vorm', examples: 'Pasta, noten, gedroogd fruit, stenen' }
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      config.productForm === option.value 
                        ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                        : 'hover:border-bates-orange/30 bg-white'
                    }`}
                    onClick={() => updateConfig('productForm', option.value)}
                  >
                    <CardContent className="p-6 text-center relative">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="absolute top-2 right-2 h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="font-semibold mb-1">{option.label}</p>
                            <p className="text-sm">Voorbeelden: {option.examples}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <Label className="text-lg font-semibold mb-3 block text-gray-900">
                  Welk specifiek product wilt u verpakken? *
                </Label>
                <Input
                  type="text"
                  value={config.productFormSpecification || ''}
                  onChange={(e) => updateConfig('productFormSpecification', e.target.value)}
                  placeholder="Bijvoorbeeld: tarwemeel, wasmiddel poeder, rijstkorrels..."
                  className="w-full h-14 text-lg border-2 focus:border-bates-orange"
                  required
                />
                <p className="text-sm text-gray-600 mt-2">
                  Deze informatie is nodig voor de juiste doseer- en vulconfiguratie
                </p>
              </div>
            </div>
          </div>
        );

      case 2: // Stap 3: Verpakkingstype
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Wat voor verpakking gebruikt u?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: 'zak', label: 'Zak' },
                  { value: 'emmer', label: 'Emmer' },
                  { value: 'pot', label: 'Pot' },
                  { value: 'octabin', label: 'Octabin' },
                  { value: 'big-bag', label: 'Big Bag' },
                  { value: 'anders', label: 'Anders' }
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      config.packagingType === option.value 
                        ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                        : 'hover:border-bates-orange/30 bg-white'
                    }`}
                    onClick={() => updateConfig('packagingType', option.value)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="font-bold text-lg text-gray-900">{option.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Stap 4: Output
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Wat is de gewenste productie-output?
              </Label>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-bates-orange mb-2">
                  {config.outputRate} zakken per uur
                </div>
              </div>
              <div className="px-4 py-6 bg-bates-accent rounded-lg">
                <Slider
                  value={[config.outputRate]}
                  onValueChange={(value) => updateConfig('outputRate', value[0])}
                  min={1}
                  max={1000}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <span>1</span>
                  <span>250</span>
                  <span>500</span>
                  <span>750</span>
                  <span>1000</span>
                </div>
              </div>
              
              {config.outputRate === 1000 && (
                <div className="mt-4">
                  <Card
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      config.moreThan1000 
                        ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                        : 'hover:border-bates-orange/30 bg-white'
                    }`}
                    onClick={() => updateConfig('moreThan1000', !config.moreThan1000)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox checked={config.moreThan1000} />
                        <div className="font-semibold">Meer dan 1000 zakken/uur</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        );

      case 4: // Stap 5: Gewicht
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Wat is het gewicht per verpakking?
              </Label>
              <div className="space-y-4">
                <Label className="text-lg font-semibold block text-gray-900">
                  Gewicht in kg
                </Label>
                <Input
                  type="number"
                  value={config.packageWeight}
                  onChange={(e) => updateConfig('packageWeight', parseFloat(e.target.value) || 0.1)}
                  min="0.1"
                  max="1000"
                  step="0.1"
                  className="w-full h-14 text-lg border-2 focus:border-bates-orange"
                />
                <div className="text-sm text-gray-600">
                  Bereik: 0.1 - 1000 kg
                </div>
                
                {config.packageWeight > 22.7 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm text-yellow-800">
                      ⚠️ Bij gewicht &gt; 22.7 kg is automatische afvoer verplicht
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5: // Stap 6: Zakken aanbrengen (alleen bij zak)
        if (config.packagingType !== 'zak') {
          return (
             <div className="text-center py-12">
               <h3 className="text-xl font-bold text-gray-900 mb-2">Stap overgeslagen</h3>
               <p className="text-gray-600">Deze stap is alleen relevant voor zakken.</p>
            </div>
          );
        }
        
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Hoe wilt u de lege zakken aanbrengen?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'handmatig', label: 'Handmatig', desc: 'Handmatige plaatsing' },
                  { value: 'opsteekautomaat', label: 'Opsteekautomaat', desc: 'Semi-automatisch' },
                  { value: 'volautomatisch', label: 'Volautomatisch', desc: 'Volledig geautomatiseerd' }
                ].map((option) => {
                  const isDisabled = config.packagingType === 'big-bag' && option.value !== 'handmatig';
                  return (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 ${
                        isDisabled 
                          ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                          : config.bagPlacement === option.value 
                            ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                            : 'hover:border-bates-orange/30 bg-white hover:shadow-md'
                      }`}
                      onClick={() => !isDisabled && updateConfig('bagPlacement', option.value)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {config.bagPlacement === 'opsteekautomaat' && (
                <div className="mt-6">
                  <Label className="text-lg font-semibold mb-3 block text-gray-900">Type zakken</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: 'ventielzak', label: 'Ventielzak' },
                      { value: 'openmondzak', label: 'Openmondzak' }
                    ].map((option) => (
                      <Card
                        key={option.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          config.bagPlacementSubType === option.value 
                            ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                            : 'hover:border-bates-orange/30 bg-white'
                        }`}
                        onClick={() => updateConfig('bagPlacementSubType', option.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="font-semibold">{option.label}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6: // Stap 7: Zakken sluiten
        if (config.packagingType !== 'zak') {
          return (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Stap overgeslagen</h3>
              <p className="text-gray-600">Deze stap is niet relevant voor dit verpakkingstype.</p>
            </div>
          );
        }
        
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Hoe sluit u de zakken?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'zelfsluitend', label: 'Zelfsluitend', desc: 'Automatisch sluiten' },
                  { value: 'sealbaar-hitte', label: 'Sealbaar (hitte)', desc: 'Hitte sealing' },
                  { value: 'sealbaar-ultrasoon', label: 'Sealbaar (ultrasoon)', desc: 'Ultrasoon sealing' }
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      config.bagClosing === option.value 
                        ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                        : 'hover:border-bates-orange/30 bg-white'
                    }`}
                    onClick={() => updateConfig('bagClosing', option.value)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 7: // Stap 8: Afvoer
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Hoe worden de gevulde verpakkingen afgevoerd?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { value: 'handmatig', label: 'Handmatig', desc: 'Handmatige afvoer' },
                  { value: 'automatisch', label: 'Automatisch', desc: 'Geautomatiseerde afvoer' }
                ].map((option) => {
                  const isDisabled = config.packageWeight > 22.7 && option.value === 'handmatig';
                  return (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 ${
                        isDisabled
                          ? 'opacity-50 cursor-not-allowed bg-gray-100'
                          : config.discharge === option.value 
                            ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange hover:shadow-md' 
                            : 'hover:border-bates-orange/30 bg-white hover:shadow-md'
                      }`}
                      onClick={() => !isDisabled && updateConfig('discharge', option.value)}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="font-bold text-xl text-gray-900 mb-2">{option.label}</div>
                        <div className="text-gray-600">{option.desc}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {config.packageWeight > 22.7 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm text-yellow-800">
                    ⚠️ Bij gewicht &gt; 22.7 kg is automatische afvoer verplicht voor veiligheid
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 8: // Stap 9: Palletiseren
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Palletiseren
              </Label>

              {/* Ja/Nee keuze */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    config.showPalletizing
                      ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange'
                      : 'hover:border-bates-orange/30 bg-white'
                  }`}
                  onClick={() => updateConfig('showPalletizing', true)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="font-bold text-lg text-gray-900 mb-1">Ja</div>
                    <div className="text-sm text-gray-600">Palletiseren is gewenst</div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    !config.showPalletizing
                      ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange'
                      : 'hover:border-bates-orange/30 bg-white'
                  }`}
                  onClick={() => updateConfig('showPalletizing', false)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="font-bold text-lg text-gray-900 mb-1">Nee</div>
                    <div className="text-sm text-gray-600">Geen palletisering nodig</div>
                  </CardContent>
                </Card>
              </div>

              {!config.showPalletizing ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Palletiseren uitgeschakeld</h3>
                  <p className="text-gray-600">Kies "Ja" om het palletiseer-menu te openen.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Type systeem</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'conventioneel', label: 'Conventionele palletiser', desc: 'Standaard systeem' },
                        { value: 'robot', label: 'Robotarm', desc: 'Flexibel robotsysteem' }
                      ].map((option) => (
                        <Card
                          key={option.value}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            config.palletOptions?.systemType === option.value 
                              ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                              : 'hover:border-bates-orange/30 bg-white'
                          }`}
                          onClick={() => updateConfig('palletOptions', {
                            ...config.palletOptions,
                            systemType: option.value
                          })}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                            <div className="text-sm text-gray-600">{option.desc}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Palletformaat</Label>
                    <Select 
                      value={config.palletOptions?.palletFormat} 
                      onValueChange={(value) => updateConfig('palletOptions', {
                        ...config.palletOptions,
                        palletFormat: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer palletformaat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="euro">Euro pallet (120x80cm)</SelectItem>
                        <SelectItem value="blok">Blok pallet (120x100cm)</SelectItem>
                        <SelectItem value="custom">Custom formaat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'tussenvel', label: 'Tussenvel', desc: 'Scheidingslagen' },
                      { key: 'hoesentrekker', label: 'Hoesentrekker', desc: 'Plastic omhulling' },
                      { key: 'breeklijm', label: 'Breeklijm', desc: 'Lijmbevestiging' },
                      { key: 'labeling', label: 'Labeling', desc: 'Pallet labels' }
                    ].map((option) => (
                      <Card
                        key={option.key}
                        className={`cursor-pointer transition-all duration-200 ${
                          config.palletOptions?.[option.key as keyof typeof config.palletOptions] 
                            ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                            : 'hover:border-bates-orange/30 bg-white hover:shadow-md'
                        }`}
                        onClick={() => {
                          const current = config.palletOptions?.[option.key as keyof typeof config.palletOptions] || false;
                          updateConfig('palletOptions', {
                            ...config.palletOptions,
                            [option.key]: !current
                          });
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              checked={Boolean(config.palletOptions?.[option.key as keyof typeof config.palletOptions])}
                            />
                            <div>
                              <div className="font-semibold">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.desc}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 9: // Stap 10: Besturingskast
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                Besturingskast locatie
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'op-machine', label: 'Op machine', desc: 'Standaard locatie' },
                  { value: 'op-afstand', label: 'Op afstand', desc: '+ extra kosten', warning: true }
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      config.controlCabinet === option.value 
                        ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                        : 'hover:border-bates-orange/30 bg-white'
                    }`}
                    onClick={() => updateConfig('controlCabinet', option.value)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                      <div className={`text-sm ${option.warning ? 'text-orange-600' : 'text-gray-600'}`}>
                        {option.desc}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 10: // Stap 11: ATEX en Normeringen
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-xl font-bold mb-6 block text-gray-900">
                ATEX-certificering en Normeringen
              </Label>
              
              <div className="space-y-6">
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    config.needsATEX 
                      ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                      : 'hover:border-bates-orange/30 bg-white'
                  }`}
                  onClick={() => updateConfig('needsATEX', !config.needsATEX)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox checked={config.needsATEX} />
                      <div>
                        <div className="font-bold text-lg text-gray-900">
                          ATEX-certificering vereist
                        </div>
                        <div className="text-sm text-gray-600">Voor explosiegevaarlijke stoffen en omgevingen</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {config.needsATEX && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <Label className="text-lg font-semibold mb-3 block text-gray-900">ATEX Specificatie</Label>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Zone classificatie</Label>
                        <Select onValueChange={(value) => updateConfig('atexZone', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer ATEX zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zone-20">Zone 20 (Stof continu aanwezig)</SelectItem>
                            <SelectItem value="zone-21">Zone 21 (Stof regelmatig aanwezig)</SelectItem>
                            <SelectItem value="zone-22">Zone 22 (Stof incidenteel aanwezig)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Type stof/gas</Label>
                        <Input
                          type="text"
                          placeholder="Bijv. organisch stof, metaalstof, gas type..."
                          className="w-full border-2 focus:border-bates-orange"
                          onChange={(e) => updateConfig('atexSubstance', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900">Andere normeringen</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'ce', label: 'CE-markering', desc: 'Europese conformiteit' },
                      { key: 'haccp', label: 'HACCP', desc: 'Voedselveiligsheid' },
                      { key: 'fda', label: 'FDA', desc: 'Food and Drug Administration' },
                      { key: 'gmp', label: 'GMP', desc: 'Good Manufacturing Practice' }
                    ].map((norm) => (
                      <Card
                        key={norm.key}
                        className={`cursor-pointer transition-all duration-200 ${
                          config.certifications?.[norm.key] 
                            ? 'ring-2 ring-bates-orange bg-orange-50 border-bates-orange' 
                            : 'hover:border-bates-orange/30 bg-white hover:shadow-md'
                        }`}
                        onClick={() => {
                          const current = config.certifications?.[norm.key] || false;
                          updateConfig('certifications', {
                            ...config.certifications,
                            [norm.key]: !current
                          });
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={Boolean(config.certifications?.[norm.key])} />
                            <div>
                              <div className="font-semibold">{norm.label}</div>
                              <div className="text-sm text-gray-600">{norm.desc}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-bates-accent rounded-lg">
                <h3 className="text-xl font-bold mb-4">Configuratie Samenvatting</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   <div><strong>Productgroep:</strong> {config.productGroup.replace('-', ' ')}</div>
                   <div><strong>Specificatie:</strong> {config.productGroupSpecification || 'Niet ingevuld'}</div>
                   <div><strong>Productvorm:</strong> {config.productForm}</div>
                   <div><strong>Vorm specificatie:</strong> {config.productFormSpecification || 'Niet ingevuld'}</div>
                  <div><strong>Verpakking:</strong> {config.packagingType}</div>
                  <div><strong>Output:</strong> {config.outputRate} zakken/uur {config.moreThan1000 ? '(>1000)' : ''}</div>
                  <div><strong>Gewicht:</strong> {config.packageWeight} kg</div>
                  <div><strong>Afvoer:</strong> {config.discharge}</div>
                </div>
                
                <div className="text-center mt-6 space-y-4">
                  <Button 
                    size="lg" 
                    className="bg-bates-orange hover:bg-bates-orange/90 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                    onClick={() => {
                      alert('Vrijblijvende offerte wordt voorbereid...');
                    }}
                  >
                    Dien vrijblijvende offerte in
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="outline"
                      className="border-bates-orange text-bates-orange hover:bg-bates-orange hover:text-white"
                      onClick={() => {
                        alert('Offerte wordt gedownload...');
                      }}
                    >
                      Download offerte
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="border-bates-orange text-bates-orange hover:bg-bates-orange hover:text-white"
                      onClick={() => {
                        alert('Contact wordt opgenomen...');
                      }}
                    >
                      Contact voor advies
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Configuratiestap niet gevonden</div>;
    }
  };

  const shouldSkipStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 5: // Zakken aanbrengen - skip if not 'zak'
        return config.packagingType !== 'zak';
      case 6: // Zakken sluiten - skip if not 'zak'
        return config.packagingType !== 'zak';
      // Palletiseren wordt niet automatisch overgeslagen; gebruiker kiest Ja/Nee
      case 8:
        return false;
      default:
        return false;
    }
  };

  const getNextStepIndex = () => {
    let nextIndex = step + 1;
    while (nextIndex < 11 && shouldSkipStep(nextIndex)) {
      nextIndex++;
    }
    return nextIndex;
  };

  const getPrevStepIndex = () => {
    let prevIndex = step - 1;
    while (prevIndex >= 0 && shouldSkipStep(prevIndex)) {
      prevIndex--;
    }
    return prevIndex;
  };

  const canProceed = () => {
    // Voor productvorm stap: controleer of productFormSpecification is ingevuld
    if (step === 1) {
      return config.productFormSpecification && config.productFormSpecification.trim().length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      alert('Vul eerst het specifieke product in dat u wilt verpakken.');
      return;
    }
    
    const nextIndex = getNextStepIndex();
    if (nextIndex <= 10) {
      onNext();
    }
  };

  const handlePrev = () => {
    const prevIndex = getPrevStepIndex();
    if (prevIndex >= 0) {
      onPrev();
    }
  };

  return (
    <div>
      {renderStepContent()}
      
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstStep}
          className="px-6 border-bates-orange text-bates-orange hover:bg-bates-orange hover:text-white"
        >
          Vorige
        </Button>
        
        {!isLastStep && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 shadow-lg ${canProceed() 
              ? 'bg-bates-orange hover:bg-bates-orange/90 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Volgende Stap
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfigurationStep;