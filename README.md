# Eventure


Eventure is an app to meet new people. It could be used as a dating app or just to make new friends. Rather than matching people together, however, you will choose activities. The app will list activities and the users will be able to join activities that interest them, thus matching with people with the same interests.


## 🚀 Specification Deliverable


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Ever want to do something but have no one to do it with? Eventure (event + adventure) is an app to put you in touch with people who like doing the same things as you. Simply pick an activity you want to do and the app will match you with someone else who picked that activity!

### Design

The user will sign in with their full name, their email, and a password.

![Login design image](StartupLogin.png)

The user will see a screen with all the activities and will be able to join one.

![Main screen design image](StartupMain.png)

After joining a group, the user will see the names and emails of the other people in their group to get in contact with.

![Joined group design image](StartupJoined.png)

Here is a sequence diagram showing how the interaction works.

```mermaid
sequenceDiagram
    actor Hudson
    actor Kramer
    actor Emma
    actor Brandon
    actor Website
    Hudson->>Website: Join "Board Games"
    Website-->>Hudson: "Board Games" group info
    Website-->>Kramer: Hudson joined "Board Games"
    Website-->>Emma: Hudson joined "Board Games"
    Website-->>Brandon: Hudson joined "Board Games"
    Brandon->>Website: Join "Board Games"
    Website-->>Brandon: "Board Games" group info
    Website-->>Hudson: Brandon joined "Board Games"
    Website-->>Hudson: Updated "Board Games" group info
    Website-->>Kramer: Brandon joined "Board Games"
    Website-->>Emma: Brandon joined "Board Games"

```

### Key features

- Login, logout, and register
- Join an activity
- Leave an activity
- Displaying how many users are in each activity
- Displaying the other users' contact information in the same activity

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three different screens. Login/Register, joining an activty, and the group information after you've joined.
- **CSS** - Good looking display, with colored buttons and good whitespace usage.
- **React** - Provides login, changes fill number when joined, changes join button to full, allows user to join and leave group.
- **Service** - Endpoints for:
    - login
    - register
    - joining activity group
    - leaving activity group
    - Third party call to verify valid email address
- **DB/Login** - Stores users and groups in database. Database securely stores user login information. 
- **WebSocket** - As users join groups, their choice is shown to other users.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://hudson-stohl.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
