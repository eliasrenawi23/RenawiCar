type options = "Active" | "Inactive" | "Pending";
export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: string; // Display price
  mileage: string;
  photoUrl: string;
  purchasePrice: number; // Price at which the car was purchased
  sellingPrice: number; // Price at which the car was sold
  profit: number; // Profit or loss from the sale
  options?: options;
}
export const carData: Car[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Blue",
    price: "$20,000",
    mileage: "30,000 miles",
    photoUrl:
      "https://di-uploads-pod6.dealerinspire.com/savannahtoyota/uploads/2020/09/corolla-blue-metallic.png",
    purchasePrice: 18000, // Adjusted purchase price
    sellingPrice: 20000, // Selling price leading to profit
    profit: 2000, // Profit calculated
    options: "Active",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2021,
    color: "Red",
    price: "$22,000",
    mileage: "15,000 miles",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRojaAoDH6AzQ8oVSSEW0XL2EMssPmn3ahMdw&s",
    purchasePrice: 23000, // Purchase price higher than selling
    sellingPrice: 22000, // Selling price leading to loss
    profit: -1000, // Loss calculated
  },
  {
    id: 3,
    make: "Ford",
    model: "Mustang",
    year: 2022,
    color: "Black",
    price: "$30,000",
    mileage: "10,000 miles",
    photoUrl:
      "https://di-uploads-pod45.dealerinspire.com/napletonfordofoaklawn/uploads/2023/01/22Ford-Mustang-ShelbyGT500-ShadowBlack-Jellybean.png",
    purchasePrice: 29000,
    sellingPrice: 30000,
    profit: 1000,
  },
  {
    id: 4,
    make: "Chevrolet",
    model: "Malibu",
    year: 2019,
    color: "White",
    price: "$18,000",
    mileage: "40,000 miles",
    photoUrl:
      "https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-Chevrolet-Malibu-Summit-White-Color.jpeg",
    purchasePrice: 19000,
    sellingPrice: 18000,
    profit: -1000,
  },
  {
    id: 5,
    make: "Nissan",
    model: "Altima",
    year: 2020,
    color: "Silver",
    price: "$19,500",
    mileage: "25,000 miles",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_YftLVtx-YtcSQPywc-3jxKVYQWLiq_nXA&s",
    purchasePrice: 18500,
    sellingPrice: 19500,
    profit: 1000,
  },
  {
    id: 6,
    make: "BMW",
    model: "3 Series",
    year: 2022,
    color: "Gray",
    price: "$35,000",
    mileage: "5,000 miles",
    photoUrl:
      "https://content.homenetiol.com/2000292/2143540/0x0/eea989100df44217a182c8e080e44189.jpg",
    purchasePrice: 34000,
    sellingPrice: 35000,
    profit: 1000,
  },
  {
    id: 7,
    make: "Audi",
    model: "A4",
    year: 2021,
    color: "Green",
    price: "$37,000",
    mileage: "8,000 miles",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02L5Pmt6R2vVetHQNP3A5x7WnxPtzBlnB2A&s",
    purchasePrice: 36000,
    sellingPrice: 37000,
    profit: 1000,
  },
  {
    id: 8,
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2022,
    color: "Blue",
    price: "$40,000",
    mileage: "2,000 miles",
    photoUrl:
      "https://carfax-img.vast.com/carfax/v2/-543085514881631637/1/344x258",
    purchasePrice: 39000,
    sellingPrice: 40000,
    profit: 1000,
  },
  {
    id: 9,
    make: "Hyundai",
    model: "Sonata",
    year: 2021,
    color: "Yellow",
    price: "$24,000",
    mileage: "12,000 miles",
    photoUrl: "https://i.redd.it/piriimncwiuc1.jpeg",
    purchasePrice: 23000,
    sellingPrice: 24000,
    profit: 1000,
  },
  {
    id: 10,
    make: "Kia",
    model: "Optima",
    year: 2020,
    color: "Black",
    price: "$23,000",
    mileage: "20,000 miles",
    photoUrl:
      "https://autopapa.ge/system/car/photos/007/987/390/medium.jpg?1722090027",
    purchasePrice: 25000,
    sellingPrice: 23000,
    profit: -2000,
  },
  {
    id: 11,
    make: "Subaru",
    model: "Outback",
    year: 2021,
    color: "Red",
    price: "$28,000",
    mileage: "15,000 miles",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBRAy_YxlOrIfOKC4OzyP55Eo0vNFnEALng&s",
    purchasePrice: 27000,
    sellingPrice: 28000,
    profit: 1000,
  },
  {
    id: 12,
    make: "Mazda",
    model: "CX-5",
    year: 2022,
    color: "White",
    price: "$30,000",
    mileage: "7,000 miles",
    photoUrl:
      "https://i.redd.it/just-picked-up-a-2022-premium-plus-in-white-without-color-v0-vgeidv8twwg81.jpg?width=2100&format=pjpg&auto=webp&s=24cb0422ffa8e581148041315a4318abf0babad7",
    purchasePrice: 31000,
    sellingPrice: 30000,
    profit: -1000,
  },
];
