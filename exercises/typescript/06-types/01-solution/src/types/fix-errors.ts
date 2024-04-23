let isLoading: boolean;
isLoading = true;
isLoading = false;

let inventory: Array<string> = [];

inventory.push("tacos", "hamburgers");

function greet(name: string, age: number): string {
  return `${name} is ${age} years young.`;
}

export const jessica = greet("Jessica", 30);

export const tom = greet("Tom", 42);

export { isLoading, inventory };
