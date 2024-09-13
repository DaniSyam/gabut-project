// JavaScript example
function calculateSquareArea(side) {
    return side * side;
}

console.log(calculateSquareArea(5)); // Output: 25

// TypeScript example
interface Greeting {
    name: string;
    message: string;
}

function greet(person: Greeting): string {
    return `Hello, ${person.name}! ${person.message}`;
}

const visitor: Greeting = {
    name: "Alice",
    message: "Welcome to Rain City."
};

console.log(greet(visitor));

// HTML example
const htmlContent = `
<div class="rain-city">
    <h1>Welcome to Rain City</h1>
    <p>Enjoy the cool and romantic atmosphere here.</p>
</div>
`;

// CSS example
const styles = `
.rain-city {
    background-color: #3a3a3a;
    color: #e0e0e0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
`;

// SQL-like query (as a string)
const query = `
SELECT name, address
FROM residents
WHERE city = 'Rain City'
ORDER BY name ASC;
`;

// Class example
class RainCity {
    constructor(public name: string) {}

    greet() {
        console.log(`Welcome to ${this.name}!`);
    }
}

const myCity = new RainCity("Rainy Haven");
myCity.greet();

