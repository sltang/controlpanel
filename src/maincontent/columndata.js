export const InstrumentColumnData = [
  { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'project', numeric: false, disablePadding: false, label: 'Project' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'application', numeric: false, disablePadding: false, label: 'Application' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'controller', numeric: false, disablePadding: false, label: 'Controller' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'usedBy', numeric: false, disablePadding: false, label: 'Used By' },
  { id: 'currentSample', numeric: false, disablePadding: false, label: 'Current Sample' },
  { id: 'lastConfiguredBy', numeric: false, disablePadding: false, label: 'Last Configured By' },
  { id: 'lastConfigured', numeric: false, disablePadding: false, label: 'Last Configured' }

];

export const ProjectColumnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'group', numeric: false, disablePadding: false, label: 'Group' },
  { id: 'desc', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'createDate', numeric: false, disablePadding: false, label: 'Creation Date' },
  { id: 'createdBy', numeric: false, disablePadding: false, label: 'Created By' }
];

export const ActivityLogColumnData = [
    { id: 'dateTime', numeric: false, disablePadding: true, label: 'Date/Time' },
    { id: 'user', numeric: false, disablePadding: false, label: 'User' },
    { id: 'desc', numeric: false, disablePadding: false, label: 'Description' },
  ];

  export const CustomParametersColumnData = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'defaultValue', numeric: false, disablePadding: false, label: 'Default Value' },
    { id: 'mandatory', numeric: false, disablePadding: false, label: 'Mandatory' },
  ];