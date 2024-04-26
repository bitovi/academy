type Person = {
  role: "developer";
  email?: string;
  id: number;
  firstName: string;
  lastName: string;
  team: "React" | "Angular" | "backend";
};

// 1. Which utility type can we use to get rid of the errow below?
export type UpdateablePerson = Person; 

// 3. Which utility type can we use to make sure that all properties are defined?
export type FullyDefinedPerson = Person;

// 2. Which utility type can we use so that typescript gives an error when we try to update a property?
export type NonEditablePerson = Person; 
