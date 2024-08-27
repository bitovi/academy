type Person =
  | {
      role: "developer";
      email: string;
      id: number;
      firstName: string;
      lastName: string;
      team: "React" | "Angular" | "backend";
    }
  | {
      role: "user";
      email: string;
      id: number;
      firstName: string;
      lastName: string;
      isVerified: boolean;
    };

type Developer = Extract<Person, { role: "developer" }>;

interface FrontendDeveloper extends Developer {
  team: Exclude<Developer["team"], "backend">;
}

export interface AdminDeveloper extends Omit<FrontendDeveloper, "role"> {
  permissions: string[];
}