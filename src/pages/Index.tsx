
import React from 'react';
import MachineConfigurator from '@/components/MachineConfigurator';

const Index = () => {
  return (
    <div className="min-h-screen bg-bates-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bates-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BATES</h1>
                <p className="text-sm text-gray-600">Automatische Zakvulmachines</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-bates-orange transition-colors">Producten</a>
              <a href="#" className="text-gray-700 hover:text-bates-orange transition-colors">Support</a>
              <a href="#" className="text-gray-700 hover:text-bates-orange transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Configureer Uw Perfecte
            <span className="text-bates-orange"> Zakvulmachine</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pas onze industriële zakvulmachine aan uw exacte productie-eisen aan. 
            Krijg direct prijzen en technische specificaties.
          </p>
        </div>
        
        <MachineConfigurator />
      </section>
    </div>
  );
};

export default Index;
