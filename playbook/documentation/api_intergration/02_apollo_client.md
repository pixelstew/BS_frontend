# Apollo Client

For interacting with platform API's we use Apollo. The [docs for Apollo](https://www.apollographql.com/client) are extensive and comprehensive so this is a high level explanation of our approach.

## Premise

Apollo is a group of technologies that simplify creating graphQL queries and integrating graphQL queries and mutations with several FE frameworks. The primary focus of Apollo is React which dovetails neatly with our decision to adopt React for our view layer.

For React it Apollo centres around building queries and passing them as a parameter to a `<Query>` or `<Mutation>` component. Actual react components are then rendered inside these via [render props](https://reactjs.org/docs/render-props.html).

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

// GET_DOGS passed to <Query>

// Standard props which can be used to conditionally load content based on
// status of the request

const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
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

// ADD_TODO passed to <Query>

// addTodo passed in and called with 'type' as its arg which is then passed in as variable to mutation
// above content based on status of the request

const AddTodo = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
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

[That sweet sweet Query component](https://www.youtube.com/watch?v=YHJ2CaS0vpM)
[That sweet sweet Mutation component](https://www.youtube.com/watch?v=2SYa0F50Mb4&t=16s)

## Link state

Instead of a Redux store and the associated actions/reducers we leverage apollo link state. This is a big paradigm shift from teh flux model of state management. It essentially revolves around querying from the API and from the local cache and then merging the result, the cahce acting as the local store and hydrating the app automatically on change.

Please read the docs and watch [this video](https://www.youtube.com/watch?v=2RvRcnD8wHY) to gain insight into this approach.

## Code organisation UP FOR DEBATE

There will be a range of Queries and Mutations and these should be broken into modules and imported like any other modular code. Whether all queries are bundles as one or we are selective about what modules are packages together is up for debate.
