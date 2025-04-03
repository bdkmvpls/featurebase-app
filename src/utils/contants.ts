export const MODULES = ['Feedback Portal', 'Widgets', 'Changelog', 'Roadmap', 'Help Center', 'Surveys', 'Other'];
export type ModuleType = (typeof MODULES)[number];

export const INTEGRATIONS = [
  'New integration',
  'Jira',
  'ClickUp',
  'Intercom',
  'Zendesk',
  'Slack',
  'Discord',
  'Github',
  'HubSpot',
  'Segment',
  'Azure DevOps',
];
export type IntegrationType = (typeof INTEGRATIONS)[number];

export const ISSUE_OPTIONS = ['Dashboard', 'Widget', 'Integration', 'API', 'Other'] as const;
export type IssueType = (typeof ISSUE_OPTIONS)[number];

export const STATUSES = ['open', 'closed', 'in-progress'];
