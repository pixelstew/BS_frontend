import React, { Component } from "react";
import { render } from "react-dom";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { BSTButton } from "@bigsofa/ui";

const client = new ApolloClient({
  uri: `https://nx9zvp49q7.lp.gql.zone/graphql`
});

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

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

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

const DogPhoto = ({ breed }) => (
  <Query query={GET_DOG_PHOTO} variables={{ breed }} skip={!breed}>
    {({ loading, error, data, refetch }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return (
        <div>
          <img
            src={data.dog.displayImage}
            style={{ height: 100, width: 100 }}
          />
          <button onClick={() => refetch()}>Refetch!</button>
        </div>
      );
    }}
  </Query>
);

class App extends Component {
  state = { selectedDog: null };

  onDogSelected = ({ target }) => {
    this.setState(() => ({ selectedDog: target.value }));
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>Building Query components 🚀</h2>
        </div>
        <Dogs onDogSelected={this.onDogSelected} />
        <DogPhoto breed={this.state.selectedDog} />
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
