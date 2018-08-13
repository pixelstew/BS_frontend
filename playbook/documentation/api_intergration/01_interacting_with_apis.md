# Date

13/08/2018

# Clientside API integration

## Context

- FE has to communicate with many REST end points, both internal and external
- Often transformation of data has to occur on FE to make data usable
- Back end team can assist to an extent but their models and conventions are such that front end lifting is inevitable.
- Code for making CRUD request from FE will be unwieldy and hard to maintain.

## Decision

- We will work alongside the BE team to ensure v2 API provides data presented in the correct manner for FE to ingest.
- We will use [Apollo-client](https://www.apollographql.com/client) instead of querying REST en points directly
- We will implement a graphQL server which will accept queries to a single end point from the FE and resolve them and fetch the relevant data from the v2 API.
- We will also take advantage of teh Apollo ecosystem by hooking into [Apollo-link-state](https://www.apollographql.com/docs/link/links/state.html) instead of using a global store and Redux/Mobx.

## Status

`accepted`

## Consequences

- FE querying via the apollo-react package will greatly simplify code and module separation, should end up with fewer long components.
- Few manipulation functions will have to written to massage data into correct structure.
- Extra overhead for FE team although the work in creating resolvers is analogous to making transformations to data in React components.
- Rigid structure of Redux (actions/reducers) can be avoided
- Apollo-link-state is a new paradigm for state management where you use queries to get remote and cached state and then merge the two. There is a learning curve associated with this.
