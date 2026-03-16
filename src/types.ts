export interface DayData {
  status: 'clean' | 'failed';
  site?: string;
}

export interface WarriorState {
  streak: number;
  history: Record<string, DayData>;
  triggers: Record<string, number>;
}

export type ViewState = 'dashboard' | 'analysis' | 'archive' | 'about';