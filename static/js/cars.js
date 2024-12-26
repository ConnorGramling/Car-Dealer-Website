class Car {
  constructor(type, colors, description, price, images) {
    this.type = type;
    this.colors = colors;
    this.description = description;
    this.price = price;
    this.images = images;
  }
}

const ferrari = new Car(
  "Ferrari",
  ["Red", "White", "Yellow"],
  "Ferraris are high-performance luxury cars that push boundaries of speed and design.",
  100000,
  {
    "Red": "static/images/ferrari/red.jpg",
    "White": "static/images/ferrari/white.jpg",
    "Yellow": "static/images/ferrari/yellow.jpg"
  }
);

const lamborghini = new Car(
  "Lamborghini",
  ["Blue", "Green", "Yellow"],
  "Lamborghinis are known for their bold design and thrilling speed.",
  120000,
  {
    "Blue": "static/images/lamborghini/blue.png",
    "Green": "static/images/lamborghini/green.png",
    "Yellow": "static/images/lamborghini/yellow.jpg"
  }
);

const mustang = new Car(
  "Mustang",
  ["Black", "Silver", "White"],
  "The Mustang is an American classic, blending power and style.",
  75000,
  {
    "Black": "static/images/mustang/black.jpg",
    "Silver": "static/images/mustang/silver.jpg",
    "White": "static/images/mustang/white.jpg"
  }
);

let selectedCar = ferrari;  // Default car

window.onload = function () {
  setCarOptions(ferrari);
  updateCarImage("Red");
  updateDescription();


  document.getElementById("carType").addEventListener("change", function () {
    const selectedType = this.value.toLowerCase();  // Get value in lowercase

    if (selectedType === "ferrari") {
      selectedCar = ferrari;
    } else if (selectedType === "lamborghini") {
      selectedCar = lamborghini;
    } else if (selectedType === "mustang") {
      selectedCar = mustang;
    }

    setCarOptions(selectedCar);
    updateCarImage(selectedCar.colors[0]);  // Default to the first color
    updateDescription();

    // Select the first option in the color dropdown
    document.getElementById('carColor').selectedIndex = 0;
  });

document.getElementById("carColor").addEventListener("change", function () {
  const selectedColor = this.value;
  updateCarImage(selectedColor);
  updateDescription();
});

document.querySelectorAll('input[name="insurance"]').forEach((insuranceOption) => {
  insuranceOption.addEventListener("change", function () {
    updateDescription();
  });
});

}

function setCarOptions(car) {
  const colorSelect = document.getElementById("carColor");
  colorSelect.innerHTML = "";  // Clear existing options

  car.colors.forEach(color => {
    const option = document.createElement("option");
    option.textContent = color;
    option.value = color;  // Set the value to the color name
    colorSelect.appendChild(option);
  });
}

function updateCarImage(color) {
  const carImage = document.getElementById("carImage");
  carImage.src = selectedCar.images[color];
}

function updateDescription() {
  const color = document.getElementById("carColor").value;
  const insurance = document.querySelector('input[name="insurance"]:checked').value;
  const insuranceCost = insurance === "three-year" ? selectedCar.price * 0.3 : 0;

  const description = `
Car: ${selectedCar.type}
Description: ${selectedCar.description}
Selected color: ${color}
Basic Price: $${selectedCar.price.toLocaleString()}
Insurance Cost: $${insuranceCost.toLocaleString()}
  `;

  document.querySelector(".description textarea").value = description.trim();  // .trim() removes extra spaces
}