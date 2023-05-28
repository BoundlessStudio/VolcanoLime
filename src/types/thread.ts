export interface Thread {
  id: string,
  name: string,
  skills: string[],
  memories: string[],
  chats: ChatMessage[]
}

export type ChatRole = "assistant" | "user"
export type ChatType = "chat" | "answer" | "plan" | "drawing"

export interface BaseMessage {
  message: string,
  role: ChatRole,
}
export interface ChatMessage extends BaseMessage {
  type: ChatType,
  ts: string,
}

export interface AnswerMessage extends ChatMessage {
  citations: string[],
  followup: string[],
}

export interface PlanMessage extends ChatMessage {
  plan: Plan,
}

export interface Parameter {
  Key: string;
  Value: string;
}

export interface Step {
  parameters: Parameter[];
  outputs?: string[];
  icon: string;
  name: string;
  skill_name: string;
  description: string;
}

export interface Plan {
  state: Parameter[];
  steps: Step[];
  parameters: Parameter[];
  next_step_index: number;
  name: string;
  description: string;
}


export interface DrawingMessage extends ChatMessage {
  drawing: string,
}