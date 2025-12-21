import React, { useState, useEffect } from 'react';

function App() {
  const [step, setStep] = useState('questions');
  const [answers, setAnswers] = useState({
    dominant: '',
    setting: '',
    meetCute: '',
    tension: '',
    spiceLevel: '',
    ryanPersonality: '',
    emotionalCore: '',
    emilyStrapOn: '',
    kinks: []
  });
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('romanceHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (storyData) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      dominant: answers.dominant,
      preview: storyData.substring(0, 150) + '...',
      story: storyData,
      answers: { ...answers }
    };
    const newHistory = [newEntry, ...history].slice(0, 20); // Keep last 20
    setHistory(newHistory);
    localStorage.setItem('romanceHistory', JSON.stringify(newHistory));
  };

  const deleteFromHistory = (id) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('romanceHistory', JSON.stringify(newHistory));
  };

  const loadFromHistory = (entry) => {
    setStory(entry.story);
    setAnswers(entry.answers);
    setStep('story');
    setShowHistory(false);
  };

  const baseQuestions = [
    {
      key: 'dominant',
      question: 'Who takes the lead in this romance?',
      options: [
        { value: 'ethan', label: '🖤 Ethan - dark, smoldering, intensely magnetic' },
        { value: 'emily', label: '👠 Emily - bold, fierce, takes what she wants' }
      ]
    },
    {
      key: 'setting',
      question: 'Where does this romance take place?',
      options: [
        { value: 'office', label: '💼 Corporate office - rivals to lovers' },
        { value: 'coffeeshop', label: '☕ Cozy coffee shop - regular meets barista' },
        { value: 'gym', label: '💪 Upscale gym - workout partners' },
        { value: 'cabin', label: '🏔️ Snowed-in mountain cabin' },
        { value: 'wedding', label: '💒 Wedding reception - sparks fly on the dance floor' },
        { value: 'bookstore', label: '📚 Quaint bookstore - reaching for the same book' }
      ]
    },
    {
      key: 'meetCute',
      question: 'How do they first connect?',
      options: [
        { value: 'collision', label: '💥 Literal collision - coffee spills, sparks fly' },
        { value: 'mistaken', label: '🔄 Mistaken identity situation' },
        { value: 'rescue', label: '🦸 One rescues the other from an awkward situation' },
        { value: 'competition', label: '🏆 Competing for the same thing' },
        { value: 'setup', label: '👀 Mutual friends play matchmaker' },
        { value: 'late_night', label: '🌙 Late night encounter, both can\'t sleep' }
      ]
    },
    {
      key: 'ryanPersonality',
      question: 'What\'s Ryan like?',
      options: [
        { value: 'shy', label: '😊 Sweet and shy - blushes easily' },
        { value: 'sassy', label: '😏 Sassy and quick-witted' },
        { value: 'artistic', label: '🎨 Creative and dreamy' },
        { value: 'nerdy', label: '🤓 Adorably nerdy' },
        { value: 'sunshine', label: '☀️ Golden retriever energy' },
        { value: 'mysterious', label: '🌙 Quiet and mysterious' }
      ]
    },
    {
      key: 'tension',
      question: 'What creates the romantic tension?',
      options: [
        { value: 'forbidden', label: '🚫 It\'s complicated - they shouldn\'t be together' },
        { value: 'misunderstanding', label: '💔 A big misunderstanding' },
        { value: 'slow_burn', label: '🔥 Slow burn - neither admits feelings first' },
        { value: 'one_night', label: '✨ One perfect night, then separated' },
        { value: 'past', label: '⏪ They have history together' },
        { value: 'bet', label: '🎲 It started as a bet or dare' }
      ]
    },
    {
      key: 'emotionalCore',
      question: 'What\'s the emotional heart of the story?',
      options: [
        { value: 'healing', label: '💝 Healing each other\'s wounds' },
        { value: 'discovery', label: '🔓 Discovering who they really are' },
        { value: 'trust', label: '🤝 Learning to trust again' },
        { value: 'courage', label: '🦁 Finding courage to be vulnerable' },
        { value: 'belonging', label: '🏠 Finally finding where they belong' },
        { value: 'passion', label: '💋 Pure undeniable chemistry' }
      ]
    },
    {
      key: 'spiceLevel',
      question: 'How spicy should it be? 🌶️',
      options: [
        { value: '🌶️', label: '🌶️ Mild - sweet kisses and longing looks' },
        { value: '🌶️🌶️', label: '🌶️🌶️ Medium - steamy tension, fade to black' },
        { value: '🌶️🌶️🌶️', label: '🌶️🌶️🌶️ Hot - detailed passion, explicit scenes' },
        { value: '🌶️🌶️🌶️🌶️', label: '🌶️🌶️🌶️🌶️ Scorching - leave nothing to imagination' },
        { value: '🔥', label: '🔥 INFERNO - full erotica, absolutely filthy' }
      ]
    }
  ];

  const strapOnQuestion = {
    key: 'emilyStrapOn',
    question: 'Does Emily bring her strap-on? 😈',
    options: [
      { value: 'yes', label: '🍆 Yes - she always comes prepared' },
      { value: 'no', label: '🚫 No - just her hands and her hunger' }
    ]
  };

  const kinkOptions = [
    { value: 'praise', label: '🌟 Praise kink - "good boy" energy' },
    { value: 'marking', label: '💋 Marking - bites, hickeys, claiming' },
    { value: 'bondage', label: '🪢 Light bondage - tied up, held down' },
    { value: 'edging', label: '😈 Edging - teasing to the brink' },
    { value: 'voyeur', label: '👀 Exhibitionism - risk of being caught' },
    { value: 'size', label: '💪 Size difference - emphasis on physical contrast' },
    { value: 'worship', label: '🛐 Body worship - devoted attention' },
    { value: 'rough', label: '🔥 Rough - hair pulling, manhandling' }
  ];

  const kinksQuestion = {
    key: 'kinks',
    question: 'Any special flavors? (pick up to 3) 😈',
    options: kinkOptions,
    multiSelect: true,
    maxSelections: 3
  };

  // Build dynamic questions list
  const isHighSpice = ['🌶️🌶️🌶️', '🌶️🌶️🌶️🌶️', '🔥'].includes(answers.spiceLevel);
  const showStrapOn = answers.dominant === 'emily' && answers.spiceLevel === '🔥';
  
  let questions = [...baseQuestions];
  if (isHighSpice) {
    questions.push(kinksQuestion);
  }
  if (showStrapOn) {
    questions.push(strapOnQuestion);
  }

  const currentQuestionIndex = questions.findIndex(q => {
    if (q.multiSelect) {
      return !answers._kinksSkipped && !answers._kinksConfirmed;
    }
    return !answers[q.key];
  });
  
  const progress = (() => {
    let answered = 0;
    questions.forEach(q => {
      if (q.multiSelect) {
        if (answers[q.key].length > 0 || answers._kinksSkipped) answered++;
      } else if (answers[q.key]) {
        answered++;
      }
    });
    return (answered / questions.length) * 100;
  })();

  const handleAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleKinkToggle = (kink) => {
    setAnswers(prev => {
      const current = prev.kinks || [];
      if (current.includes(kink)) {
        return { ...prev, kinks: current.filter(k => k !== kink) };
      } else if (current.length < 3) {
        return { ...prev, kinks: [...current, kink] };
      }
      return prev;
    });
  };

  const skipKinks = () => {
    setAnswers(prev => ({ ...prev, _kinksSkipped: true }));
  };

  const confirmKinks = () => {
    if (answers.kinks.length === 0) {
      skipKinks();
    } else {
      setAnswers(prev => ({ ...prev, _kinksConfirmed: true }));
    }
  };

  // Surprise me - random selections
  const surpriseMe = () => {
    const randomChoice = (options) => options[Math.floor(Math.random() * options.length)].value;
    
    const randomDominant = randomChoice(baseQuestions[0].options);
    const randomSpice = randomChoice(baseQuestions[6].options);
    const isHighSpiceRandom = ['🌶️🌶️🌶️', '🌶️🌶️🌶️🌶️', '🔥'].includes(randomSpice);
    
    // Random kinks if high spice
    let randomKinks = [];
    if (isHighSpiceRandom) {
      const numKinks = Math.floor(Math.random() * 4); // 0-3 kinks
      const shuffled = [...kinkOptions].sort(() => Math.random() - 0.5);
      randomKinks = shuffled.slice(0, numKinks).map(k => k.value);
    }

    const newAnswers = {
      dominant: randomDominant,
      setting: randomChoice(baseQuestions[1].options),
      meetCute: randomChoice(baseQuestions[2].options),
      ryanPersonality: randomChoice(baseQuestions[3].options),
      tension: randomChoice(baseQuestions[4].options),
      emotionalCore: randomChoice(baseQuestions[5].options),
      spiceLevel: randomSpice,
      kinks: randomKinks,
      emilyStrapOn: randomDominant === 'emily' && randomSpice === '🔥' 
        ? randomChoice(strapOnQuestion.options) 
        : '',
      _kinksSkipped: randomKinks.length === 0 && isHighSpiceRandom,
      _kinksConfirmed: randomKinks.length > 0
    };
    
    setAnswers(newAnswers);
  };

  const generateStory = async () => {
    setLoading(true);
    setStep('generating');

    const spiceInstructions = {
      '🌶️': 'Keep it sweet and romantic - tender kisses, longing glances, hand-holding. Fade to black before anything explicit.',
      '🌶️🌶️': 'Include steamy tension and passionate moments. You can describe heated kisses and wandering hands, but fade to black before explicit scenes.',
      '🌶️🌶️🌶️': 'Write explicit romantic scenes with detailed physical descriptions. Include sensual details of their intimate encounters.',
      '🌶️🌶️🌶️🌶️': 'Write very explicit, detailed intimate scenes. Be graphic and descriptive about their physical passion. Leave nothing to the imagination.',
      '🔥': 'Write extremely explicit, graphic sex scenes. Describe every touch, sensation, and act in vivid detail. Include explicit anatomical descriptions, raw dialogue, and primal intensity. This is full erotica - hold nothing back.'
    };

    const kinkDescriptions = {
      praise: 'Include praise kink - the dominant calls Ryan things like "good boy", praises him, tells him how well he\'s doing',
      marking: 'Include marking - biting, leaving hickeys, the dominant wants to leave visible marks claiming Ryan',
      bondage: 'Include light bondage - Ryan gets tied up or held down, restrained in some way',
      edging: 'Include edging - the dominant teases Ryan mercilessly, bringing him to the brink repeatedly',
      voyeur: 'Include exhibitionism - there\'s a risk of being caught, or they\'re somewhere semi-public',
      size: 'Emphasize size difference - the physical contrast between them, how the dominant towers over or envelops Ryan',
      worship: 'Include body worship - devoted, reverent attention to Ryan\'s body',
      rough: 'Include rough handling - hair pulling, manhandling, being thrown onto surfaces'
    };

    const dominantName = answers.dominant === 'ethan' ? 'Ethan' : 'Emily';
    const dominantPronoun = answers.dominant === 'ethan' ? 'he' : 'she';
    const dominantPossessive = answers.dominant === 'ethan' ? 'his' : 'her';
    const dominantDescription = answers.dominant === 'ethan' 
      ? "He's dark, smoldering, and intensely magnetic. There's danger in his eyes and heat in every glance. He moves with predatory grace, speaks in a low rumble that vibrates through Ryan's chest, and when he focuses that burning intensity on someone, they forget how to breathe."
      : answers.emilyStrapOn === 'yes'
        ? "She has fiery red hair and a personality to match. She's bold, fierce, and knows exactly what she wants. She's the one who initiates, who pins Ryan with her gaze, who speaks with an authority that makes Ryan weak in the knees. She always has her strap-on ready when things heat up - and she knows exactly how to use it."
        : "She has fiery red hair and a personality to match. She's bold, fierce, and knows exactly what she wants. She's the one who initiates, who pins Ryan with her gaze, who speaks with an authority that makes Ryan weak in the knees.";

    const kinkInstructions = answers.kinks.length > 0 
      ? '\n\nKINK REQUIREMENTS:\n' + answers.kinks.map(k => '- ' + kinkDescriptions[k]).join('\n')
      : '';

    const prompt = `Write a spicy romance short story (about 1500-2000 words) about ${dominantName} and Ryan. This is consensual adult fiction between two adults (both 25+).

CHARACTER REQUIREMENTS:
- ${dominantName.toUpperCase()} is always the dominant character. ${dominantDescription}
- RYAN is the softer character based on this personality: ${answers.ryanPersonality}. He's the one who blushes, who gets flustered by ${dominantName}'s intensity, who melts under ${dominantPossessive} attention. He enthusiastically consents to everything.

STORY PARAMETERS:
- Setting: ${answers.setting}
- How they meet/connect: ${answers.meetCute}
- Source of romantic tension: ${answers.tension}
- Emotional core: ${answers.emotionalCore}
- Spice level: ${spiceInstructions[answers.spiceLevel]}${kinkInstructions}

WRITING STYLE:
- Write in third person, past tense
- Include vivid sensory details
- Build tension through dialogue and internal thoughts
- Show the power dynamic clearly - ${dominantName} dominant, Ryan yielding and eager
- Include at least one scene where ${dominantName} does something that makes Ryan's breath catch
- End on a satisfying romantic note

Make it engaging, emotional, and appropriately spicy for the requested heat level. Really lean into the dynamic between confident, commanding ${dominantName} and the softer Ryan.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setStory(data.story);
      saveToHistory(data.story);
      setStep('story');
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('Oops! Something went wrong generating your story. Please try again.');
      setStep('story');
    } finally {
      setLoading(false);
    }
  };

  const resetGenerator = () => {
    setStep('questions');
    setAnswers({
      dominant: '',
      setting: '',
      meetCute: '',
      tension: '',
      spiceLevel: '',
      ryanPersonality: '',
      emotionalCore: '',
      emilyStrapOn: '',
      kinks: []
    });
    setStory('');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswered = questions.every(q => {
    if (q.multiSelect) {
      return answers[q.key].length > 0 || answers._kinksSkipped || answers._kinksConfirmed;
    }
    return answers[q.key];
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
            ✨ Romance Generator ✨
          </h1>
          <p className="text-pink-200 text-lg">Spicy Stories with Ryan</p>
          <p className="text-pink-300/70 text-sm mt-1">Choose who takes the lead 😏</p>
          
          {/* History Button */}
          {history.length > 0 && step === 'questions' && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="mt-4 px-4 py-2 bg-pink-800/50 hover:bg-pink-700/50 rounded-lg text-sm transition-all"
            >
              📚 Story History ({history.length})
            </button>
          )}
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="bg-pink-950/50 backdrop-blur rounded-2xl p-4 mb-6 border border-pink-800/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-pink-200">📚 Your Stories</h3>
              <button onClick={() => setShowHistory(false)} className="text-pink-400 hover:text-pink-300">✕</button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.map(entry => (
                <div key={entry.id} className="bg-pink-900/40 rounded-lg p-3 flex justify-between items-start">
                  <div className="flex-1 cursor-pointer" onClick={() => loadFromHistory(entry)}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-pink-300 text-sm">{entry.date}</span>
                      <span className="text-pink-400">•</span>
                      <span className="text-pink-200">{entry.dominant === 'ethan' ? '🖤 Ethan' : '👠 Emily'}</span>
                    </div>
                    <p className="text-pink-100/70 text-sm line-clamp-2">{entry.preview}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteFromHistory(entry.id); }}
                    className="text-pink-500 hover:text-red-400 ml-2 p-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'questions' && (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-pink-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-pink-300 text-sm mt-2 text-center">
                {Math.round(progress)}% complete
              </p>
            </div>

            {/* Surprise Me Button */}
            <div className="text-center mb-6">
              <button
                onClick={surpriseMe}
                className="px-6 py-3 bg-pink-800/50 hover:bg-pink-700/50 border border-pink-600/30 hover:border-pink-500/50 rounded-xl font-medium transition-all hover:scale-105"
              >
                🎲 Surprise Me!
              </button>
            </div>

            {/* Current Question */}
            {currentQuestion && !currentQuestion.multiSelect && (
              <div className="bg-pink-950/50 backdrop-blur rounded-2xl p-6 mb-6 border border-pink-800/30">
                <h2 className="text-xl font-semibold mb-4 text-pink-100">
                  {currentQuestion.question}
                </h2>
                <div className="grid gap-3">
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.key, option.value)}
                      className="w-full text-left p-4 rounded-xl bg-pink-900/40 hover:bg-pink-800/60 border border-pink-700/30 hover:border-pink-500/50 transition-all duration-200 hover:scale-[1.02]"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Kinks Multi-Select Question */}
            {currentQuestion && currentQuestion.multiSelect && (
              <div className="bg-pink-950/50 backdrop-blur rounded-2xl p-6 mb-6 border border-pink-800/30">
                <h2 className="text-xl font-semibold mb-2 text-pink-100">
                  {currentQuestion.question}
                </h2>
                <p className="text-pink-300/70 text-sm mb-4">Selected: {answers.kinks.length}/3</p>
                <div className="grid gap-3">
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleKinkToggle(option.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        answers.kinks.includes(option.value)
                          ? 'bg-pink-600/60 border-pink-400'
                          : 'bg-pink-900/40 border-pink-700/30 hover:bg-pink-800/60 hover:border-pink-500/50'
                      }`}
                    >
                      {answers.kinks.includes(option.value) ? '✓ ' : ''}{option.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={skipKinks}
                    className="flex-1 py-3 rounded-xl bg-pink-800/50 hover:bg-pink-700/50 font-medium transition-all"
                  >
                    Skip
                  </button>
                  <button
                    onClick={confirmKinks}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 font-medium transition-all"
                  >
                    {answers.kinks.length > 0 ? `Confirm (${answers.kinks.length})` : 'Continue'}
                  </button>
                </div>
              </div>
            )}

            {/* Summary of answers */}
            {Object.entries(answers).some(([k, v]) => v && k !== '_kinksSkipped' && k !== '_kinksConfirmed' && (Array.isArray(v) ? v.length > 0 : true)) && (
              <div className="bg-pink-950/30 rounded-xl p-4 mb-6">
                <h3 className="text-pink-300 font-medium mb-2">Your choices:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(answers).map(([key, value]) => {
                    if (!value || key.startsWith('_')) return null;
                    if (key === 'kinks' && Array.isArray(value) && value.length > 0) {
                      return value.map(kink => (
                        <span 
                          key={kink}
                          onClick={() => handleKinkToggle(kink)}
                          className="px-3 py-1 bg-pink-800/50 rounded-full text-sm cursor-pointer hover:bg-pink-700/50 transition-colors"
                          title="Click to remove"
                        >
                          {kinkOptions.find(k => k.value === kink)?.label.split(' - ')[0] || kink}
                          <span className="ml-1 text-pink-400">×</span>
                        </span>
                      ));
                    }
                    if (Array.isArray(value)) return null;
                    const question = [...baseQuestions, strapOnQuestion].find(q => q.key === key);
                    const label = question?.options.find(o => o.value === value)?.label.split(' - ')[0] || value;
                    return (
                      <span 
                        key={key}
                        onClick={() => handleAnswer(key, '')}
                        className="px-3 py-1 bg-pink-800/50 rounded-full text-sm cursor-pointer hover:bg-pink-700/50 transition-colors"
                        title="Click to change"
                      >
                        {label}
                        <span className="ml-1 text-pink-400">×</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Generate Button */}
            {allAnswered && (
              <button
                onClick={generateStory}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 font-semibold text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-pink-900/50"
              >
                ✨ Generate My Story ✨
              </button>
            )}
          </>
        )}

        {step === 'generating' && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-6xl mb-6">💝</div>
            <h2 className="text-2xl font-semibold mb-2">Writing your story...</h2>
            <p className="text-pink-300">{answers.dominant === 'ethan' ? 'Ethan' : 'Emily'} is about to meet Ryan ✨</p>
            <div className="mt-8 flex justify-center gap-2">
              {[0, 1, 2].map(i => (
                <div 
                  key={i}
                  className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'story' && (
          <div className="bg-pink-950/40 backdrop-blur rounded-2xl p-6 border border-pink-800/30">
            <div className="prose prose-invert prose-pink max-w-none">
              <div className="whitespace-pre-wrap text-pink-50 leading-relaxed">
                {story}
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button
                onClick={resetGenerator}
                className="flex-1 py-3 rounded-xl bg-pink-800/50 hover:bg-pink-700/50 font-medium transition-all"
              >
                🔄 Start Over
              </button>
              <button
                onClick={generateStory}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 font-medium transition-all"
              >
                ✨ Generate Another
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-pink-400/50 text-sm mt-8 pb-4">
          Stories generated by AI • For entertainment purposes 💕
        </p>
      </div>
    </div>
  );
}

export default App;
