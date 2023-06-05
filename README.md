# WeatherApp-React

This is a Weather App built with React and OpenWeather API. It allows you to view the weather of your current location (if location permission is allowed) and search for weather in other locations. The app includes a loading animation and dynamically displays weather condition images based on the current weather.

## Features

- Display weather information for the current location
- Search for weather in other locations
- Loading animation while fetching weather data
- Dynamically changing weather condition images

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Webdevava/Weatherapp-React.git
   ```

2. Navigate to the project directory:

   ```
   cd weather-app-react
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your OpenWeather API key:

   ```
   REACT_APP_API_KEY=your-api-key
   ```

5. Start the (vite) development server:

   ```
   npm run dev
   ```

6. Open your browser and visit [http://localhost:5173](http://localhost:5173) to view the app.

## Usage

- When the app loads, it will request permission to access your location. Grant the permission to see the weather of your current location.
- If the location permission is denied or unavailable, you can use the search bar to enter the desired location and get the weather information for that location.
- The app will display a loading animation while fetching the weather data if needed.
- The weather information displayed includes the location name, weather condition image, temperature, and weather description.

## Technologies Used

- React
- OpenWeather API
- CSS
- JavaScript

## Screenshots

![Weather App Screenshot](/screenshots/weather-app.png)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


