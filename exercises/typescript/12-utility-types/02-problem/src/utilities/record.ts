export type Person =
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

export type PersonMap = unknown;