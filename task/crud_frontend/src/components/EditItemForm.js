import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const backendBaseUrl = 'http://localhost:4000'; // Replace this with the actual backend URL

class EditItemForm extends Component {
  state = {
    name: '',
    description: '',
  };

  componentDidMount() {
    const { item } = this.props;
    if (item) {
      // If 'item' is available, update the local state with its values
      this.setState({
        name: item.name,
        description: item.description,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    const { match, history } = this.props;
    const itemId = match.params.id;
    axios
      .put(`${backendBaseUrl}/itemsroute/${itemId}`, { name, description })
      .then((response) => {
        alert('Item Updated Successfully');
        this.props.onUpdateItem(response.data);
        // Redirect to the ItemList page after successful update
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update the item.');
      });
  };

  render() {
    const { name, description } = this.state;

    if (!this.props.item) {
      // If 'item' is null, show a loading message or handle the case accordingly
      return <div>Loading...</div>;
    }

    return (
      <div className="my-4 mx-auto max-w-md p-6"> 
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit </h2>
        <form onSubmit={this.handleSubmit} className="w-full max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              rows="4" // Adjust the number of rows as needed
            />
          </div>
          <div className="mt-4 text-center">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Update Item
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default withRouter(EditItemForm);
