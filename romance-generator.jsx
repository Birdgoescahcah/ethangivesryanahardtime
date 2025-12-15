import React, { useState } from 'react';

export default function RomanceGenerator() {
  const [step, setStep] = useState('questions');
  const [answers, setAnswers] = useState({
    setting: '',
    meetCute: '',
    tension: '',
    spiceLevel: '',
    ryanPersonality: '',
    emotionalCore: ''
  });
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      key: 'setting',
      question: 'Where does this romance take place?',
      options: [
        { value: 'office', label: '💼 Corporate office - rivals to lovers' },
        { value: 'coffeeshop', label: '☕ Cozy coffee shop - regular meets barista' },
        { value: 'gym', label: '💪 Upscale gym - workout partners' },
        { value: 'cabin', label: '🏔️ Snowed-in mountain cabin' },
        { value: 'wedding', label: '💒 Best man meets groomsman at a wedding' },
        { value: 'bookstore', label: '📚 Quaint bookstore - reaching for the same book' }
      ]
    },
    {
      key: 'meetCute',
      question: 'How do Ethan and Ryan first connect?',
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
        { value: '🌶️🌶️🌶️🌶️', label: '🌶️🌶️🌶️🌶️ Scorching - leave nothing to imagination' }
      ]
    }
  ];

  const currentQuestionIndex = questions.findIndex(q => !answers[q.key]);
  const progress = (Object.values(answers).filter(Boolean).length / questions.length) * 100;

  const handleAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const generateStory = async () => {
    setLoading(true);
    setStep('generating');

    const spiceInstructions = {
      '🌶️': 'Keep it sweet and romantic - tender kisses, longing glances, hand-holding. Fade to black before anything explicit.',
      '🌶️🌶️': 'Include steamy tension and passionate moments. You can describe heated kisses and wandering hands, but fade to black before explicit scenes.',
      '🌶️🌶️🌶️': 'Write explicit romantic scenes with detailed physical descriptions. Include sensual details of their intimate encounters.',
      '🌶️🌶️🌶️🌶️': 'Write very explicit, detailed intimate scenes. Be graphic and descriptive about their physical passion. Leave nothing to the imagination.'
    };

    const prompt = `Write a spicy romance short story (about 1500-2000 words) about two men: Ethan and Ryan.

CHARACTER REQUIREMENTS:
- ETHAN is always the masculine, dominant character. He's confident, protective, has a commanding presence, and takes the lead. He's the one who initiates, who crowds Ryan against walls, who speaks in a low voice that makes Ryan shiver.
- RYAN is the softer character based on this personality: ${answers.ryanPersonality}. He's the one who blushes, who gets flustered by Ethan's intensity, who melts under Ethan's attention.

STORY PARAMETERS:
- Setting: ${answers.setting}
- How they meet/connect: ${answers.meetCute}
- Source of romantic tension: ${answers.tension}
- Emotional core: ${answers.emotionalCore}
- Spice level: ${spiceInstructions[answers.spiceLevel]}

WRITING STYLE:
- Write in third person, past tense
- Include vivid sensory details
- Build tension through dialogue and internal thoughts
- Show the power dynamic clearly - Ethan dominant, Ryan yielding
- Include at least one scene where Ethan does something that makes Ryan's breath catch
- End on a satisfying romantic note

Make it engaging, emotional, and appropriately spicy for the requested heat level. Really lean into the dynamic between confident, masculine Ethan and the softer Ryan.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            { role: "user", content: prompt }
          ],
        })
      });

      const data = await response.json();
      const storyText = data.content.map(block => block.text || '').join('\n');
      setStory(storyText);
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
      setting: '',
      meetCute: '',
      tension: '',
      spiceLevel: '🌶️🌶️',
      ryanPersonality: '',
      emotionalCore: ''
    });
    setStory('');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswered = Object.values(answers).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
            ✨ Ethan & Ryan ✨
          </h1>
          <p className="text-pink-200 text-lg">Romance Story Generator</p>
          <p className="text-pink-300/70 text-sm mt-1">Where Ethan is always the one in charge 😏</p>
        </div>

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

            {/* Current Question */}
            {currentQuestion && (
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

            {/* Summary of answers */}
            {Object.entries(answers).some(([_, v]) => v) && (
              <div className="bg-pink-950/30 rounded-xl p-4 mb-6">
                <h3 className="text-pink-300 font-medium mb-2">Your choices:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(answers).map(([key, value]) => 
                    value && (
                      <span 
                        key={key}
                        onClick={() => handleAnswer(key, '')}
                        className="px-3 py-1 bg-pink-800/50 rounded-full text-sm cursor-pointer hover:bg-pink-700/50 transition-colors"
                        title="Click to change"
                      >
                        {questions.find(q => q.key === key)?.options.find(o => o.value === value)?.label.split(' - ')[0] || value}
                        <span className="ml-1 text-pink-400">×</span>
                      </span>
                    )
                  )}
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
            <p className="text-pink-300">Ethan is about to meet Ryan ✨</p>
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
