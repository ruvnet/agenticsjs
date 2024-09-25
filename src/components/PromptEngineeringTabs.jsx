import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const PromptEngineeringTabs = ({ config, handleChange, inputClass, buttonClass }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Prompt Engineering</h3>
      <Tabs defaultValue="system" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${buttonClass}`}>
          <TabsTrigger value="system" className={buttonClass}>System Prompt</TabsTrigger>
          <TabsTrigger value="guidance" className={buttonClass}>Guidance Prompt</TabsTrigger>
        </TabsList>
        <TabsContent value="system">
          <Textarea
            placeholder="Enter system prompt..."
            value={config?.systemPrompt || ''}
            onChange={(e) => handleChange('systemPrompt', e.target.value)}
            className={`w-full h-32 ${inputClass}`}
          />
        </TabsContent>
        <TabsContent value="guidance">
          <Textarea
            placeholder="Enter guidance prompt..."
            value={config?.guidancePrompt || ''}
            onChange={(e) => handleChange('guidancePrompt', e.target.value)}
            className={`w-full h-32 ${inputClass}`}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptEngineeringTabs;
