export type TeamStatus = "forming" | "active" | "completed";

export type Team = {
  id: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  ownerId: string;
  memberIds: string[];
  requiredRoles: string[];
  status: TeamStatus;
  aiCollaborationPlan?: string;
  createdAt: string;
  updatedAt: string;
};

export type ConnectionRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
};

export type AIOutput = {
  id: string;
  userId: string;
  type:
    | "match-explanation"
    | "project-idea"
    | "collaboration-plan"
    | "first-message"
    | "pitch-script";
  input: Record<string, unknown>;
  output: string;
  createdAt: string;
};
