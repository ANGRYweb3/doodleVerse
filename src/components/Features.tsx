import React from 'react';

const Features: React.FC = () => {
  const howItWorksSteps = [
    {
      step: '01',
      title: 'Mint Your NFT',
      description: 'Get one of 50 early access NFTs to join our exclusive community of crypto forecasters and AI enthusiasts.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      step: '02', 
      title: 'Access AI Tools',
      description: 'Unlock our powerful crypto price forecasting AI and advanced market analysis tools built on Hedera.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      step: '03',
      title: 'Preview & Earn',
      description: 'Get exclusive preview access to our AI models and be the first to experience next-generation trading insights.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ];

  const roadmapItems = [
    {
      phase: 'Phase 1',
      title: 'Early Access Launch',
      description: 'Release 50 early access NFTs for community building and initial feedback collection',
      status: 'current',
      date: 'Q4 2024',
      features: ['50 Early Access NFTs', 'Community Building', 'Feedback Collection'],
      color: 'from-blue-400 to-cyan-400'
    },
    {
      phase: 'Phase 2',
      title: 'AI Forecasting Tool',
      description: 'Launch our first AI tool for crypto price forecasting with real-time market analysis',
      status: 'upcoming',
      date: 'Q1 2025',
      features: ['Crypto Price Forecasting', 'Real-time Analysis', 'Model Preview Access'],
      color: 'from-purple-400 to-pink-400'
    },
    {
      phase: 'Phase 3',
      title: 'Platform Expansion',
      description: 'Add more AI tools including portfolio optimization and risk assessment features',
      status: 'future',
      date: 'Q2 2025',
      features: ['Portfolio Optimization', 'Risk Assessment', 'Advanced Analytics'],
      color: 'from-green-400 to-emerald-400'
    },
    {
      phase: 'Phase 4',
      title: 'Social & Community',
      description: 'Build social features, community governance, and expand the Hedera ecosystem integration',
      status: 'future',
      date: 'Q3 2025',
      features: ['Social Features', 'Community Governance', 'Ecosystem Integration'],
      color: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 md:left-20 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-10 md:right-20 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-10 animate-bounce-slow"></div>
        
        {/* Real NFT Images in Background */}
        <div className="absolute top-32 right-16 md:right-32 w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl shadow-lg border-2 border-gray-200 p-1 md:p-2 animate-float opacity-40 hidden md:block overflow-hidden">
          <img src="/hoohles29.png" alt="Hoohles NFT" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute bottom-32 left-16 md:left-32 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl shadow-lg border-2 border-gray-200 p-1 md:p-2 animate-bounce-slow opacity-40 overflow-hidden">
          <img src="/hoohles48.png" alt="Hoohles NFT" className="w-full h-full object-cover rounded" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* How It Works Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 doodle-border">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-semibold text-purple-700 font-doodle-fun">Simple Process</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6 md:mb-8 font-doodle">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-doodle-body">
              Three simple steps to access revolutionary AI-powered crypto tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line - Only show on large screens between cards */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 md:top-20 left-full w-full h-1 bg-gradient-to-r from-gray-300 to-transparent z-0 border-dashed border-t-2"></div>
                )}
                
                {/* Card */}
                <div className="relative z-10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl md:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform`}></div>
                  <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl transform -rotate-1 group-hover:rotate-0 transition-all duration-300 hover:scale-105 doodle-border">
                    
                    {/* Step Number */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${step.color} text-white rounded-xl md:rounded-2xl font-bold text-lg md:text-xl mb-4 md:mb-6 shadow-lg font-doodle`}>
                      {step.step}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 font-doodle">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg font-doodle-body">{step.description}</p>
                    
                    {/* Decorative Element - Real NFT Image */}
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg shadow-lg border-2 border-yellow-400 p-1 group-hover:animate-bounce overflow-hidden">
                      <img 
                        src={index === 0 ? '/hoohles84.png' : index === 1 ? '/hoohles87.png' : '/hoohles29.png'} 
                        alt="Hoohles NFT" 
                        className="w-full h-full object-cover rounded" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Section */}
        <div>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-blue-100 to-purple-100 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 doodle-border">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-semibold text-blue-700 font-doodle-fun">Our Journey</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6 md:mb-8 font-doodle">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-doodle-body">
              Building the future of AI-powered crypto tools on Hedera
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-8 lg:left-1/2 top-0 bottom-0 w-1 md:w-2 bg-gradient-to-b from-blue-400 via-purple-400 via-green-400 to-orange-400 transform lg:-translate-x-1/2 rounded-full border-dashed"></div>

            <div className="space-y-12 md:space-y-16">
              {roadmapItems.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'} shrink-0 doodle-border border-white`}>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${
                      item.status === 'completed' ? 'bg-white' :
                      item.status === 'current' ? 'bg-white animate-pulse' :
                      'bg-white/70'
                    }`}>
                      {item.status === 'completed' && (
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {item.status === 'current' && (
                        <div className="w-full h-full bg-blue-600 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-8 md:ml-12 lg:ml-0 flex-1 max-w-2xl`}>
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl md:rounded-3xl transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} opacity-10`}></div>
                      <div className={`relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl transform ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 transition-transform duration-300 doodle-border`}>
                        
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 md:mb-6">
                          <div>
                            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
                              <span className={`px-2 md:px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs md:text-sm font-semibold rounded-full font-doodle-fun`}>
                                {item.phase}
                              </span>
                              <span className="text-xs md:text-sm font-medium text-gray-500 font-doodle-body">{item.date}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-doodle">{item.title}</h3>
                          </div>
                          
                          <div className={`mt-3 lg:mt-0 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold font-doodle-fun ${
                            item.status === 'completed' ? 'bg-green-100 text-green-700' :
                            item.status === 'current' ? 'bg-blue-100 text-blue-700' :
                            item.status === 'upcoming' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {item.status === 'completed' ? 'Completed' :
                             item.status === 'current' ? 'In Progress' :
                             item.status === 'upcoming' ? 'Coming Soon' :
                             'Future'}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-doodle-body">{item.description}</p>

                        {/* Features */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3">
                          {item.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2 bg-gray-50 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 doodle-border border-gray-200">
                              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r ${item.color} rounded-full`}></div>
                              <span className="text-xs md:text-sm font-medium text-gray-700 font-doodle-body">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 md:mt-32">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl md:rounded-3xl transform rotate-2 opacity-20"></div>
            <div className="relative bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform doodle-border">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 font-doodle">Ready to Join the Future?</h3>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto font-doodle-body">
                Be among the first 50 early supporters to access revolutionary AI crypto tools on Hedera.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:scale-105 transition-transform shadow-lg font-doodle-fun doodle-border border-white">
                  Mint Early Access NFT
                </button>
                <button className="bg-white border-3 border-gray-800 text-gray-800 px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:bg-gray-800 hover:text-white transition-colors font-doodle-fun doodle-border">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 