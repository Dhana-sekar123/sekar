import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const backendBaseUrl = 'http://localhost:4000';

class AddItemForm extends Component {
  state = {
    name: '',
    description: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    if (!name || !description) {
      alert('Please fill out both the name and description fields.');
      return;
    }

    try {
      const response = await axios.post(`${backendBaseUrl}/itemsroute`, { name, description });
      this.props.onAddItem(response.data);
      this.setState({ name: '', description: '' });
      alert('Item added successfully.');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Unable to add the item.');
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { name, description } = this.state;

    return (
      <div className="my-4 mx-auto max-w-md p-6"> 
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-center">Add </h2>
          <form onSubmit={this.handleSubmit} className="space-y-6">
            <div className="border border-gray-300 rounded">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
                className="w-full px-4 py-3 focus:outline-none text-lg"
              />
            </div>
            <div className="border border-gray-300 rounded">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => this.setState({ description: e.target.value })}
                className="w-full px-4 py-3 focus:outline-none text-lg"
                rows="4" // Adjust the number of rows as needed
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={this.handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddItemForm);
