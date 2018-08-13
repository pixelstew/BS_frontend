# Apollo Client

For interacting with platform API's we use Apollo. The [docs for Apollo](https://www.apollographql.com/client) are extensive and comprehensive so this is a high level explanation of our approach.

## Premise

Apollo is a group of technologies that simplify creating graphQL queries and integrating them with all the major FE frameworks. The primary focus of Apollo on the client side is React which dovetails neatly with our decision to adopt React for our view layer.

For React, at it's most basic level, Apollo centres around wrapping the app in a parent component (similar to `react-router`) which takes a graphQL client as a prop. The client is a `new ApolloClient()` which takes a graphQL end point as an arg.

```js
import React from "react";
import { render } from "react-dom";
import Main from "./Main";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjexem1he3let0153tpc5ftu1"
});

const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
```

Then we build query and pass it as a parameter to a `<Query>` or `<Mutation>` component. Actual react components are then rendered inside these via [render props](https://reactjs.org/docs/render-props.html).

From the docs...

## Basic Query

```javascript
import gql from "graphql-tag";
import { Query } from "react-apollo";

// GraphQL query, which is a specially formatted template literal
const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
  // GET_DOGS query passed to <Query>
  <Query query={GET_DOGS}>
    // Standard props (loading, error etc) which can be used to conditionally
    //load content based on status of the request
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);
```

## Basic mutation

```js
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

// GraphQL mutation, which includes variable of 'type' with a type definition eg $type
const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const AddTodo = () => {
  let input;

  return (
    // ADD_TODO passed to <Query>
    <Mutation mutation={ADD_TODO}>
      // addTodo passed in and called with 'type' as its arg which is then
      //passed in as variable to mutation above content based on status of the
      //request
      {(addTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};
```

Sara Viera has a number of videos in which she explains the processes at work here, please watch them.

- [That sweet sweet Query component](https://www.youtube.com/watch?v=YHJ2CaS0vpM)
- [That sweet sweet Mutation component](https://www.youtube.com/watch?v=2SYa0F50Mb4&t=16s)

## Link state

Instead of a Redux store and the associated actions/reducers we leverage [apollo link state](https://www.apollographql.com/docs/link/links/state.html). This is a big paradigm shift from the flux model of state management. It essentially revolves around querying from the API and from the local cache and then merging the result, the cache acting as the local store and hydrating the app automatically on change.

Please read the docs and watch [this video](https://www.youtube.com/watch?v=2RvRcnD8wHY) to gain insight into this approach.

## Code organisation UP FOR DEBATE

There will be a range of Queries and Mutations and these should be broken into modules and imported like any other modular code. Whether all queries are bundles as one or we are selective about what modules are packages together is up for debate.

A queries file might look like

```js
import { gql } from "apollo-boost";

export const GET_NAMES = gql`
  query {
    allNames {
      id
      name
    }
  }
`;

export const ADD_NAME = gql`
  mutation createNames($name: String!) {
    createNames(name: $name) {
      name
      id
    }
  }
`;

export const DELETE_NAME = gql`
  mutation deleteNames($id: ID!) {
    deleteNames(id: $id) {
      name
      id
    }
  }
`;
```

or we could break that into a queries file and a mutations file in which `ADD_NAME` and `DELETE_NAME` would go instead. Up for discussion.
