# Expenses, Courses, and Tasks Management Module

## Overview
This module provides essential collaborative home management features for housemates: **Expenses management**, **Shared shopping lists (Courses)**, and **Household tasks assignment**. It enables users to log/manage financial transactions, create/tick shared shopping lists, and schedule/distribute recurring household tasks within a coloc (shared flat). The module integrates with Firebase for real-time updates, supporting transparent and up-to-date coordination among all roommates.

## Key Features

- **Expense Tracking**:  
  Allows users to add, view, and balance shared expenses among housemates. Supports specifying payers and beneficiaries, equitable splitting, and viewing transaction history.

- **Shared Shopping Lists (Courses)**:  
  Users can create, categorize, add items to, and check off items on shared shopping lists. Multiple courses can be created, each with a distinct category and emoji.

- **Household Task Scheduling**:  
  Enables creation and assignment of recurring or one-off tasks to selected roommates, with due dates and recurrence intervals, and notification reminders for upcoming responsibilities.

- **List and Task Real-Time Synchronization**:  
  All additions, edits, or completions are instantly reflected to all coloc members via Firebase listeners, ensuring everyone stays up-to-date.

- **User Participation Selection**:  
  For expenses and tasks, users can flexibly select which housemates are involved or responsible, offering granular control.

## System Errors

- **Invalid Input (e.g., Empty or Non-numeric Value)**:  
  Occurs when adding an expense, task, or shopping list with missing title, amount, or participants.  
  _Resolution_: Ensure all required fields (title, amount, participants, etc.) are filled with valid data before submission.

- **Firebase Network/Permission Errors**:  
  Triggered if the backend rejects an action (connectivity loss, wrong permissions, etc.).  
  _Resolution_: Check connection and permissions; error messages bubble up via alerts to the user.

- **Incorrect Date or Recurrence Selection for Tasks**:  
  Occurs if the task date or recurrence is not specified.  
  _Resolution_: Enter a valid due date and recurrence option.

## Usage Examples

```tsx
// Add a new shared expense
<AddDepenseBS onAddDepense={() => { /* refresh or notify */ }} />

// Add a new shopping list (Course)
<AddCourseBS />

// Add a new household task
<AddTacheBS />

// Render the Expense management screen
<DepenseScreen />

// Render the Shopping list detail and item check-off screen
<ListeDeCourse route={routeParams} navigation={navigation} />

// Render the Task management screen
<TacheScreen />
```

## System Integration

```mermaid
flowchart LR
  Firebase[("Firebase Firestore")]
    --> ExpensesContext[(Expenses Data)]
    --> CoursesContext[(Courses Data)]
    --> TasksContext[(Tasks Data)]

  ExpensesContext --> AddDepenseBS
  AddDepenseBS --> DepenseScreen
  DepenseScreen --> Equilibrage
  DepenseScreen --> ListeTransaction
  DepenseScreen -->|Show Balance & History| UI[User Interface]

  CoursesContext --> AddCourseBS
  AddCourseBS --> ListeDeCourse
  ListeDeCourse -->|Add/Check Items| UI

  TasksContext --> AddTacheBS
  AddTacheBS --> TacheScreen
  TacheScreen --> MesTaches
  TacheScreen --> GlobalTaches
  TacheScreen -->|Notifications (Expo)| Notif[Notification Service]

  UI --> Users[("Coloc Users (App)")]
  Notif --> Users

  subgraph [Details]
    Equilibrage
    ListeTransaction
    MesTaches
    GlobalTaches
  end
  subgraph [Process]
    "Expense Add/Balance"
    "List Creation/Check"
    "Task Assignment/Notify"
  end
  subgraph [Consumers]
    UI
    Notif
    Users
  end
```

**Summary:**  
This module orchestrates real-time communication between the front-end user components and cloud data (via Firebase), transforming individual actions (adding an expense, starting a shopping list, scheduling a task) into group-coordinated routines, helping housemates manage shared resources and responsibilities effectively.