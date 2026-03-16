import { WarriorState } from '../types';

const STORAGE_KEY_STREAK = 'w_streak_v6';
const STORAGE_KEY_HISTORY = 'w_history_v6';
const STORAGE_KEY_TRIGGERS = 'w_triggers_v6';

export const loadData = (): WarriorState => {
  return {
    streak: parseInt(localStorage.getItem(STORAGE_KEY_STREAK) || '0'),
    history: JSON.parse(localStorage.getItem(STORAGE_KEY_HISTORY) || '{}'),
    triggers: JSON.parse(localStorage.getItem(STORAGE_KEY_TRIGGERS) || '{}'),
  };
};

export const saveData = (state: WarriorState) => {
  localStorage.setItem(STORAGE_KEY_STREAK, state.streak.toString());
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(state.history));
  localStorage.setItem(STORAGE_KEY_TRIGGERS, JSON.stringify(state.triggers));
};