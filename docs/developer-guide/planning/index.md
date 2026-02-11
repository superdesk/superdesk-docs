---
sidebar_position: 3
---

# Superdesk Planning

The Superdesk Planning module adds event management, planning, and assignment capabilities to Superdesk.

## Overview

Repository: [superdesk/superdesk-planning](https://github.com/superdesk/superdesk-planning)

The Planning module extends Superdesk with:
- **Events**: Manage news events with location, contacts, and files
- **Planning Items**: Plan coverage for events
- **Assignments**: Assign coverage to journalists
- **Calendars**: View events and planning in calendar format
- **Coverage**: Track coverage status and deliverables

## Key Features

- Event management with recurring events
- Planning workflow with approval states
- Assignment workflow and tracking
- Calendar views (day, week, month)
- Coverage tracking and status updates
- Integration with content creation
- Event templates and categories
- Contact management
- Location database

## Architecture

The Planning module consists of both backend and frontend components that integrate seamlessly with Superdesk core.

### Backend Structure

```
server/
├── planning/
│   ├── assignments/       # Assignment management
│   ├── events/            # Event management
│   ├── planning/          # Planning items
│   ├── coverage/          # Coverage tracking
│   ├── locations/         # Location management
│   └── contacts/          # Contact management
└── settings.py            # Configuration
```

### Frontend Structure

```
client/
├── components/
│   ├── Events/            # Event components
│   ├── Planning/          # Planning components
│   ├── Assignments/       # Assignment components
│   └── Coverages/         # Coverage components
├── actions/               # Redux actions
├── reducers/              # Redux reducers
├── selectors/             # State selectors
└── index.ts              # Module entry
```

## Installation

### Backend Setup

```bash
# Install as a dependency in your Superdesk backend
pip install superdesk-planning

# Or install from source
git clone https://github.com/superdesk/superdesk-planning.git
cd superdesk-planning/server
pip install -e .
```

Enable in your `settings.py`:

```python
INSTALLED_APPS.extend([
    'planning',
])

# Enable planning module
PLANNING_MODULE_ENABLED = True

# Optional: Configure features
PLANNING_ALLOW_SCHEDULED_UPDATES = True
PLANNING_AUTO_ASSIGN_TO_WORKFLOW = False
PLANNING_CHECK_FOR_ASSIGNMENT_UPDATES = True
```

### Frontend Setup

```bash
# In your superdesk-client-core project
npm install superdesk-planning

# Or install from source
git clone https://github.com/superdesk/superdesk-planning.git
```

Add to `superdesk.config.js`:

```javascript
module.exports = {
    apps: ['superdesk-core'],
    importApps: ['../superdesk-planning'],
    defaultRoute: '/workspace/monitoring',
};
```

## Data Models

### Event

```typescript
interface IEvent {
    _id: string;
    guid: string;
    name: string;
    definition_short: string;
    definition_long: string;
    dates: {
        start: string;
        end: string;
        tz: string;
    };
    location: ILocation[];
    calendars: ICalendar[];
    occur_status: IEventOccurStatus;
    recurrence_rule: IRecurrenceRule;
    files: IFile[];
    links: string[];
    state: 'draft' | 'scheduled' | 'postponed' | 'cancelled';
}
```

### Planning Item

```typescript
interface IPlanningItem {
    _id: string;
    guid: string;
    slugline: string;
    headline: string;
    description_text: string;
    event_item: string; // Event ID
    planning_date: string;
    coverages: ICoverage[];
    agendas: IAgenda[];
    state: 'draft' | 'scheduled' | 'cancelled';
    workflow_status: 'draft' | 'ingested' | 'scheduled' | 'published';
}
```

### Coverage

```typescript
interface ICoverage {
    coverage_id: string;
    planning: {
        g2_content_type: 'text' | 'photo' | 'video' | 'audio';
        slugline: string;
        scheduled: string;
        genre: IGenre[];
    };
    assigned_to: {
        desk: string;
        user: string;
        assignment_id: string;
        state: 'draft' | 'assigned' | 'in_progress' | 'completed' | 'submitted';
    };
    workflow_status: string;
}
```

### Assignment

```typescript
interface IAssignment {
    _id: string;
    type: 'assignment';
    assigned_to: {
        desk: string;
        user: string;
        state: 'draft' | 'assigned' | 'in_progress' | 'completed' | 'submitted' | 'cancelled';
    };
    planning: {
        slugline: string;
        scheduled: string;
        g2_content_type: string;
    };
    planning_item: string;
    coverage_item: string;
}
```

## Common Workflows

### Creating an Event

```typescript
import {planningApi} from 'superdesk-planning';

const createEvent = async () => {
    const event = {
        name: 'Press Conference',
        definition_short: 'Mayor to announce new policy',
        dates: {
            start: '2026-02-15T10:00:00+00:00',
            end: '2026-02-15T11:00:00+00:00',
            tz: 'UTC',
        },
        location: [{
            name: 'City Hall',
            address: {
                line: ['123 Main St'],
                locality: 'Springfield',
            },
        }],
    };
    
    return planningApi.events.create(event);
};
```

### Creating a Planning Item

```typescript
const createPlanning = async (eventId: string) => {
    const planning = {
        event_item: eventId,
        slugline: 'mayor-policy',
        headline: 'Mayor announces new policy',
        planning_date: '2026-02-15T10:00:00+00:00',
        coverages: [{
            planning: {
                g2_content_type: 'text',
                slugline: 'mayor-policy-text',
                scheduled: '2026-02-15T10:00:00+00:00',
            },
        }],
    };
    
    return planningApi.planning.create(planning);
};
```

### Assigning Coverage

```typescript
const assignCoverage = async (
    planningId: string,
    coverageId: string,
    deskId: string,
    userId: string
) => {
    return planningApi.planning.assignCoverage(
        planningId,
        coverageId,
        {
            desk: deskId,
            user: userId,
            state: 'assigned',
        }
    );
};
```

### Updating Assignment Status

```typescript
const updateAssignmentStatus = async (
    assignmentId: string,
    status: 'in_progress' | 'completed' | 'submitted'
) => {
    return planningApi.assignments.update(assignmentId, {
        assigned_to: {
            state: status,
        },
    });
};
```

## API Endpoints

### Events

```bash
# Get events
GET /events

# Get single event
GET /events/{id}

# Create event
POST /events
{
  "name": "Event Name",
  "dates": {...}
}

# Update event
PATCH /events/{id}

# Delete event
DELETE /events/{id}

# Publish event
POST /events/{id}/publish

# Reschedule event
POST /events/{id}/reschedule
```

### Planning

```bash
# Get planning items
GET /planning

# Get single planning item
GET /planning/{id}

# Create planning
POST /planning

# Update planning
PATCH /planning/{id}

# Assign coverage
POST /planning/{id}/assign

# Publish planning
POST /planning/{id}/publish
```

### Assignments

```bash
# Get assignments
GET /assignments

# Get single assignment
GET /assignments/{id}

# Update assignment
PATCH /assignments/{id}

# Complete assignment
POST /assignments/{id}/complete
```

## UI Components

### Event List

```typescript
import {EventsList} from 'superdesk-planning';

<EventsList
    events={events}
    onEventClick={handleEventClick}
    onEditEvent={handleEditEvent}
    selectedEventId={selectedEventId}
/>
```

### Planning List

```typescript
import {PlanningList} from 'superdesk-planning';

<PlanningList
    planningItems={planningItems}
    onPlanningClick={handlePlanningClick}
    showEventDetails={true}
/>
```

### Calendar View

```typescript
import {Calendar} from 'superdesk-planning';

<Calendar
    events={events}
    planningItems={planningItems}
    currentDate={currentDate}
    viewType="week" // 'day' | 'week' | 'month'
    onDateChange={handleDateChange}
    onEventClick={handleEventClick}
/>
```

## Configuration

### Feature Flags

```python
# settings.py

# Enable/disable features
PLANNING_MODULE_ENABLED = True
PLANNING_ALLOW_SCHEDULED_UPDATES = True
PLANNING_AUTO_ASSIGN_TO_WORKFLOW = False
PLANNING_CHECK_FOR_ASSIGNMENT_UPDATES = True

# Coverage types
PLANNING_TYPES = [
    {'qcode': 'event', 'name': 'Event'},
    {'qcode': 'planning', 'name': 'Planning'},
]

# Assignment priorities
PLANNING_PRIORITY_QCODE_PREFIX = 'planning_priority_'
```

### Custom Content Types

```python
# Add custom coverage content types
PLANNING_CUSTOM_CONTENT_TYPES = [
    {
        'content_type': 'infographic',
        'name': 'Infographic',
        'icon': 'graphic',
    }
]
```

## Best Practices

1. **Event Management**
   - Use templates for recurring event types
   - Fill in all relevant metadata
   - Link related events when appropriate

2. **Planning Workflow**
   - Create planning items before events occur
   - Assign coverage with realistic deadlines
   - Update coverage status regularly

3. **Assignments**
   - Assign to specific users when possible
   - Provide clear instructions in coverage details
   - Monitor assignment status

4. **Calendar Usage**
   - Use different views for different planning horizons
   - Color-code events by type or importance
   - Set up recurring events properly

5. **Integration**
   - Link planning to content creation
   - Use sluglines consistently
   - Track coverage completion

## Testing

```bash
# Backend tests
cd server
pytest

# Frontend tests
cd client
npm test

# E2E tests
npm run e2e
```

## Troubleshooting

### Events Not Appearing

- Check that `PLANNING_MODULE_ENABLED = True`
- Verify event state is not 'cancelled'
- Check date range filters

### Assignments Not Creating Content

- Verify desk permissions
- Check assignment state transitions
- Ensure content profile is configured

### Calendar Performance

- Limit date range for large datasets
- Use pagination for event lists
- Cache calendar data appropriately

## Resources

- [Repository](https://github.com/superdesk/superdesk-planning)
- [Planning User Guide](/docs/user-guide) (coming soon)
- [API Reference](/docs/api)

## Next Steps

- Explore [Core Backend](/docs/developer-guide/core)
- Learn about [Client Frontend](/docs/developer-guide/client)
- Review [Architecture Overview](/docs/developer-guide/architecture)
