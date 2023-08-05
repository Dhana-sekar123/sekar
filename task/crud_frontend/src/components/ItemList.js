import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const backendBaseUrl = 'http://localhost:4000';

class ItemList extends Component {
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

  handleDeleteItem = (itemId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (isConfirmed) {
      // If user confirms, proceed with deletion
      axios
        .delete(`${backendBaseUrl}/itemsroute/${itemId}`)
        .then(() => {
          this.setState({ items: this.state.items.filter((item) => item._id !== itemId) });
          alert('The item has been deleted.');
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to delete the item.');
        });
    }
  };

  render() {
    const { items } = this.state;

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">List of Items</h2>
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="w-full lg:w-2/3 mx-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                    Name
                  </th>
                  <th className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                    Description
                  </th>
                  <th className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                    Edit
                  </th>
                  <th className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                      {item.name}
                    </td>
                    <td className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                      {item.description}
                    </td>
                    <td className="border-2 p-2 border-gray-800 text-center" style={{ width: '25%' }}>
  <Link to={`/edit/${item._id}`}>
    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md">
      Edit
    </button>
  </Link>
</td>
<td className="border-2 p-2 border-gray-800 text-center" style={{ width: '25%' }}>
  <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
    onClick={() => this.handleDeleteItem(item._id)}
  >
    Delete
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button className="bg-green-500 hover:bg-green-700 font-bold text-white px-6 py-3 text-lg rounded-md">
            <Link to="/add">Add Item</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default ItemList;
