import React, { useState } from 'react';
import { Key, Check, Eye, EyeOff, Play } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SettingsGroup from './SettingsGroup';
import { testJinaApi, testOpenAiApi } from '../utils/apiUtils';

const ApiKeyInput = ({ label, value, onChange, onTest, isValid, showResponse, response }) => {
  const [showKey, setShowKey] = useState(false);
  const [showTestResponse, setShowTestResponse] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        {isValid && <Check className="h-5 w-5 text-green-500" />}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={onTest} className="flex-grow">
          <Play className="mr-2 h-4 w-4" /> Test API
        </Button>
        {showResponse && (
          <Button
            variant="outline"
            onClick={() => setShowTestResponse(!showTestResponse)}
          >
            {showTestResponse ? "Hide Response" : "Show Response"}
          </Button>
        )}
      </div>
      {showTestResponse && showResponse && (
        <Textarea
          value={response}
          readOnly
          className="mt-2 h-32"
        />
      )}
    </div>
  );
};

const ApiSettings = ({ config, handleChange }) => {
  const [jinaApiKey, setJinaApiKey] = useState(localStorage.getItem('jinaApiKey') || '');
  const [openAiApiKey, setOpenAiApiKey] = useState(localStorage.getItem('openAiApiKey') || '');
  const [jinaTestResponse, setJinaTestResponse] = useState('');
  const [openAiTestResponse, setOpenAiTestResponse] = useState('');
  const [isJinaValid, setIsJinaValid] = useState(false);
  const [isOpenAiValid, setIsOpenAiValid] = useState(false);

  const handleApiKeyChange = (key, value) => {
    if (key === 'jinaApiKey') {
      setJinaApiKey(value);
      localStorage.setItem('jinaApiKey', value);
    } else if (key === 'openAiApiKey') {
      setOpenAiApiKey(value);
      localStorage.setItem('openAiApiKey', value);
    }
  };

  const handleTestJinaApi = async () => {
    const response = await testJinaApi(jinaApiKey);
    setJinaTestResponse(response);
    setIsJinaValid(response.startsWith('{"tokens":'));
  };

  const handleTestOpenAiApi = async () => {
    const response = await testOpenAiApi(openAiApiKey);
    setOpenAiTestResponse(response);
    setIsOpenAiValid(!response.startsWith('Error:'));
  };

  return (
    <div className="space-y-6">
      <SettingsGroup
        icon={<Key className="h-5 w-5" />}
        title="API Keys"
        control={
          <div className="space-y-4 w-full">
            <ApiKeyInput
              label="Jina.ai API Key"
              value={jinaApiKey}
              onChange={(value) => handleApiKeyChange('jinaApiKey', value)}
              onTest={handleTestJinaApi}
              isValid={isJinaValid}
              showResponse={!!jinaTestResponse}
              response={jinaTestResponse}
            />
            <ApiKeyInput
              label="OpenAI API Key"
              value={openAiApiKey}
              onChange={(value) => handleApiKeyChange('openAiApiKey', value)}
              onTest={handleTestOpenAiApi}
              isValid={isOpenAiValid}
              showResponse={!!openAiTestResponse}
              response={openAiTestResponse}
            />
          </div>
        }
      />
    </div>
  );
};

export default ApiSettings;