# Address NFT Generator

This React application allows users to input their home address, view it on a map, and generate an NFT token for the address. It features address autocomplete, map display, and NFT generation functionality.

## Live Demo

Check out the live demo: [Address NFT Generator](https://domi-task-darshil25.vercel.app/).

## Features

- Address input with autocomplete suggestions
- Map display of the selected address
- NFT token generation for the address
- Toggle between map view and NFT token display

## Setup Instructions

1. Clone the repository: `git clone https://github.com/darshil25/Domi-Task.git](https://github.com/darshil25/Domi-Task.git`
2. `cd Domi-Task`
3. Install dependencies: `npm install`
4. Start the development Server: `npm run dev`
5. Open your browser and visit `http://localhost:5173` to view the app.

## Usage Guide

1. Enter your home address in the input field.
2. Select an address from the autocomplete suggestions.
3. The map will display the selected address location.
4. Click the "Generate NFT" button to create an NFT token for the address.
5. Use the "Switch to NFT" / "Switch to Map" button to toggle between map and NFT token display.

## Technologies Used

- React
- Axios for API requests
- Leaflet for map display
- js-sha256 for NFT token generation
- OpenStreetMap for geocoding and map tiles

## Project Structure

- `App.jsx`: Main component managing the application state and layout
- `AddressInput.jsx`: Component for address input with autocomplete
- `Map.jsx`: Component for displaying the map using Leaflet
- `NFTGenerator.jsx`: Component for generating NFT tokens

## API Usage

This project uses the OpenStreetMap Nominatim API for address autocomplete and geocoding. Please ensure you comply with their usage policy when deploying this application.

## Deployment

This project is deployed on Vercel. You can deploy your own instance by connecting your GitHub repository to Vercel and following their deployment process.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
