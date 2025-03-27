import { Button } from '@/components/common/button';
import { issueOptions, IssueType } from '@/utils/contants';
import React from 'react';

interface IssueSelectorProps {
  issues: IssueType[];
  onSelectionChange?: (issues: IssueType[]) => void;
}

const IssueSelector: React.FC<IssueSelectorProps> = ({ issues, onSelectionChange }) => {
  const toggleSelection = (issue: IssueType) => {
    const newIssues = issues.includes(issue) ? issues.filter((i) => i !== issue) : [...issues, issue];
    onSelectionChange?.(newIssues);
  };

  return (
    <div className="relative z-[50]">
      <p className=" pr-20 text-sm font-medium text-gray-400 dark:text-foreground">What is experiencing an issue?</p>
      <div className="flex flex-wrap mt-3 gap-2.5">
        {issueOptions.map((issue) => (
          <Button
            variant={issues.includes(issue) ? 'default' : 'secondary'}
            onClick={() => toggleSelection(issue)}
            key={issue}
          >
            {issue}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(IssueSelector);
