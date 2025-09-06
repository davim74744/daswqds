import React, { useState, useEffect } from 'react';
import { OPERATORS } from '../constants';

const Hero = () => {
    // State for the notification animation
    const fullMessage = "Sua recarga de R$ 100,00 foi concluída! Você recebeu +25GB de bônus.";
    const [typedMessage, setTypedMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // State for the clock
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Clock updater
        const clockInterval = setInterval(() => setTime(new Date()), 1000);

        // Notification animation sequence logic
        const runAnimationSequence = () => {
            setTypedMessage('');
            setShowNotification(false);

            // Fix: Use ReturnType<typeof setInterval> for browser compatibility instead of NodeJS.Timeout
            let typingInterval: ReturnType<typeof setInterval>;

            const timers = [
                setTimeout(() => setShowNotification(true), 1500), // Show notification
                setTimeout(() => { // Start typing
                    let i = 0;
                    typingInterval = setInterval(() => {
                        if (i < fullMessage.length) {
                            setTypedMessage(fullMessage.substring(0, i + 1));
                            i++;
                        } else {
                            clearInterval(typingInterval);
                        }
                    }, 40);
                }, 2000),
                // The notification now stays on screen until the loop restarts
            ];
            
            return {
                timers,
                typingInterval
            };
        };

        let sequence = runAnimationSequence();
        const loopInterval = setInterval(() => {
            sequence.timers.forEach(clearTimeout);
            clearInterval(sequence.typingInterval);
            sequence = runAnimationSequence();
        }, 10000); // Loop every 10 seconds

        return () => {
            clearInterval(clockInterval);
            clearInterval(loopInterval);
            sequence.timers.forEach(clearTimeout);
            clearInterval(sequence.typingInterval);
        };
    }, []);

    const formattedTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' }).format(time);

    const operatorCards = [
        { operator: OPERATORS[0], position: 'absolute top-10 -left-16 w-36', delay: '0s' },
        { operator: OPERATORS[1], position: 'absolute top-24 -right-20 w-36', delay: '1s' },
        { operator: OPERATORS[2], position: 'absolute bottom-24 -left-20 w-36', delay: '0.5s' },
        { operator: OPERATORS[3], position: 'absolute bottom-10 -right-12 w-36', delay: '1.5s' },
        { operator: OPERATORS[4], position: 'absolute -top-4 right-8 w-36', delay: '0.2s' },
        { operator: OPERATORS[5], position: 'absolute -bottom-4 left-8 w-36', delay: '0.8s' },
    ];

    return (
        <div className="w-full overflow-hidden relative bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 to-white"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(100,116,139,0.05)_0%,_rgba(100,116,139,0)_50%)]"></div>
            <div className="container mx-auto max-w-screen-2xl py-16 px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left side content */}
                <div className="text-slate-900">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight">
                        Recarga rápida, segura e com <span className="text-slate-800">bônus especial</span>!
                    </h2>
                    <p className="mt-6 max-w-xl text-lg text-slate-600">
                        Complete sua recarga em segundos e aproveite os melhores bônus de internet para sua operadora.
                    </p>
                </div>
                
                {/* Right side graphic - iPHONE MOCKUP */}
                <div className="relative h-96 flex items-center justify-center">
                    {/* Orbiting rings */}
                    <div className="absolute w-80 h-80 border-2 border-slate-300/80 rounded-full animate-spin-slow"></div>
                    <div className="absolute w-96 h-96 border border-slate-200/80 rounded-full animate-spin-slower"></div>
                    
                    {/* iPhone mockup */}
                    <div className="group" style={{ perspective: '1000px' }}>
                        <div className="relative w-48 h-96 bg-gray-200 rounded-[40px] border-2 border-gray-300 shadow-2xl flex items-center justify-center p-1">
                            {/* Side buttons */}
                            <div className="absolute -left-1 top-20 h-5 w-0.5 bg-gray-300 rounded-l-sm"></div>
                            <div className="absolute -left-1 top-28 h-10 w-0.5 bg-gray-300 rounded-l-sm"></div>
                            <div className="absolute -right-1 top-24 h-12 w-0.5 bg-gray-300 rounded-r-sm"></div>

                            {/* Screen content */}
                            <div className="w-full h-full bg-black rounded-[36px] overflow-hidden flex flex-col text-white relative">
                                {/* Wallpaper */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black">
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(100,116,139,0.15)_0%,_rgba(100,116,139,0)_60%)]"></div>
                                </div>
                                
                                {/* Lock screen UI - Clock & Date */}
                                <div className="absolute top-16 left-0 right-0 text-center z-0">
                                  <p className="font-bold text-6xl tracking-tight text-shadow-md">{formattedTime}</p>
                                  <p className="font-medium text-xs capitalize text-slate-300 mt-1">{formattedDate}</p>
                                </div>
                                
                                {/* iOS Notification Bubble */}
                                <div 
                                    className={`
                                        absolute top-40 left-1/2 -translate-x-1/2 w-[94%] 
                                        bg-gray-800/50 backdrop-blur-xl rounded-3xl p-2.5 border border-gray-700/50 shadow-lg 
                                        transition-all duration-500 z-20
                                        ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`
                                    }
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                                >
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-6 h-6 rounded-lg bg-slate-600 flex items-center justify-center text-xs font-bold text-white shrink-0">RF</div>
                                        <div className="flex-grow overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs font-bold text-slate-200">Recarga Fácil</p>
                                                <p className="text-[10px] text-slate-400">agora</p>
                                            </div>
                                            <p className="text-[10px] text-slate-300 leading-snug mt-0.5 break-words">{typedMessage}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Dynamic Island */}
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30"></div>

                                {/* Lock Screen Bottom Controls */}
                                <div className="absolute bottom-6 left-0 right-0 px-4 flex justify-between items-center z-10">
                                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                         <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                </div>

                                {/* Home/Unlock Bar */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/80 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating Operator Cards */}
                    {operatorCards.map(({ operator, position, delay }, index) => (
                        <div
                            key={index}
                            className={`${position} p-3 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg animate-float flex items-center gap-3`}
                            style={{ animationDelay: delay }}
                        >
                            <img src={operator.logo} alt={operator.name} className="h-8 w-8 object-contain shrink-0 bg-white rounded-full p-1" />
                            <div>
                                <p className="text-slate-800 text-sm font-bold leading-tight">Super</p>
                                <p className="text-slate-600 text-xs leading-tight">Recargas</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                
                @keyframes spin-slower {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                .animate-spin-slower { animation: spin-slower 30s linear infinite; }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
}

export default Hero;