## Food ledger API Endpoints

### Auth

| Method | URI                       | Securized | Result                              |
| ------ | ------------------------- | --------- | ----------------------------------- |
| POST   | api/v1/auth/login         | -         | Create user access token            |
| PATCH  | api/v1/auth/refresh-token | -         | Refresh user access token           |
| PATCH  | api/v1/auth/ckeck-token   | -         | Check if user access token is valid |
| DELETE | api/v1/auth/logout        | Logged    | Delete user access token            |

### Users

| Method | URI                  | Securized | Result           |
| ------ | -------------------- | --------- | ---------------- |
| POST   | api/v1/users         | -         | Create new user  |
| GET    | api/v1/users/:userId | Logged    | Get user data    |
| PATCH  | api/v1/users/:userId | Logged    | Update user data |
| DELETE | api/v1/users/:userId | Logged    | Delete a user    |

### Informations

| Method | URI                  | Securized | Result                           |
| ------ | -------------------- | --------- | -------------------------------- |
| POST   | api/v1/infos         | Logged    | Create new contact informations  |
| GET    | api/v1/infos         | -         | Get contact informations data    |
| PATCH  | api/v1/infos/:infoId | Logged    | Update contact informations data |
| DELETE | api/v1/infos/:infoId | Logged    | Delete contact informations      |

### Educations / Experiences

| Method | URI                               | Securized | Result                           |
| ------ | --------------------------------- | --------- | -------------------------------- |
| POST   | api/v1/educs-exps                 | Logged    | Create new education/experience  |
| GET    | api/v1/educs-exps/educs-exps-list | -         | Get educations/experiences list  |
| GET    | api/v1/educs-exps/:educExpeId     | Logged    | Get education/experience data    |
| PATCH  | api/v1/educs-exps/:educExpeId     | Logged    | Update education/experience data |
| DELETE | api/v1/educs-exps/:educExpeId     | Logged    | Delete a education/experience    |

### Skills

| Method | URI                       | Securized | Result            |
| ------ | ------------------------- | --------- | ----------------- |
| POST   | api/v1/skills             | Logged    | Create new skill  |
| GET    | api/v1/skills/skills-list | -         | Get skills list   |
| GET    | api/v1/skills/:skillId    | Logged    | Get skill data    |
| PATCH  | api/v1/skills/:skillId    | Logged    | Update skill data |
| DELETE | api/v1/skills/:skillId    | Logged    | Delete a skill    |

### Projects

| Method | URI                            | Securized | Result                                                                  |
| ------ | ------------------------------ | --------- | ----------------------------------------------------------------------- |
| POST   | api/v1/projects                | Logged    | Create new project                                                      |
| PATCH  | api/v1/projects/:projectId     | Logged    | Update project data                                                     |
| DELETE | api/v1/projects/:projectId     | Logged    | Delete a project                                                        |
| GET    | api/v1/projects/projects-list  | -         | Get projects list                                                       |
| GET    | api/v1/projects/image/:imgName | -         | Get projects image                                                      |
| GET    | api/v1/projects/pagination     | -         | Get the paginated list of projects according to the desired page number |

### Mails

| Method | URI          | Securized | Result                                            |
| ------ | ------------ | --------- | ------------------------------------------------- |
| POST   | api/v1/mails | Logged    | Send email with contact form data to user's email |
