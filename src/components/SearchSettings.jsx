import React from 'react';
import { Search, List, Clock } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import SettingsGroup from './SettingsGroup';

const SearchSettings = ({ config, handleChange, inputClass, buttonClass }) => {
  return (
    <div className="space-y-4">
      <SettingsGroup
        icon={<Search className="h-5 w-5 mr-2" />}
        title="Search Engine"
        control={
          <Select
            value={config.searchEngine}
            onValueChange={(value) => handleChange('searchEngine', value)}
          >
            <SelectTrigger className={`w-[180px] ${inputClass}`}>
              <SelectValue placeholder="Select search engine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="bing">Bing</SelectItem>
              <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <SettingsGroup
        icon={<List className="h-5 w-5 mr-2" />}
        title="Results Per Page"
        control={
          <Select
            value={config.resultsPerPage}
            onValueChange={(value) => handleChange('resultsPerPage', value)}
          >
            <SelectTrigger className={`w-[180px] ${inputClass}`}>
              <SelectValue placeholder="Select results per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <SettingsGroup
        icon={<Clock className="h-5 w-5 mr-2" />}
        title="Search History"
        control={
          <Switch
            checked={config.saveSearchHistory}
            onCheckedChange={(checked) => handleChange('saveSearchHistory', checked)}
            className={buttonClass}
          />
        }
      />
      <div className="space-y-2">
        <span className="text-sm font-medium">Safe Search Level</span>
        <Slider
          value={[config.safeSearchLevel]}
          onValueChange={(value) => handleChange('safeSearchLevel', value[0])}
          max={2}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs">
          <span>Off</span>
          <span>Moderate</span>
          <span>Strict</span>
        </div>
      </div>
    </div>
  );
};

export default SearchSettings;
