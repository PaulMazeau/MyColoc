import { Platform } from "react-native";
import { DefaultTimer } from "react-native-game-engine";

const ideal = 1000 / 60;

class PerfTimer {
  private subscribers: Array<(time: number) => void>;
  private loopId: number | null;
  private last: number;

  constructor() {
    this.subscribers = [];
    this.loopId = null;
    this.last = 0;
  }

  private loop = (time: number) => {
    if (this.loopId) {
      this.subscribers.forEach(callback => {
        callback(time);
      });
    }

    const now = new Date().getTime();
    const delay = ideal - (now - this.last)

    this.loopId = window.setTimeout(this.loop, delay > 0 ? delay : 0, now);
    this.last = now;
  };

  public start() {
    if (!this.loopId) {
      this.loop(this.last);
    }
  }

  public stop() {
    if (this.loopId) {
      clearTimeout(this.loopId);
      this.loopId = null;
    }
  }

  public subscribe(callback: (time: number) => void) {
    if (this.subscribers.indexOf(callback) === -1)
      this.subscribers.push(callback);
  }

  public unsubscribe(callback: (time: number) => void) {
    this.subscribers = this.subscribers.filter(s => s !== callback)
  }
}

export default (Platform.OS === "android" ? PerfTimer : DefaultTimer);
