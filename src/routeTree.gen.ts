/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicitImport } from './routes/_publicit'
import { Route as PublicImport } from './routes/_public'
import { Route as PrivateImport } from './routes/_private'
import { Route as PublicIndexImport } from './routes/_public/index'
import { Route as PublicitServicesitImport } from './routes/_publicit/servicesit'
import { Route as PublicitIntroitImport } from './routes/_publicit/introit'
import { Route as PublicitAboutitImport } from './routes/_publicit/aboutit'
import { Route as PublicTaskImport } from './routes/_public/task'
import { Route as PublicServicesImport } from './routes/_public/services'
import { Route as PublicLoginImport } from './routes/_public/login'
import { Route as PublicAboutImport } from './routes/_public/about'
import { Route as PrivateResourcesImport } from './routes/_private/resources'
import { Route as PrivateProjectsImport } from './routes/_private/projects'
import { Route as PrivateLogoutImport } from './routes/_private/logout'
import { Route as PrivateCodesImport } from './routes/_private/codes'
import { Route as PrivateClientsImport } from './routes/_private/clients'
import { Route as PrivateAsociatesImport } from './routes/_private/asociates'
import { Route as PrivateUserIdImport } from './routes/_private/user_.$id'
import { Route as PrivateTasksTaskIdImport } from './routes/_private/tasks.$taskId'
import { Route as PrivateProjectsProjectIdImport } from './routes/_private/projects_.$projectId'

// Create/Update Routes

const PublicitRoute = PublicitImport.update({
  id: '/_publicit',
  getParentRoute: () => rootRoute,
} as any)

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

const PublicitServicesitRoute = PublicitServicesitImport.update({
  id: '/servicesit',
  path: '/servicesit',
  getParentRoute: () => PublicitRoute,
} as any)

const PublicitIntroitRoute = PublicitIntroitImport.update({
  id: '/introit',
  path: '/introit',
  getParentRoute: () => PublicitRoute,
} as any)

const PublicitAboutitRoute = PublicitAboutitImport.update({
  id: '/aboutit',
  path: '/aboutit',
  getParentRoute: () => PublicitRoute,
} as any)

const PublicTaskRoute = PublicTaskImport.update({
  id: '/task',
  path: '/task',
  getParentRoute: () => PublicRoute,
} as any)

const PublicServicesRoute = PublicServicesImport.update({
  id: '/services',
  path: '/services',
  getParentRoute: () => PublicRoute,
} as any)

const PublicLoginRoute = PublicLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => PublicRoute,
} as any)

const PublicAboutRoute = PublicAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => PublicRoute,
} as any)

