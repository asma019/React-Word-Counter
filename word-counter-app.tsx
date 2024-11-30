import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Type, Clock, Edit2 } from 'lucide-react';

const WordCounterApp = () => {
  const [text, setText] = useState('');

  // Memoized stats calculation to improve performance
  const stats = useMemo(() => {
    const trimmedText = text.trim();

    const words = trimmedText.length > 0 
      ? trimmedText.split(/\s+/) 
      : [];

    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;

    const sentences = text.split(/[.!?]+/).filter(sentence => 
      sentence.trim().length > 0
    ).length;

    const paragraphs = text.split(/\n\s*\n/).filter(para => 
      para.trim().length > 0
    ).length;

    return {
      words: words.length,
      characters: charactersWithSpaces,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingTime: Math.ceil(words.length / 200)
    };
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-between">
            Professional Word Counter
            <Badge variant="secondary" className="text-sm font-normal">
              Detailed Text Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="relative z-10 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-all duration-300">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start writing your text here..."
                  className="w-full min-h-[300px] p-4 rounded-lg bg-transparent 
                    border-2 border-gray-200 
                    focus:outline-none 
                    focus:border-primary/50
                    resize-y
                    text-gray-800
                    placeholder-gray-400
                    transition-all
                    duration-300
                    hover:shadow-sm"
                />
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm text-gray-500">
                    {text.length} / 5000
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-gray-50 border-none">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { 
                        icon: <Type className="w-6 h-6 text-primary" />, 
                        label: 'Words', 
                        value: stats.words 
                      },
                      { 
                        icon: <FileText className="w-6 h-6 text-primary" />, 
                        label: 'Characters', 
                        value: stats.characters 
                      },
                      { 
                        icon: <BookOpen className="w-6 h-6 text-primary" />, 
                        label: 'Sentences', 
                        value: stats.sentences 
                      },
                      { 
                        icon: <Clock className="w-6 h-6 text-primary" />, 
                        label: 'Reading Time', 
                        value: `${stats.readingTime} min` 
                      }
                    ].map((stat, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
                      >
                        {stat.icon}
                        <div>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-4" />

              <Card className="bg-gray-50 border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Advanced Insights
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paragraphs</span>
                      <span className="font-medium">{stats.paragraphs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Word Length</span>
                      <span className="font-medium">
                        {text.length > 0 
                          ? (stats.charactersWithoutSpaces / stats.words).toFixed(2)
                          : '0.00'} chars
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCounterApp;
