# File Tree: jungle-challenge

**Generated:** 10/24/2025, 6:33:26 PM
**Root Path:** `c:\Users\gusta\Documents\Estudos\jungle-challenge`

```
├── 📁 apps
│   ├── 📁 api-gateway
│   │   ├── 📁 src
│   │   │   ├── 📁 common
│   │   │   │   ├── 📁 dto
│   │   │   │   │   ├── 📄 auth.dto.ts
│   │   │   │   │   └── 📄 tasks.dto.ts
│   │   │   │   └── 📁 middleware
│   │   │   │       └── 📄 request-id.middleware.ts
│   │   │   ├── 📁 modules
│   │   │   │   ├── 📁 auth
│   │   │   │   │   ├── 📁 interfaces
│   │   │   │   │   │   └── 📁 jwt
│   │   │   │   │   │       └── 📄 user-payload.d.ts
│   │   │   │   │   ├── 📄 auth.controller.ts
│   │   │   │   │   ├── 📄 auth.module.ts
│   │   │   │   │   ├── 📄 auth.service.ts
│   │   │   │   │   ├── 📄 jwt-auth-guard.ts
│   │   │   │   │   └── 📄 jwt-strategy.ts
│   │   │   │   ├── 📁 tasks
│   │   │   │   │   ├── 📄 tasks.controller.ts
│   │   │   │   │   ├── 📄 tasks.module.ts
│   │   │   │   │   └── 📄 tasks.service.ts
│   │   │   │   └── 📁 websocket
│   │   │   │       ├── 📄 websocket.controller.ts
│   │   │   │       ├── 📄 websocket.gateway.ts
│   │   │   │       └── 📄 websocket.module.ts
│   │   │   ├── 📄 app.module.ts
│   │   │   ├── 📄 logger.custom.ts
│   │   │   └── 📄 main.ts
│   │   ├── ⚙️ .dockerignore
│   │   ├── ⚙️ .env.example
│   │   ├── ⚙️ .gitignore
│   │   ├── ⚙️ .prettierrc
│   │   ├── 🐳 Dockerfile
│   │   ├── 📝 README.md
│   │   ├── 📄 eslint.config.mjs
│   │   ├── ⚙️ nest-cli.json
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 audit_log-service
│   │   ├── 📁 src
│   │   │   ├── 📁 audit-logs
│   │   │   │   ├── 📁 entities
│   │   │   │   │   └── 📄 tasks.entity.ts
│   │   │   │   ├── 📄 logs.controller.ts
│   │   │   │   ├── 📄 logs.module.ts
│   │   │   │   ├── 📄 logs.repository.ts
│   │   │   │   └── 📄 logs.service.ts
│   │   │   ├── 📁 migrations
│   │   │   │   └── 📄 1760642776847-AuditLogsMigration.ts
│   │   │   ├── 📁 utils
│   │   │   ├── 📄 app.module.ts
│   │   │   └── 📄 main.ts
│   │   ├── ⚙️ .dockerignore
│   │   ├── ⚙️ .gitignore
│   │   ├── ⚙️ .prettierrc
│   │   ├── 🐳 Dockerfile
│   │   ├── 📝 README.md
│   │   ├── 📄 eslint.config.mjs
│   │   ├── ⚙️ nest-cli.json
│   │   ├── 📄 orm.config.ts
│   │   ├── ⚙️ package.json
│   │   ├── ⚙️ tsconfig.json
│   │   └── 📄 typeorm.config.ts
│   ├── 📁 auth-service
│   │   ├── 📁 node-modules
│   │   ├── 📁 src
│   │   │   ├── 📁 migrations
│   │   │   │   ├── 📄 1700000000000-InitialMigration.ts
│   │   │   │   └── 📄 1760402507349-InitialMigration.ts
│   │   │   ├── 📁 user
│   │   │   │   ├── 📄 user.controller.ts
│   │   │   │   ├── 📄 user.entity.ts
│   │   │   │   ├── 📄 user.module.ts
│   │   │   │   ├── 📄 user.repository.ts
│   │   │   │   └── 📄 user.service.ts
│   │   │   ├── 📁 utils
│   │   │   │   └── 📄 bcrypt.ts
│   │   │   ├── 📄 app.module.ts
│   │   │   └── 📄 main.ts
│   │   ├── ⚙️ .dockerignore
│   │   ├── ⚙️ .env.example
│   │   ├── ⚙️ .gitignore
│   │   ├── ⚙️ .prettierrc
│   │   ├── 🐳 Dockerfile
│   │   ├── 📝 README.md
│   │   ├── 📄 eslint.config.mjs
│   │   ├── ⚙️ nest-cli.json
│   │   ├── 📄 orm.config.ts
│   │   ├── ⚙️ package.json
│   │   ├── ⚙️ tsconfig.json
│   │   └── 📄 typeorm.config.ts
│   ├── 📁 frontend
│   │   ├── 📁 .tanstack
│   │   ├── 📁 public
│   │   │   └── 🖼️ vite.svg
│   │   ├── 📁 src
│   │   │   ├── 📁 api
│   │   │   │   └── 📄 client.ts
│   │   │   ├── 📁 assets
│   │   │   │   └── 🖼️ react.svg
│   │   │   ├── 📁 components
│   │   │   │   ├── 📁 layout
│   │   │   │   │   └── 📄 navbar.tsx
│   │   │   │   └── 📁 ui
│   │   │   │       ├── 📄 avatar.tsx
│   │   │   │       ├── 📄 badge.tsx
│   │   │   │       ├── 📄 button.tsx
│   │   │   │       ├── 📄 calendar.tsx
│   │   │   │       ├── 📄 card.tsx
│   │   │   │       ├── 📄 dialog.tsx
│   │   │   │       ├── 📄 form.tsx
│   │   │   │       ├── 📄 input.tsx
│   │   │   │       ├── 📄 label.tsx
│   │   │   │       ├── 📄 pagination.tsx
│   │   │   │       ├── 📄 popover.tsx
│   │   │   │       ├── 📄 select.tsx
│   │   │   │       ├── 📄 separator.tsx
│   │   │   │       ├── 📄 skeleton.tsx
│   │   │   │       ├── 📄 sonner.tsx
│   │   │   │       ├── 📄 spinner.tsx
│   │   │   │       ├── 📄 textarea.tsx
│   │   │   │       └── 📄 theme-provider.tsx
│   │   │   ├── 📁 features
│   │   │   │   ├── 📁 $taskId
│   │   │   │   │   ├── 📁 components
│   │   │   │   │   │   ├── 📁 comments
│   │   │   │   │   │   │   ├── 📄 CardComments.tsx
│   │   │   │   │   │   │   ├── 📄 CardCommentsSkeleton.tsx
│   │   │   │   │   │   │   ├── 📄 FormComment.tsx
│   │   │   │   │   │   │   ├── 📄 Pagination.tsx
│   │   │   │   │   │   │   └── 📄 TaskComments.tsx
│   │   │   │   │   │   ├── 📁 header
│   │   │   │   │   │   │   └── 📄 TaskHeader.tsx
│   │   │   │   │   │   └── 📁 info
│   │   │   │   │   │       ├── 📄 ButtonInfoUserTask.tsx
│   │   │   │   │   │       ├── 📄 CardInfoTask.tsx
│   │   │   │   │   │       └── 📄 TaskInfoGrid.tsx
│   │   │   │   │   ├── 📁 hooks
│   │   │   │   │   │   ├── 📄 useFormComment.tsx
│   │   │   │   │   │   ├── 📄 useGetComments.tsx
│   │   │   │   │   │   ├── 📄 useGetTaskById.tsx
│   │   │   │   │   │   ├── 📄 useGetUserInTask.tsx
│   │   │   │   │   │   ├── 📄 useJoinTask.tsx
│   │   │   │   │   │   └── 📄 useQuitTask.tsx
│   │   │   │   │   └── 📁 schema
│   │   │   │   │       └── 📄 comment.schema.ts
│   │   │   │   ├── 📁 auth
│   │   │   │   │   ├── 📁 login
│   │   │   │   │   │   ├── 📁 components
│   │   │   │   │   │   │   └── 📄 form.tsx
│   │   │   │   │   │   ├── 📁 hooks
│   │   │   │   │   │   │   ├── 📄 useLoginForm.ts
│   │   │   │   │   │   │   └── 📄 useLoginMutation.ts
│   │   │   │   │   │   └── 📁 schemas
│   │   │   │   │   │       └── 📄 login.schema.ts
│   │   │   │   │   ├── 📁 queries
│   │   │   │   │   │   └── 📄 authServices.ts
│   │   │   │   │   └── 📁 register
│   │   │   │   │       ├── 📁 components
│   │   │   │   │       │   └── 📄 form.tsx
│   │   │   │   │       ├── 📁 hooks
│   │   │   │   │       │   ├── 📄 useRegisterForm.ts
│   │   │   │   │       │   └── 📄 useRegisterMutation.ts
│   │   │   │   │       └── 📁 schemas
│   │   │   │   │           └── 📄 register.schema.ts
│   │   │   │   └── 📁 tasks
│   │   │   │       ├── 📁 components
│   │   │   │       │   ├── 📄 CardTasks.tsx
│   │   │   │       │   ├── 📄 DialogRegisterTask.tsx
│   │   │   │       │   ├── 📄 FormRegisterTask.tsx
│   │   │   │       │   ├── 📄 Pagination.tsx
│   │   │   │       │   ├── 📄 TaskFilters.tsx
│   │   │   │       │   └── 📄 TasksHeader.tsx
│   │   │   │       ├── 📁 constants
│   │   │   │       │   ├── 📄 priority.config.ts
│   │   │   │       │   └── 📄 status.config.ts
│   │   │   │       ├── 📁 hooks
│   │   │   │       │   ├── 📄 useCommentMutation.ts
│   │   │   │       │   ├── 📄 useFormRegisterTask.ts
│   │   │   │       │   ├── 📄 useGetTasks.ts
│   │   │   │       │   └── 📄 useRegisterMutation.ts
│   │   │   │       ├── 📁 queries
│   │   │   │       │   └── 📄 tasksService.ts
│   │   │   │       └── 📁 schemas
│   │   │   │           └── 📄 register-task.schema.ts
│   │   │   ├── 📁 hooks
│   │   │   │   └── 📄 useWebSocket.ts
│   │   │   ├── 📁 lib
│   │   │   │   └── 📄 utils.ts
│   │   │   ├── 📁 providers
│   │   │   │   ├── 📄 query-client.ts
│   │   │   │   └── 📄 websocket-provider.tsx
│   │   │   ├── 📁 routes
│   │   │   │   ├── 📁 auth
│   │   │   │   │   ├── 📄 login.tsx
│   │   │   │   │   └── 📄 register.tsx
│   │   │   │   ├── 📁 tasks
│   │   │   │   │   ├── 📄 $taskId.tsx
│   │   │   │   │   └── 📄 index.tsx
│   │   │   │   └── 📄 __root.tsx
│   │   │   ├── 📁 store
│   │   │   │   └── 📄 user.ts
│   │   │   ├── 📁 utils
│   │   │   │   └── 📄 convert-time.ts
│   │   │   ├── 🎨 index.css
│   │   │   ├── 📄 main.tsx
│   │   │   └── 📄 routeTree.gen.ts
│   │   ├── ⚙️ .dockerignore
│   │   ├── ⚙️ .gitignore
│   │   ├── 🐳 Dockerfile
│   │   ├── 📝 README.md
│   │   ├── ⚙️ components.json
│   │   ├── 📄 eslint.config.js
│   │   ├── 🌐 index.html
│   │   ├── ⚙️ package.json
│   │   ├── ⚙️ tsconfig.app.json
│   │   ├── ⚙️ tsconfig.json
│   │   ├── ⚙️ tsconfig.node.json
│   │   └── 📄 vite.config.ts
│   ├── 📁 notifications-service
│   │   ├── 📁 src
│   │   │   ├── 📁 notifications
│   │   │   │   ├── 📄 notifications.controller.ts
│   │   │   │   ├── 📄 notifications.module.ts
│   │   │   │   └── 📄 notifications.service.ts
│   │   │   ├── 📄 app.module.ts
│   │   │   └── 📄 main.ts
│   │   ├── ⚙️ .dockerignore
│   │   ├── ⚙️ .env.example
│   │   ├── ⚙️ .gitignore
│   │   ├── ⚙️ .prettierrc
│   │   ├── 🐳 Dockerfile
│   │   ├── 📝 README.md
│   │   ├── 📄 eslint.config.mjs
│   │   ├── ⚙️ nest-cli.json
│   │   ├── ⚙️ package-lock.json
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   └── 📁 tasks-service
│       ├── 📁 src
│       │   ├── 📁 migrations
│       │   │   ├── 📄 1760449269155-TasksMigration.ts
│       │   │   ├── 📄 1760452820615-TasksMigration.ts
│       │   │   ├── 📄 1760462482289-TasksMigration.ts
│       │   │   ├── 📄 1760476813032-TasksMigration.ts
│       │   │   ├── 📄 1760570266002-TasksMigration.ts
│       │   │   ├── 📄 1760881813932-TaskMigrationUserMinimalEntity.ts
│       │   │   ├── 📄 1760888458719-TaskRemoveUserMinimal.ts
│       │   │   └── 📄 1760908225471-UpdateCommentsTimeZone.ts
│       │   ├── 📁 tasks
│       │   │   ├── 📁 entities
│       │   │   │   ├── 📄 comment.entity.ts
│       │   │   │   ├── 📄 task-user.entity.ts
│       │   │   │   └── 📄 task.entity.ts
│       │   │   ├── 📁 repositories
│       │   │   │   ├── 📄 comment.repository.ts
│       │   │   │   ├── 📄 task-user.repository.ts
│       │   │   │   └── 📄 tasks.repository.ts
│       │   │   ├── 📄 tasks.controller.ts
│       │   │   ├── 📄 tasks.module.ts
│       │   │   └── 📄 tasks.service.ts
│       │   ├── 📄 app.module.ts
│       │   └── 📄 main.ts
│       ├── ⚙️ .dockerignore
│       ├── ⚙️ .env.example
│       ├── ⚙️ .gitignore
│       ├── ⚙️ .prettierrc
│       ├── 🐳 Dockerfile
│       ├── 📝 README.md
│       ├── 📄 eslint.config.mjs
│       ├── ⚙️ nest-cli.json
│       ├── 📄 orm.config.ts
│       ├── ⚙️ package.json
│       ├── ⚙️ tsconfig.json
│       └── 📄 typeorm.config.ts
├── 📁 packages
│   ├── 📁 dtos
│   │   ├── 📁 src
│   │   │   ├── 📁 auth
│   │   │   │   ├── 📄 create-user.dto.ts
│   │   │   │   ├── 📄 index.ts
│   │   │   │   ├── 📄 login-user.dto.ts
│   │   │   │   └── 📄 refresh-token.dto.ts
│   │   │   ├── 📁 tasks
│   │   │   │   ├── 📄 create-comment.dto.ts
│   │   │   │   ├── 📄 create-task.dto.ts
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 update-task.dto.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📝 README.md
│   │   ├── 📄 eslint.config.js
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 eslint-config
│   │   ├── 📝 README.md
│   │   ├── 📄 base.js
│   │   ├── 📄 next.js
│   │   ├── ⚙️ package.json
│   │   └── 📄 react-internal.js
│   ├── 📁 interfaces
│   │   ├── 📁 src
│   │   │   ├── 📁 audit-logs
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 tasks-logs.ts
│   │   │   ├── 📁 events
│   │   │   │   ├── 📁 tasks
│   │   │   │   │   ├── 📄 delete-tasks.ts
│   │   │   │   │   ├── 📄 get-comments-pagination.ts
│   │   │   │   │   ├── 📄 get-task-by-id.ts
│   │   │   │   │   ├── 📄 get-tasks-pagination.ts
│   │   │   │   │   ├── 📄 get-user-in-task.ts
│   │   │   │   │   ├── 📄 index.ts
│   │   │   │   │   ├── 📄 join-user-task.ts
│   │   │   │   │   ├── 📄 post-comment.ts
│   │   │   │   │   ├── 📄 quit-user-tasks.ts
│   │   │   │   │   ├── 📄 register-task.ts
│   │   │   │   │   └── 📄 update-task.ts
│   │   │   │   ├── 📁 user
│   │   │   │   │   ├── 📄 get-user-by-id.ts
│   │   │   │   │   ├── 📄 index.ts
│   │   │   │   │   ├── 📄 login-user.ts
│   │   │   │   │   └── 📄 register-user.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 notifications
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 notification.ts
│   │   │   ├── 📁 tasks
│   │   │   │   ├── 📄 comments.ts
│   │   │   │   ├── 📄 index.ts
│   │   │   │   ├── 📄 task-filter.ts
│   │   │   │   └── 📄 task.ts
│   │   │   ├── 📁 users
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 user.ts
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   └── 📁 typescript-config
│       ├── ⚙️ base.json
│       ├── ⚙️ nextjs.json
│       ├── ⚙️ package.json
│       └── ⚙️ react-library.json
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 arch
├── ⚙️ docker-compose.yml
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
├── ⚙️ pnpm-workspace.yaml
└── ⚙️ turbo.json
```

*Generated by FileTree Pro Extension*