const PrivateResourcesRoute = PrivateResourcesImport.update({
  id: '/resources',
  path: '/resources',
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

const PrivateCodesRoute = PrivateCodesImport.update({
  id: '/codes',
  path: '/codes',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateClientsRoute = PrivateClientsImport.update({
  id: '/clients',
  path: '/clients',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateAsociatesRoute = PrivateAsociatesImport.update({
  id: '/asociates',
  path: '/asociates',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateUserIdRoute = PrivateUserIdImport.update({
  id: '/user_/$id',
  path: '/user/$id',
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
    '/_publicit': {
      id: '/_publicit'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicitImport
      parentRoute: typeof rootRoute
    }
    '/_private/asociates': {
      id: '/_private/asociates'
      path: '/asociates'
      fullPath: '/asociates'
      preLoaderRoute: typeof PrivateAsociatesImport
      parentRoute: typeof PrivateImport
    }
    '/_private/clients': {
      id: '/_private/clients'
      path: '/clients'
      fullPath: '/clients'
      preLoaderRoute: typeof PrivateClientsImport
      parentRoute: typeof PrivateImport
    }
    '/_private/codes': {
      id: '/_private/codes'
      path: '/codes'
      fullPath: '/codes'
      preLoaderRoute: typeof PrivateCodesImport
      parentRoute: typeof PrivateImport
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
    '/_private/resources': {
      id: '/_private/resources'
      path: '/resources'
      fullPath: '/resources'
      preLoaderRoute: typeof PrivateResourcesImport
      parentRoute: typeof PrivateImport
    }
    '/_public/about': {
      id: '/_public/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof PublicAboutImport
      parentRoute: typeof PublicImport
    }
    '/_public/login': {
      id: '/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginImport
      parentRoute: typeof PublicImport
    }
    '/_public/services': {
      id: '/_public/services'
      path: '/services'
      fullPath: '/services'
      preLoaderRoute: typeof PublicServicesImport
      parentRoute: typeof PublicImport
    }
    '/_public/task': {
      id: '/_public/task'
      path: '/task'
      fullPath: '/task'
      preLoaderRoute: typeof PublicTaskImport
      parentRoute: typeof PublicImport
    }
    '/_publicit/aboutit': {
      id: '/_publicit/aboutit'
      path: '/aboutit'
      fullPath: '/aboutit'
      preLoaderRoute: typeof PublicitAboutitImport
      parentRoute: typeof PublicitImport
    }
    '/_publicit/introit': {
      id: '/_publicit/introit'
      path: '/introit'
      fullPath: '/introit'
      preLoaderRoute: typeof PublicitIntroitImport
      parentRoute: typeof PublicitImport
    }
    '/_publicit/servicesit': {
      id: '/_publicit/servicesit'
      path: '/servicesit'
      fullPath: '/servicesit'
      preLoaderRoute: typeof PublicitServicesitImport
      parentRoute: typeof PublicitImport
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
    '/_private/user_/$id': {
      id: '/_private/user_/$id'
      path: '/user/$id'
      fullPath: '/user/$id'
      preLoaderRoute: typeof PrivateUserIdImport
      parentRoute: typeof PrivateImport
    }
  }
}

// Create and export the route tree

interface PrivateRouteChildren {
  PrivateAsociatesRoute: typeof PrivateAsociatesRoute
  PrivateClientsRoute: typeof PrivateClientsRoute
  PrivateCodesRoute: typeof PrivateCodesRoute
  PrivateLogoutRoute: typeof PrivateLogoutRoute
  PrivateProjectsRoute: typeof PrivateProjectsRoute
  PrivateResourcesRoute: typeof PrivateResourcesRoute
  PrivateProjectsProjectIdRoute: typeof PrivateProjectsProjectIdRoute
  PrivateTasksTaskIdRoute: typeof PrivateTasksTaskIdRoute
  PrivateUserIdRoute: typeof PrivateUserIdRoute
}

const PrivateRouteChildren: PrivateRouteChildren = {
  PrivateAsociatesRoute: PrivateAsociatesRoute,
  PrivateClientsRoute: PrivateClientsRoute,
  PrivateCodesRoute: PrivateCodesRoute,
  PrivateLogoutRoute: PrivateLogoutRoute,
  PrivateProjectsRoute: PrivateProjectsRoute,
  PrivateResourcesRoute: PrivateResourcesRoute,
  PrivateProjectsProjectIdRoute: PrivateProjectsProjectIdRoute,
  PrivateTasksTaskIdRoute: PrivateTasksTaskIdRoute,
  PrivateUserIdRoute: PrivateUserIdRoute,
}

const PrivateRouteWithChildren =
  PrivateRoute._addFileChildren(PrivateRouteChildren)

interface PublicRouteChildren {
  PublicAboutRoute: typeof PublicAboutRoute
  PublicLoginRoute: typeof PublicLoginRoute
  PublicServicesRoute: typeof PublicServicesRoute
  PublicTaskRoute: typeof PublicTaskRoute
  PublicIndexRoute: typeof PublicIndexRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicAboutRoute: PublicAboutRoute,
  PublicLoginRoute: PublicLoginRoute,
  PublicServicesRoute: PublicServicesRoute,
  PublicTaskRoute: PublicTaskRoute,
  PublicIndexRoute: PublicIndexRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

interface PublicitRouteChildren {
  PublicitAboutitRoute: typeof PublicitAboutitRoute
  PublicitIntroitRoute: typeof PublicitIntroitRoute
  PublicitServicesitRoute: typeof PublicitServicesitRoute
}

const PublicitRouteChildren: PublicitRouteChildren = {
  PublicitAboutitRoute: PublicitAboutitRoute,
  PublicitIntroitRoute: PublicitIntroitRoute,
  PublicitServicesitRoute: PublicitServicesitRoute,
}

const PublicitRouteWithChildren = PublicitRoute._addFileChildren(
  PublicitRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof PublicitRouteWithChildren
  '/asociates': typeof PrivateAsociatesRoute
  '/clients': typeof PrivateClientsRoute
  '/codes': typeof PrivateCodesRoute
  '/logout': typeof PrivateLogoutRoute
  '/projects': typeof PrivateProjectsRoute
  '/resources': typeof PrivateResourcesRoute
  '/about': typeof PublicAboutRoute
  '/login': typeof PublicLoginRoute
  '/services': typeof PublicServicesRoute
  '/task': typeof PublicTaskRoute
  '/aboutit': typeof PublicitAboutitRoute
  '/introit': typeof PublicitIntroitRoute
  '/servicesit': typeof PublicitServicesitRoute
  '/': typeof PublicIndexRoute
  '/projects/$projectId': typeof PrivateProjectsProjectIdRoute
  '/tasks/$taskId': typeof PrivateTasksTaskIdRoute
  '/user/$id': typeof PrivateUserIdRoute
}

export interface FileRoutesByTo {
  '': typeof PublicitRouteWithChildren
  '/asociates': typeof PrivateAsociatesRoute
  '/clients': typeof PrivateClientsRoute
  '/codes': typeof PrivateCodesRoute
  '/logout': typeof PrivateLogoutRoute
  '/projects': typeof PrivateProjectsRoute
  '/resources': typeof PrivateResourcesRoute
  '/about': typeof PublicAboutRoute
  '/login': typeof PublicLoginRoute
  '/services': typeof PublicServicesRoute
  '/task': typeof PublicTaskRoute
  '/aboutit': typeof PublicitAboutitRoute
  '/introit': typeof PublicitIntroitRoute
  '/servicesit': typeof PublicitServicesitRoute
  '/': typeof PublicIndexRoute
  '/projects/$projectId': typeof PrivateProjectsProjectIdRoute
  '/tasks/$taskId': typeof PrivateTasksTaskIdRoute
  '/user/$id': typeof PrivateUserIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_private': typeof PrivateRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/_publicit': typeof PublicitRouteWithChildren
  '/_private/asociates': typeof PrivateAsociatesRoute
  '/_private/clients': typeof PrivateClientsRoute
  '/_private/codes': typeof PrivateCodesRoute
  '/_private/logout': typeof PrivateLogoutRoute
  '/_private/projects': typeof PrivateProjectsRoute
  '/_private/resources': typeof PrivateResourcesRoute
  '/_public/about': typeof PublicAboutRoute
  '/_public/login': typeof PublicLoginRoute
  '/_public/services': typeof PublicServicesRoute
  '/_public/task': typeof PublicTaskRoute
  '/_publicit/aboutit': typeof PublicitAboutitRoute
  '/_publicit/introit': typeof PublicitIntroitRoute
  '/_publicit/servicesit': typeof PublicitServicesitRoute
  '/_public/': typeof PublicIndexRoute
  '/_private/projects_/$projectId': typeof PrivateProjectsProjectIdRoute
  '/_private/tasks/$taskId': typeof PrivateTasksTaskIdRoute
  '/_private/user_/$id': typeof PrivateUserIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/asociates'
    | '/clients'
    | '/codes'
    | '/logout'
    | '/projects'
    | '/resources'
    | '/about'
    | '/login'
    | '/services'
    | '/task'
    | '/aboutit'
    | '/introit'
    | '/servicesit'
    | '/'
    | '/projects/$projectId'
    | '/tasks/$taskId'
    | '/user/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/asociates'
    | '/clients'
    | '/codes'
    | '/logout'
    | '/projects'
    | '/resources'
    | '/about'
    | '/login'
    | '/services'
    | '/task'
    | '/aboutit'
    | '/introit'
    | '/servicesit'
    | '/'
    | '/projects/$projectId'
    | '/tasks/$taskId'
    | '/user/$id'
  id:
    | '__root__'
    | '/_private'
    | '/_public'
    | '/_publicit'
    | '/_private/asociates'
    | '/_private/clients'
    | '/_private/codes'
    | '/_private/logout'
    | '/_private/projects'
    | '/_private/resources'
    | '/_public/about'
    | '/_public/login'
    | '/_public/services'
    | '/_public/task'
    | '/_publicit/aboutit'
    | '/_publicit/introit'
    | '/_publicit/servicesit'
    | '/_public/'
    | '/_private/projects_/$projectId'
    | '/_private/tasks/$taskId'
    | '/_private/user_/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  PrivateRoute: typeof PrivateRouteWithChildren
  PublicRoute: typeof PublicRouteWithChildren
  PublicitRoute: typeof PublicitRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  PrivateRoute: PrivateRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
  PublicitRoute: PublicitRouteWithChildren,
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
        "/_public",
        "/_publicit"
      ]
    },
    "/_private": {
      "filePath": "_private.jsx",
      "children": [
        "/_private/asociates",
        "/_private/clients",
        "/_private/codes",
        "/_private/logout",
        "/_private/projects",
        "/_private/resources",
        "/_private/projects_/$projectId",
        "/_private/tasks/$taskId",
        "/_private/user_/$id"
      ]
    },
    "/_public": {
      "filePath": "_public.jsx",
      "children": [
        "/_public/about",
        "/_public/login",
        "/_public/services",
        "/_public/task",
        "/_public/"
      ]
    },
    "/_publicit": {
      "filePath": "_publicit.jsx",
      "children": [
        "/_publicit/aboutit",
        "/_publicit/introit",
        "/_publicit/servicesit"
      ]
    },
    "/_private/asociates": {
      "filePath": "_private/asociates.jsx",
      "parent": "/_private"
    },
    "/_private/clients": {
      "filePath": "_private/clients.jsx",
      "parent": "/_private"
    },
    "/_private/codes": {
      "filePath": "_private/codes.jsx",
      "parent": "/_private"
    },
    "/_private/logout": {
      "filePath": "_private/logout.jsx",
      "parent": "/_private"
    },
    "/_private/projects": {
      "filePath": "_private/projects.jsx",
      "parent": "/_private"
    },
    "/_private/resources": {
      "filePath": "_private/resources.jsx",
      "parent": "/_private"
    },
    "/_public/about": {
      "filePath": "_public/about.jsx",
      "parent": "/_public"
    },
    "/_public/login": {
      "filePath": "_public/login.jsx",
      "parent": "/_public"
    },
    "/_public/services": {
      "filePath": "_public/services.jsx",
      "parent": "/_public"
    },
    "/_public/task": {
      "filePath": "_public/task.jsx",
      "parent": "/_public"
    },
    "/_publicit/aboutit": {
      "filePath": "_publicit/aboutit.jsx",
      "parent": "/_publicit"
    },
    "/_publicit/introit": {
      "filePath": "_publicit/introit.jsx",
      "parent": "/_publicit"
    },
    "/_publicit/servicesit": {
      "filePath": "_publicit/servicesit.jsx",
      "parent": "/_publicit"
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
    },
    "/_private/user_/$id": {
      "filePath": "_private/user_.$id.jsx",
      "parent": "/_private"
    }
  }
}
ROUTE_MANIFEST_END */
