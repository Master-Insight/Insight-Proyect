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
import { Route as PrivateProjectsImport } from './routes/_private/projects'

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

const PrivateProjectsRoute = PrivateProjectsImport.update({
  id: '/projects',
  path: '/projects',
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
    '/_private/projects': {
      id: '/_private/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof PrivateProjectsImport
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
  }
}

// Create and export the route tree

interface PrivateRouteChildren {
  PrivateProjectsRoute: typeof PrivateProjectsRoute
}

const PrivateRouteChildren: PrivateRouteChildren = {
  PrivateProjectsRoute: PrivateProjectsRoute,
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
  '/projects': typeof PrivateProjectsRoute
  '/login': typeof PublicLoginRoute
  '/task': typeof PublicTaskRoute
  '/': typeof PublicIndexRoute
}

export interface FileRoutesByTo {
  '': typeof PrivateRouteWithChildren
  '/projects': typeof PrivateProjectsRoute
  '/login': typeof PublicLoginRoute
  '/task': typeof PublicTaskRoute
  '/': typeof PublicIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_private': typeof PrivateRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/_private/projects': typeof PrivateProjectsRoute
  '/_public/login': typeof PublicLoginRoute
  '/_public/task': typeof PublicTaskRoute
  '/_public/': typeof PublicIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/projects' | '/login' | '/task' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/projects' | '/login' | '/task' | '/'
  id:
    | '__root__'
    | '/_private'
    | '/_public'
    | '/_private/projects'
    | '/_public/login'
    | '/_public/task'
    | '/_public/'
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
        "/_private/projects"
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
    "/_private/projects": {
      "filePath": "_private/projects.jsx",
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
    }
  }
}
ROUTE_MANIFEST_END */
