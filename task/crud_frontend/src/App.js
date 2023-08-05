import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import EditItemForm from './components/EditItemForm';
import AddItemForm from './components/AddItemForm';
import axios from 'axios';


const backendBaseUrl = 'http://localhost:4000'; // Replace this with the actual backend URL

class App extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    // Fetch all items from the backend
    axios
      .get(`${backendBaseUrl}/itemsroute`)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleAddItem = (newItem) => {
    this.setState({ items: [...this.state.items, newItem] });
  };

  handleUpdateItem = (updatedItem) => {
    this.setState({
      items: this.state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    });
  };

  render() {
    const { items } = this.state;

    return (
      <BrowserRouter>
        <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">CRUD App</h1>
          <div className="grid  gap-8">
            <Switch>
              <Route exact path="/" render={() => <ItemList items={items} onAddItem={this.handleAddItem} />} />
              <Route
                path="/edit/:id"
                render={({ match }) => {
                  const itemId = match.params.id;
                  const item = items.find((item) => item._id === itemId);
                  return <EditItemForm item={item} onUpdateItem={this.handleUpdateItem} />;
                }}
              />
              <Route path="/add" render={() => <AddItemForm onAddItem={this.handleAddItem} />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
