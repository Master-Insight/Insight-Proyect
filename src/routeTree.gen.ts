/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicImport } from './routes/_public'
import { Route as PrivateImport } from './routes/_private'
import { Route as PublicIndexImport } from './routes/_public/index'
import { Route as PublicTaskImport } from './routes/_public/task'
import { Route as PublicLoginImport } from './routes/_public/login'
import { Route as PrivateProjectsv2Import } from './routes/_private/projectsv2'
import { Route as PrivateProjectsImport } from './routes/_private/projects'
import { Route as PrivateLogoutImport } from './routes/_private/logout'
import { Route as PrivateTasksTaskIdImport } from './routes/_private/tasks.$taskId'
import { Route as PrivateProjectsProjectIdImport } from './routes/_private/projects_.$projectId'

// Create/Update Routes

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const PrivateRoute = PrivateImport.update({
  id: '/_private',
  getParentRoute: () => rootRoute,
} as any)

const PublicIndexRoute = PublicIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PublicRoute,
} as any)

const PublicTaskRoute = PublicTaskImport.update({
  id: '/task',
  path: '/task',
  getParentRoute: () => PublicRoute,
} as any)

const PublicLoginRoute = PublicLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => PublicRoute,
} as any)

const PrivateProjectsv2Route = PrivateProjectsv2Import.update({
  id: '/projectsv2',
  path: '/projectsv2',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateProjectsRoute = PrivateProjectsImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateLogoutRoute = PrivateLogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateTasksTaskIdRoute = PrivateTasksTaskIdImport.update({
  id: '/tasks/$taskId',
  path: '/tasks/$taskId',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateProjectsProjectIdRoute = PrivateProjectsProjectIdImport.update({
  id: '/projects_/$projectId',
  path: '/projects/$projectId',
  getParentRoute: () => PrivateRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_private': {
      id: '/_private'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PrivateImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/_private/logout': {
      id: '/_private/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof PrivateLogoutImport
      parentRoute: typeof PrivateImport
    }
    '/_private/projects': {
      id: '/_private/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof PrivateProjectsImport
      parentRoute: typeof PrivateImport
    }
    '/_private/projectsv2': {
      id: '/_private/projectsv2'
      path: '/projectsv2'
      fullPath: '/projectsv2'
      preLoaderRoute: typeof PrivateProjectsv2Import
      parentRoute: typeof PrivateImport
    }
    '/_public/login': {
      id: '/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginImport
      parentRoute: typeof PublicImport
    }
    '/_public/task': {
      id: '/_public/task'
      path: '/task'
      fullPath: '/task'
      preLoaderRoute: typeof PublicTaskImport
      parentRoute: typeof PublicImport
    }
    '/_public/': {
      id: '/_public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PublicIndexImport
      parentRoute: typeof PublicImport
    }
    '/_private/projects_/$projectId': {
      id: '/_private/projects_/$projectId'
      path: '/projects/$projectId'
      fullPath: '/projects/$projectId'
      preLoaderRoute: typeof PrivateProjectsProjectIdImport
      parentRoute: typeof PrivateImport
    }
    '/_private/tasks/$taskId': {
      id: '/_private/tasks/$taskId'
      path: '/tasks/$taskId'
      fullPath: '/tasks/$taskId'
      preLoaderRoute: typeof PrivateTasksTaskIdImport
      parentRoute: typeof PrivateImport
    }
  }
}

// Create and export the route tree

interface PrivateRouteChildren {
  PrivateLogoutRoute: typeof PrivateLogoutRoute
  PrivateProjectsRoute: typeof PrivateProjectsRoute
  PrivateProjectsv2Route: typeof PrivateProjectsv2Route
  PrivateProjectsProjectIdRoute: typeof PrivateProjectsProjectIdRoute
  PrivateTasksTaskIdRoute: typeof PrivateTasksTaskIdRoute
}

const PrivateRouteChildren: PrivateRouteChildren = {
  PrivateLogoutRoute: PrivateLogoutRoute,
  PrivateProjectsRoute: PrivateProjectsRoute,
  PrivateProjectsv2Route: PrivateProjectsv2Route,
  PrivateProjectsProjectIdRoute: PrivateProjectsProjectIdRoute,
  PrivateTasksTaskIdRoute: PrivateTasksTaskIdRoute,
}

const PrivateRouteWithChildren =
  PrivateRoute._addFileChildren(PrivateRouteChildren)

interface PublicRouteChildren {
  PublicLoginRoute: typeof PublicLoginRoute
  PublicTaskRoute: typeof PublicTaskRoute
  PublicIndexRoute: typeof PublicIndexRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicLoginRoute: PublicLoginRoute,
  PublicTaskRoute: PublicTaskRoute,
  PublicIndexRoute: PublicIndexRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof PublicRouteWithChildren
  '/logout': typeof PrivateLogoutRoute
  '/projects': typeof PrivateProjectsRoute
  '/projectsv2': typeof PrivateProjectsv2Route
  '/login': typeof PublicLoginRoute
  '/task': typeof PublicTaskRoute
  '/': typeof PublicIndexRoute
  '/projects/$projectId': typeof PrivateProjectsProjectIdRoute
  '/tasks/$taskId': typeof PrivateTasksTaskIdRoute
}

export interface FileRoutesByTo {
  '': typeof PrivateRouteWithChildren
  '/logout': typeof PrivateLogoutRoute
  '/projects': typeof PrivateProjectsRoute
  '/projectsv2': typeof PrivateProjectsv2Route
  '/login': typeof PublicLoginRoute
  '/task': typeof PublicTaskRoute
  '/': typeof PublicIndexRoute
  '/projects/$projectId': typeof PrivateProjectsProjectIdRoute
  '/tasks/$taskId': typeof PrivateTasksTaskIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_private': typeof PrivateRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/_private/logout': typeof PrivateLogoutRoute
  '/_private/projects': typeof PrivateProjectsRoute
  '/_private/projectsv2': typeof PrivateProjectsv2Route
  '/_public/login': typeof PublicLoginRoute
  '/_public/task': typeof PublicTaskRoute
  '/_public/': typeof PublicIndexRoute
  '/_private/projects_/$projectId': typeof PrivateProjectsProjectIdRoute
  '/_private/tasks/$taskId': typeof PrivateTasksTaskIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/logout'
    | '/projects'
    | '/projectsv2'
    | '/login'
    | '/task'
    | '/'
    | '/projects/$projectId'
    | '/tasks/$taskId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/logout'
    | '/projects'
    | '/projectsv2'
    | '/login'
    | '/task'
    | '/'
    | '/projects/$projectId'
    | '/tasks/$taskId'
  id:
    | '__root__'
    | '/_private'
    | '/_public'
    | '/_private/logout'
    | '/_private/projects'
    | '/_private/projectsv2'
    | '/_public/login'
    | '/_public/task'
    | '/_public/'
    | '/_private/projects_/$projectId'
    | '/_private/tasks/$taskId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  PrivateRoute: typeof PrivateRouteWithChildren
  PublicRoute: typeof PublicRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  PrivateRoute: PrivateRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/_private",
        "/_public"
      ]
    },
    "/_private": {
      "filePath": "_private.jsx",
      "children": [
        "/_private/logout",
        "/_private/projects",
        "/_private/projectsv2",
        "/_private/projects_/$projectId",
        "/_private/tasks/$taskId"
      ]
    },
    "/_public": {
      "filePath": "_public.jsx",
      "children": [
        "/_public/login",
        "/_public/task",
        "/_public/"
      ]
    },
    "/_private/logout": {
      "filePath": "_private/logout.jsx",
      "parent": "/_private"
    },
    "/_private/projects": {
      "filePath": "_private/projects.jsx",
      "parent": "/_private"
    },
    "/_private/projectsv2": {
      "filePath": "_private/projectsv2.jsx",
      "parent": "/_private"
    },
    "/_public/login": {
      "filePath": "_public/login.jsx",
      "parent": "/_public"
    },
    "/_public/task": {
      "filePath": "_public/task.jsx",
      "parent": "/_public"
    },
    "/_public/": {
      "filePath": "_public/index.jsx",
      "parent": "/_public"
    },
    "/_private/projects_/$projectId": {
      "filePath": "_private/projects_.$projectId.jsx",
      "parent": "/_private"
    },
    "/_private/tasks/$taskId": {
      "filePath": "_private/tasks.$taskId.jsx",
      "parent": "/_private"
    }
  }
}
ROUTE_MANIFEST_END */
